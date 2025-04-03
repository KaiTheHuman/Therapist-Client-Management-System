import React, { useState} from "react";  //import react, states, and all Therapists components an subcomponents
import TherapistSearch from '../components/TherapistSearch';
import TherapistResults from "../components/TherapistResults";
import TherapistCreate from '../components/TherapistCreate';


const Therapist = () => {  
    const [therapists, setTherapists] = useState([]); //stores array of selected Therapists

  
    return (// all the components with the values they need.
        <div>
      <h2>Therapists Page</h2> 
       <TherapistSearch  setTherapists={setTherapists} /> 
      <TherapistResults therapists={therapists} setTherapists={setTherapists}/>
      <TherapistCreate setTherapists={setTherapists}  />
    </div>
    );
};



export default Therapist;
