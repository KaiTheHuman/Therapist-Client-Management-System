import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; //import stuff
import "../index.css";

const TherapistCreate = ({ setTherapists}) => {
        const [name, setName] = useState('');
        const [title, setTitle] = useState('');
        const [email, setEmail] = useState('');
        const [location, setLocation] = useState('');
        const [minYear, setMinYear] = useState('');
        const [available, setAvailable] = useState('TBD');
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
          setTitle('');
          setEmail('');
          setLocation('');
          setMinYear('');
          setAvailable('TBD');
          
        }

      const createTherapists = () => { //when user presses create
        if(!name)
        {
          setTherapists([]);
            window.alert('New Therapists must have a name');

        }
        else {
          axios.get('http://localhost:3000/therapists/createTherapists', {
            params: { name, title, email, location, min_Year: minYear, available} // create Therapists
          })
          .then(response => {
            
            axios.get('http://localhost:3000/therapists/getTherapists', {
              params: { id:response.data.insertId } // get created Therapist
            })
            .then(response => {
              console.log("Fetched Therapists:", response.data);
              setTherapists(response.data); // display new Therapist
            }) 
            
          })
          .catch(error => {
            console.error('Error fetching Therapists:', error);
          });

          clear();
          
        }
       
        
      };
      return ( //form for creating Therapists
        <div >
       <p className="bold">Create New Therapist</p>
       <div className='flex'>
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
    <button onClick={() =>{setAvailable('TBD'); setDropdownOpen(false);}} className='dropbutton'>TBD</button>
    <button onClick={() =>{setAvailable('TAKING CLIENTS'); setDropdownOpen(false);}} className='dropbutton'>TAKING CLIENTS</button>
    <button onClick={() =>{setAvailable('NOT TAKING CLIENTS'); setDropdownOpen(false);}} className='dropbutton'>NOT TAKING CLIENTS</button>
  </div> )}
</div> 
</div>
</div>
      <div className='flex'>
<p>   </p>

      <button onClick={createTherapists}>Create</button> <p>   </p>
      <button onClick={clear}>Clear inputs</button> 


    </div>
    </div>
    
        
      );
    };

export default TherapistCreate;