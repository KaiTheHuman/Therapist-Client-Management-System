import React, { useState} from "react";  //import react, states, and all Clients components an subcomponents
import ClientSearch from '../components/ClientSearch.js';
import ClientResults from "../components/ClientResults.js";
import ClientCreate from "../components/ClientCreate.js";


const Client = () => {  
    const [clients, setClients] = useState([]); //stores array of selected Clients
  
    return (// all the components with the values they need.
        <div>
      <h1>Clients Page</h1> 
       <ClientSearch  setClients={setClients}  /> 
       <ClientResults clients={clients}  setClients={setClients}/>
       <ClientCreate setClients={setClients} />
    </div>
    );
};



export default Client;
