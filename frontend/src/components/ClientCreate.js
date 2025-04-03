import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; //import stuff
import "../index.css";


const ClientCreate = ({ setClients}) => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [appRepeat, setAppRepeat] = useState('TBD');
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

        const clear = () =>{
          setName('');
          setEmail('');
          setPhone('');
          setAppRepeat('TBD');
          
        }

      const createClients = () => { //when user presses create
        
        if(!name)
        {
          setClients([]);
            window.alert('New Clients must have a name');

        }
        else {
          
          axios.get('http://localhost:3000/clients/createClients', {
            params: { name, email, phone, appRepeat} // create Clients
          })
          .then(response => {
            
            
            axios.get('http://localhost:3000/clients/getClients', {
              params: { id:response.data.insertId } // get created Client
            })
            .then(response => {
              console.log("Fetched Clients:", response.data);
              setClients(response.data); // display new Client
            }) 
            
          })
          .catch(error => {
            console.error('Error fetching Clients:', error);
          });

          clear();
          
        }
       
        
      };
      return ( //form for creating Clients
        <div >
       <p className="bold">Create New Client</p>
       <div className='flex'>
      <label>Name: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>Email: </label>
      <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      <label>Phone: </label>
      <input type="number" value={phone} onChange={e => setPhone(e.target.value)} />
    



      <label> Frequency of Appointments: </label>

   <div className="dropdown" ref={dropdownRef}>
  <button onClick={() =>{setDropdownOpen(!dropdownOpen)}} className="dropbtn">{appRepeat}</button>
  {dropdownOpen &&(
    <div className="dropdown-content">
    <button onClick={() =>{setAppRepeat('TBD'); setDropdownOpen(false);}} className='dropbutton'>TBD</button>
    <button onClick={() =>{setAppRepeat('WEEKLY'); setDropdownOpen(false);}} className='dropbutton'>WEEKLY</button>
    <button onClick={() =>{setAppRepeat('MONTHLY'); setDropdownOpen(false);}} className='dropbutton'>MONTHLY</button>
  </div> )}
</div> 

</div>
      <div className='flex'>
<p>   </p>

      <button onClick={createClients}>Create</button> <p>   </p>
      <button onClick={clear}>Clear Inputs</button> 


    </div>
    </div>
    
        
      );
    };

export default ClientCreate;