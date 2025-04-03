import React, { useState} from 'react';
import axios from 'axios';
import "../index.css";

const SessionResults = ({sessions,setSessions}) => {
  const [upSession, setUpSession] = useState({});
  const [upButton, setUpButton] = useState(false);

const deleteSession =(id) =>{
  if (window.confirm("Are you sure you want to delete "+ id+ "?")) {
    axios.get('http://localhost:3000/sessions/deleteSessions', {
      params: {id} 
    }) 
    .then(()=>{
      setSessions((prevSessions) => prevSessions.filter((sessions) => sessions.id !== id));
    })
    .catch(error => {
      console.error('Error fetching Sessions:', error);
    });
   } 

}


const updateSession = (session) =>{
  console.log(upButton);
  if(!upButton){
    setUpButton(true)
    setUpSession({...session})
  }
  else{
    if(!upSession.client_id || !upSession.therapist_id)
    {
      window.alert('Sessions must have a client and therapist');
      return
    }
    
    axios.get('http://localhost:3000/clients/getClients', {
    params: { id: upSession.client_id} 
    })
    .then(response => {
      if(response.data.length ===0)
      {
        window.alert('Invalid client ID');
        return
      }

      
      axios.get('http://localhost:3000/therapists/getTherapists', {
        params: { id: upSession.therapist_id}
      })
        .then(response2 =>{
          if(response2.data.length ===0){
            window.alert('Invalid therapist ID');
            return;
          }
          else{
          }
        })
        
      })

    console.log("get updates", upSession.date)
   axios.get('http://localhost:3000/sessions/updateSessions', {
      params: {id: upSession.id, therapist_id: upSession.therapist_id, client_id: upSession.client_id, date: upSession.date, notes: upSession.notes, length: upSession.length}
    })
    .then(() => {
      setSessions((prevSessions) =>
        prevSessions.map((t) => (t.id === upSession.id ? upSession : t))
      );
      setUpSession({}); // Exit edit mode
      setUpButton(false)
    })
  

  }

}

const upInput = (e, field) => {
  setUpSession({...upSession, [field]: e.target.value});
};

    return(
        <div>

          
             <div id="info">
      <h2>Results:</h2>
      
 
    <table class="table">
      <thead>
                <tr>
                <th>ID</th>
                <th>Therapist</th>
                <th>Client</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Length in Hours</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              {sessions.length > 0 ? ( //Displays any information is artists array
        
        sessions.map((session, index) => (
            <tr key={index}>
            <td>{session.id}</td>
            <td>{upSession.id === session.id ?(
              <input value={upSession.therapist_id} 
              className='upInput'
              type='number'
              onChange={(e) => upInput(e, "therapist_id")}/>
            ) :(session.therapist_id) }</td>
            <td>{upSession.id === session.id ?(
              <input value={upSession.client_id} 
              className='upInput'
              type='number'
              onChange={(e) => upInput(e, "client_id")}/>
            ) :(session.client_id) }</td>
            <td>{upSession.id === session.id ?(
              <input value={new Date(upSession.date).toISOString().split("T")[0]} 
              type="date"
              className='upInput'
              onChange={(e) => upInput(e, "date")}/>
            ) :(new Date(session.date).toISOString().split("T")[0]) }</td>
            <td>{upSession.id === session.id ?(
              <input value={upSession.notes} 
              className='upInput'
              onChange={(e) => upInput(e, "notes")}/>
            ) :(session.notes) }</td>
            <td>{upSession.id === session.id ?(
              <input value={upSession.length} 
              className='upInput'
              type='number'
              onChange={(e) => upInput(e, "length")}/>
            ) :(session.length) }</td>
            <td> <button className='TableButton' onClick={() =>{ updateSession(session)}}>{upSession.id === session.id ? "Save changes" : "Update Session"}</button></td>
            <td> <button className='TableButton'onClick={() =>deleteSession(session.id)}>Delete Session</button></td>
            </tr>
            
             
          ))
            
          ) : (
            <p> No Sessions Found </p>
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
export default SessionResults;