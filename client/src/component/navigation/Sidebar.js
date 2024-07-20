import React from "react";
import "../../style/css/Sidebar.css"
import {Link} from 'react-router-dom';




const Sidebar = () =>{


return(


<div className="Side-panel-container">


    <Link to='/StockList' className="Sub-container-inventory">Inventory</Link>
    <Link to='/RequestList' className="Sub-container-request">Request</Link>
    <Link to='/ReturnList' className="Sub-container-return">Return</Link>
    <Link to='/Account' className="Sub-container-account">Account</Link>
    <Link to='/' className="Sub-container-logout">Logout</Link>
    






</div>

)
}



export default Sidebar