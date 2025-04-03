import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import "../index.css";

const TherapistResults = ({therapists, setTherapists}) => {
  const [upTherapist, setUpTherapist] = useState({});
  const [upButton, setUpButton] = useState(false);
      const [available, setAvailaible] = useState('');
      const [dropdownOpen, setDropdownOpen] = useState(false);
        
      const dropdownRef = useRef(null); // For detecting outside clicks

const deleteTherapist =(id, name) =>{
  if(!upButton){
    if (window.confirm("Are you sure you want to delete "+ name+ "?")) {
      axios.get('http://localhost:3000/therapists/deleteTherapists', {
        params: {id} 
      }) 
      .then(()=>{
        setTherapists((prevTherapists) => prevTherapists.filter((therapists) => therapists.id !== id));
      })
      .catch(error => {
        console.error('Error fetching Therapists:', error);
      });
     } 
  }
  else{
    setUpTherapist({}); // Exit edit mode
    setUpButton(false)
    setAvailaible("");
  }
  
    
}


const updateTherapist = (therapist) =>{
  if(!upButton || upTherapist.id !== therapist.id){
    setUpButton(true)
    setUpTherapist({...therapist})
    setAvailaible('');
  }
  else{
    setUpButton(false)
    if(available){
      upTherapist.available= available;
    }
    
   axios.get('http://localhost:3000/therapists/updateTherapists', {
      params: {id: upTherapist.id, title: upTherapist.title, name: upTherapist.name, email: upTherapist.email, location: upTherapist.location, year: upTherapist.years_of_expirience, available:upTherapist.available}
    })
    .then(() => {
      setTherapists((prevTherapists) =>
        prevTherapists.map((t) => (t.id === upTherapist.id ? upTherapist : t))
      );
      setUpTherapist({}); // Exit edit mode
      setUpButton(false)
      setAvailaible("");
    })
   

  }

}

const upInput = (e, field) => {
  setUpTherapist({...upTherapist, [field]: e.target.value});
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
                <th>Title</th>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Years of Expirience</th>
                <th>Availability</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              {therapists.length > 0 ? ( //Displays any information is artists array
        
          therapists.map((therapist, index) => (
            <tr key={index}>
            <td>{therapist.id}</td>

            <td>{upTherapist.id === therapist.id ?(
              <input value={upTherapist.title} 
              className='upInput'
              onChange={(e) => upInput(e, "title")}/>
            ) :(therapist.title) }</td>

            <td>{upTherapist.id === therapist.id ?(
              <input value={upTherapist.name} 
              className='upInput'
              onChange={(e) => upInput(e, "name")}/>
            ) :(therapist.name) }</td>

            <td>{upTherapist.id === therapist.id ?(
              <input value={upTherapist.email} 
              className='upInput'
              onChange={(e) => upInput(e, "email")}/>
            ) :(therapist.email) }</td>

            <td>{upTherapist.id === therapist.id ?(
              <input value={upTherapist.location}
              className='upInput'
              onChange={(e) => upInput(e, "location")} />
            ) :(therapist.location) }</td>

            <td>{upTherapist.id === therapist.id ?(
              <input value={upTherapist.years_of_expirience} 
              className='upInput'
              type="number"
              onChange={(e) => upInput(e, "years_of_expirience")}/>
            ) :(therapist.years_of_expirience) }</td>

<td className="dropdown" ref={dropdownRef}>{upTherapist.id === therapist.id ?(
<span>
<button onClick={() =>{setDropdownOpen(!dropdownOpen)}} className="dropbtn">{available ? (available): (therapist.available)}</button>
{dropdownOpen &&(
  <div className="dropdown-content">
  <button onMouseDown={() =>{setAvailaible('TBD'); setDropdownOpen(false);}} className='dropbutton'>TBD</button>
  <button onMouseDown={() =>{setAvailaible('TAKING CLIENTS'); setDropdownOpen(false);}} className='dropbutton'>TAKING CLIENTS</button>
  <button onMouseDown={() =>{setAvailaible('NOT AVAILABLE'); setDropdownOpen(false);}} className='dropbutton'>NOT AVAILABLE</button>
</div> )}
</span>
            ) :(therapist.available) }</td>

            <td> <button className='TableButton' onClick={() =>{ updateTherapist(therapist)}}>{upTherapist.id === therapist.id ? "Save changes" : "Update Therapist"}</button></td>
            <td> <button className='TableButton'onClick={() => deleteTherapist(therapist.id, therapist.name)}>{upTherapist.id === therapist.id ? "Delete changes" : "Delete Therapist"}</button></td>
            </tr>
            
             
          ))
            
          ) : (
            <p> No Therapists Found </p>
          )}
          </tbody>
    </table>

  


{/*{updateButton && ( //display info but with any new info you want updated added
        <div>
          <h3>To: </h3>

          {artists.length > 0 ? (
        <ul>
          {artists.map((artist, index) => {
            let songs = artist.song_list ? JSON.parse(artist.song_list) : [];
            let albums = artist.album_list ? JSON.parse(artist.album_list) : [];
            if (!Array.isArray(albums)) albums = [];
            return(
            <li key={index}>
              {}
                {upToName ?(
                  <> New Name: {upToName}</>
                ) :(
                  <> Name: {artist.artist_name}</>
                )}
                 {upToGenre ?(
                  <> New Genre: {upToGenre}</>
                ) :(
                  <> Genre: {artist.genre}</>
                )}
                {upToListeners ?(
                  <> New Monthly Listeners: {upToListeners}</>
                ) :(
                  <> Monthly Listeners: {artist.monthly_listeners}</>
                )}
              
              Songs List: {songs.length > 0 ? songs.map(song => song.song_name).join(', '): 'None'}| 
              Albums List: {albums.length > 0 ? albums.map(album => album.album_name).join(', '): 'None'} | 
              ID: {artist.id}
            </li>
            );
          })}
        </ul>
      ) : (
        <p> {noData} </p>
      )}
          </div>

          
      )}*/}
    </div> 
        </div>
    )
}
export default TherapistResults;