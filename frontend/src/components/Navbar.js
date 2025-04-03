import React from "react";  //Navbar componenet
import "../index.css";

const Navbar = () => {
    return ( //a simple list with links to each page
    
<ul>
<li><a href="/">Therapist</a></li>
<li><a href="/Client">Client</a></li>
<li><a href="/Session">Session</a></li>
</ul>

    );
};

export default Navbar;


