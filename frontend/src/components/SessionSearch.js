import React, { useState } from 'react';
import axios from 'axios';
import "../index.css";

const SessionSearch = ({ setSessions}) => {
  const [id, setId] = useState(''); //variables for searching Sessions
  const [therapist, setTherapist] = useState('');
  const [client, setClient] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minLength, setMinLength] = useState('');
  const [maxLength, setMaxLength] = useState('');

//beep boop beep boop
  const clear = () =>{
    setId('');
    setTherapist('');
    setClient('');
    setMinDate('');
    setMaxDate('');
    setMinLength('');
    setMaxLength('');
    setSessions([]);
    
  }

  const getSessions = () => { //if user clicks search

    axios.get('http://localhost:3000/sessions/getSessions', {
      params: {id, therapist, client, minDate, maxDate, minLength, maxLength} 
    }) //search Sessions
    .then(response => {
      console.log("Fetched Sessions:", response.data);
      setSessions(response.data); //display data
    })
    .catch(error => {
      console.error('Error fetching Sessions:', error);
    });
  };

 const getAllSessions =() =>{ //if user clicks search all (same as having no parameters)
  axios.get('http://localhost:3000/sessions/getAllSessions', {
    params: { } 
  })
  .then(response => {
    console.log("Fetched Sessions:", response.data);
    setSessions(response.data); // display data
  })
  .catch(error => {
    console.error('Error fetching Sessions:', error);
  });
 };

  return ( //form for searching Sessions 
    <div >
       <p className="bold">Search Sessions</p>
       <div className='flex'>
      <label> ID: </label>
      <input type="number" value={id} onChange={e => setId(e.target.value) } className="number"/>
      <label>Therapist ID: </label>
      <input type="number" value={therapist} onChange={e => setTherapist(e.target.value)} className="number"/>
      <label>Client ID: </label>
      <input type="number" value={client} onChange={e => setClient(e.target.value)} className="number"/>
      <label>Min Date: </label>
      <input type="date" value={minDate} onChange={e => setMinDate(e.target.value)} />
      <label>Max Date: </label>
      <input type="date" value={maxDate} onChange={e => setMaxDate(e.target.value)} />
      <label>Minimum Hours: </label>
      <input type="number" value={minLength} onChange={e => setMinLength(e.target.value)} className="number" />
      <label>Maximum Hours: </label>
      <input type="number" value={maxLength} onChange={e => setMaxLength(e.target.value)} className="number"/>

</div>
      <div className='flex'>
<p>   </p>

      <button onClick={getSessions}>Search</button> <p>   </p>
      <button onClick={getAllSessions}>All Sessions</button> <p>   </p>
      <button onClick={clear}>Clear Search</button> 


    </div>
    </div>

    
  );
  
};


export default SessionSearch;