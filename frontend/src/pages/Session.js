import React, { useState} from "react"; //import react and useState
import SessionSearch from "../components/SessionSearch"; //import Session components
import SessionResults from "../components/SessionResults";
import SessionCreate from "../components/SessionCreate";



const Session = () => {  
    const [sessions, setSessions] = useState([]); // array for selected Sessions


  
    return ( //all the componenets with all the shared varaibles connected to them.
        <div>
      <h1>Sessions Page</h1>
       <SessionSearch  setSessions={setSessions}    /> 
       <SessionResults sessions={sessions} setSessions={setSessions}  />
       <SessionCreate setSessions={setSessions}  />
    </div>
    );
};



export default Session;

