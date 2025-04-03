import React, { useState} from 'react';
import axios from 'axios'; //import stuff
import "../index.css";

const SessionCreate = ({ setSessions}) => {
  const [therapist, setTherapist] = useState('');
  const [client, setClient] = useState('');
  const [notes, setNotes]= useState('');
  const [date, setDate] = useState('');
  const [length, setLength] = useState('');
  const [check, setCheck] = useState(false);
      

        const clear = () =>{
          setTherapist('');
          setClient('');
          setNotes('');
          setDate('');
          setLength('');
          
        }

      const createSessions = () => { //when user presses create
        setCheck(false);
        if(!client || !therapist)
        {
          setSessions([]);
            window.alert('New Sessions must have a client and therapist');

        }
        else{
          console.log("CLIENT ID",client);
          axios.get('http://localhost:3000/clients/getClients', {
            params: { id: client} 
          })
          .then(response => {
            if(response.data.length>0){
              console.log("THERAPIST ID",therapist);
              axios.get('http://localhost:3000/therapists/getTherapists', {
                params: { id: therapist}
              })
              .then(response2 =>{
                if(response2.data.length>0){
                  setCheck(true)
                  console.log("SET CHECK")
                }
                else{
                  setSessions([]);
            window.alert('Invalid therapist ID');
                }
              })
            }
            else{
              setSessions([]);
            window.alert('Invalid client ID');
            }
          })

        }
        console.log(check)
        if(check) {
          console.log(check)
          console.log("PASSED CHECKS")
          axios.get('http://localhost:3000/sessions/createSessions', {
            params: { therapist, client, notes, date, length} // create Sessions
          })
          .then(response => {
            console.log("SESSION MADE");
            axios.get('http://localhost:3000/sessions/getsessions', {
              params: { id:response.data.insertId } // get created Session
            })
            .then(response2 => {
              console.log("Fetched Sessions:", response2.data);
              setSessions(response2.data); // display new Session
            }) 
            
          })
          .catch(error => {
            console.error('Error fetching Sessions:', error);
          });

          clear();
          
        }
       
        
      };
      return ( //form for creating Sessions
        <div >
       <p className="bold">Create New Session</p>
       <div className='flex'>
      <label>Therapist ID: </label>
      <input type="number" value={therapist} onChange={e => setTherapist(e.target.value)} className='number' />
      <label>Client ID: </label>
      <input type="number" value={client} onChange={e => setClient(e.target.value)} className='number'/>
      <label> Date: </label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <label>length (in Hours): </label>
      <input type="number" value={length} onChange={e => setLength(e.target.value)} className='number' />
      </div>
      <div className='flex'>
      <label>Notes: </label>
      <textarea  value={notes} onChange={e => setNotes(e.target.value)} className='notes'/>
      </div>


      <div className='flex'>
<p>   </p>

      <button onClick={createSessions}>Create</button> <p>   </p>
      <button onClick={clear}>Clear Inputs</button> 


    </div>
    </div>
    
        
      );
    };

export default SessionCreate;