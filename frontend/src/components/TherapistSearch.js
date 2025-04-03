import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../index.css";

const TherapistSearch = ({ setTherapists}) => {
  const [id, setId] = useState(''); //variables for searching Therapists
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [minYear, setMinYear] = useState('');
  const [available, setAvailable] = useState('ALL');
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
    setTitle('');
    setEmail('');
    setLocation('');
    setMinYear('');
    setAvailable('ALL');
    setTherapists([]);
    
  }

  const getTherapists = () => { //if user clicks search
    axios.get('http://localhost:3000/therapists/getTherapists', {
      params: {id, name, title, email, location, min_Year: minYear, available} 
    }) //search Therapists
    .then(response => {
      console.log("Fetched Therapists:", response.data);
      setTherapists(response.data); //display data
    })
    .catch(error => {
      console.error('Error fetching Therapists:', error);
    });
  };

 const getAllTherapists =() =>{ //if user clicks search all (same as having no parameters)
  axios.get('http://localhost:3000/therapists/getAllTherapists', {
    params: { } 
  })
  .then(response => {
    console.log("Fetched Therapists:", response.data);
    setTherapists(response.data); // display data
  })
  .catch(error => {
    console.error('Error fetching Therapists:', error);
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
  return ( //form for searching Therapists 
    <div >
       <p className="bold">Search Therapists</p>
       <div className='flex'>
      <label> ID: </label>
      <input type="number" value={id} onChange={e => setId(e.target.value) } className="number"/>
      <label>Title: </label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <label>Name: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>Email: </label>
      <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      <label>location: </label>
      <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
      

      <label> Min Year of practice: </label>
      <input type="number" value={minYear} onChange={e => setMinYear(e.target.value)} className="number"/>


<div className='flex'>
      <label> Availability: </label>

   <div className="dropdown" ref={dropdownRef}>
  <button onClick={() =>{setDropdownOpen(!dropdownOpen)}} className="dropbtn">{available}</button>
  {dropdownOpen &&(
    <div className="dropdown-content">
    <button onClick={() =>{setAvailable('All'); setDropdownOpen(false);}} className='dropbutton'>All</button>
    <button onClick={() =>{setAvailable('TAKING CLIENTS'); setDropdownOpen(false);}} className='dropbutton'>TAKING CLIENTS</button>
    <button onClick={() =>{setAvailable('NOT TAKING CLIENTS'); setDropdownOpen(false);}} className='dropbutton'>NOT TAKING CLIENTS</button>
    <button onClick={() =>{setAvailable('TBD'); setDropdownOpen(false);}} className='dropbutton'>TBD</button>
  </div> )}
</div> 
</div>
</div>
      <div className='flex'>
<p>   </p>

      <button onClick={getTherapists}>Search</button> <p>   </p>
      <button onClick={getAllTherapists}>All Therapists</button> <p>   </p>
      <button onClick={clear}>clear search</button> 


    </div>
    </div>

    
  );
  
};


export default TherapistSearch;