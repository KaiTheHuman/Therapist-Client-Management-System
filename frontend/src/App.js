import React from "react";  //import react
import Navbar from "./components/Navbar"; //import navbar componenet
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom"; //this imports routes so we can access different pages
import Therapist from "./pages";  //import pages
import Client from "./pages/Client";
import Session from "./pages/Session";


function App() {// fill Navbar with links to the other pages, path / means main page (so http://localhost:3000)
   
    return (
        <div >
        



        <Router> 
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Therapist />} />
                <Route path="/Client" element={<Client />} />
                <Route path="/Session" element={<Session />}/>
                
            </Routes>
        </Router>
        
        </div>
        

        
    );
}

export default App;
