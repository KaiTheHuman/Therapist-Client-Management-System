import React, { useState, useRef, useEffect} from 'react';
import axios from 'axios';
import "../index.css";

const ClientResults = ({clients, setClients}) => {
  const [upClient, setUpClient] = useState({});
  const [upButton, setUpButton] = useState(false);
      const [appRepeat, setAppRepeat] = useState('');
      const [dropdownOpen, setDropdownOpen] = useState(false);
        
      const dropdownRef = useRef(null); // For detecting outside clicks

const deleteClient =(id, name) =>{
  if(!upButton){
    if (window.confirm("Are you sure you want to delete "+ name+ "?")) {
      axios.get('http://localhost:3000/clients/deleteClients', {
        params: {id} 
      }) 
      .then(()=>{
        setClients((prevClients) => prevClients.filter((clients) => clients.id !== id));
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
     } 

  }
  else{
    setUpClient({}); // Exit edit mode
    setUpButton(false)
    setAppRepeat('');

  }
 

}

const updateClient = (client) =>{
  if(!upButton || upClient.id !== client.id){
    setUpButton(true)
    setUpClient({...client})
    setAppRepeat('');
  }
  else{
    setUpButton(false)
    if(appRepeat){
      upClient.frequency_of_appointments= appRepeat;
    }
   axios.get('http://localhost:3000/clients/updateClients', {
      params: {id: upClient.id, name: upClient.name, email: upClient.email, phone: upClient.phone, appRepeat: upClient.frequency_of_appointments}
    })
    .then(() => {
      setClients((prevClients) =>
        prevClients.map((t) => (t.id === upClient.id ? upClient : t))
      );
      setUpClient({}); // Exit edit mode
      setUpButton(false)
      setAppRepeat('');
    })
   

  }

}

const upInput = (e, field) => {
  setUpClient({...upClient, [field]: e.target.value});
};

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


    return(
        <div>

          
             <div id="info">
      <h2>Results:</h2>

      
 
    <table class="table">
      <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Frequency of Appointments</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              {clients.length > 0 ? ( //Displays any information is artists array
        
          clients.map((client, index) => (
            <tr key={index}>
            <td>{client.id}</td>
            <td>{upClient.id === client.id ?(
              <input value={upClient.name} 
              className='upInput'
              onChange={(e) => upInput(e, "name")}/>
            ) :(client.name) }</td>
            <td>{upClient.id === client.id ?(
              <input value={upClient.email} 
              className='upInput'
              onChange={(e) => upInput(e, "email")}/>
            ) :(client.email) }</td>
            <td>{upClient.id === client.id ?(
              <input value={upClient.phone} 
              className='upInput'
              type="number"
              onChange={(e) => upInput(e, "phone")}/>
            ) :(client.phone) }</td>
            <td className="dropdown" ref={dropdownRef}>{upClient.id === client.id ?(
<span>
<button onClick={() =>{setDropdownOpen(!dropdownOpen)}} className="dropbtn">{appRepeat ? (appRepeat): (client.frequency_of_appointments)}</button>
{dropdownOpen &&(
  <div className="dropdown-content">
  <button onMouseDown={() =>{setAppRepeat('TBD'); setDropdownOpen(false);}} className='dropbutton'>TBD</button>
  <button onMouseDown={() =>{setAppRepeat('WEEKLY'); setDropdownOpen(false);}} className='dropbutton'>WEEKLY</button>
  <button onMouseDown={() =>{setAppRepeat('MONTHLY'); setDropdownOpen(false);}} className='dropbutton'>MONTHLY</button>
</div> )}
</span>
            ) :(client.frequency_of_appointments) }</td>
            <td> <button className='TableButton' onClick={() =>{ updateClient(client)}}>{upClient.id === client.id ? "Save changes" : "Update Client"}</button></td>
            <td> <button className='TableButton'onClick={() =>deleteClient(client.id, client.name)}>{upClient.id === client.id ? "Delete changes" : "Delete Client"}</button></td>
            </tr>
            
             
          ))
            
          ) : (
            <p> No Clients Found </p>
          )}
          </tbody>
    </table>

  
    </div> 
        </div>
    )
}
export default ClientResults;