import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../index.css";

const ClientSearch = ({ setClients}) => {
  const [id, setId] = useState(''); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appRepeat, setAppRepeat] = useState('ALL');
    const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); // For detecting outside clicks

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

//beep boop beep boop
  const clear = () =>{
    setId('');
    setName('');
    setEmail('');
    setPhone('');
    setAppRepeat('ALL');
    setClients([]);
    
  }

  const getClients = () => { //if user clicks search

    axios.get('http://localhost:3000/clients/getClients', {
      params: {id, name,  email, phone, appRepeat} 
    }) //search Clients
    .then(response => {
      console.log("Fetched Clients:", response.data);
      setClients(response.data); //display data
    })
    .catch(error => {
      console.error('Error fetching Clients:', error);
    });
  };

 const getAllClients =() =>{ //if user clicks search all (same as having no parameters)
  axios.get('http://localhost:3000/clients/getAllClients', {
    params: { } 
  })
  .then(response => {
    console.log("Fetched Clients:", response.data);
    setClients(response.data); // display data
  })
  .catch(error => {
    console.error('Error fetching Clients:', error);
  });
 };



// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
  return ( //form for searching Clients 
    <div >
       <p className="bold">Search Clients</p>
       <div className='flex'>
      <label> ID: </label>
      <input type="number" value={id} onChange={e => setId(e.target.value) } className="number"/>
      <label>Name: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>Email: </label>
      <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      <label>Phone: </label>
      <input type="number" value={phone} onChange={e => setPhone(e.target.value)} />

<div className='flex'>
      <label> Appointment Frequency: </label>

   <div className="dropdown" ref={dropdownRef}>
  <button onClick={() =>{setDropdownOpen(!dropdownOpen)}} className="dropbtn">{appRepeat}</button>
  {dropdownOpen &&(
    <div className="dropdown-content">
    <button onClick={() =>{setAppRepeat('ALL'); setDropdownOpen(false);}} className='dropbutton'>ALL</button>
    <button onClick={() =>{setAppRepeat('WEEKLY'); setDropdownOpen(false);}} className='dropbutton'>WEEKLY</button>
    <button onClick={() =>{setAppRepeat('MONTHLY'); setDropdownOpen(false);}} className='dropbutton'>MONTHLY</button>
    <button onClick={() =>{setAppRepeat('TBD'); setDropdownOpen(false);}} className='dropbutton'>TBD</button>
  </div> )}
</div> 
</div>
</div>
      <div className='flex'>
<p>   </p>

      <button onClick={getClients}>Search</button> <p>   </p>
      <button onClick={getAllClients}>All Clients</button> <p>   </p>
      <button onClick={clear}>Clear Search</button> 


    </div>
    </div>

    
  );
  
};


export default ClientSearch;