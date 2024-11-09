import React,{useEffect,useState} from "react";
import "../../style/css/Sidebar.css"
import {Link} from 'react-router-dom';
import { CloseButton } from "../../util/buttons";
import { openSidebar } from "../../redux/feature/SidebarSlice";
import {useDispatch, useSelector} from 'react-redux';
import { fetchAllRequests } from "../../redux/feature/RequestSlice";
import { fetchAllReturns } from "../../redux/feature/ReturnSlice";
import { useLocation,useNavigate } from "react-router-dom";
import Notification from "../../util/notification";


const Sidebar = ({}) =>{

    const dispatch = useDispatch();
    const {revealSidebar,ReturnCount,RequestCount} = useSelector((store) => store.sidebar)
 
  
   


    const handleHideSidebar = ()=>{
        dispatch(openSidebar())
    }


   




return(


<div className="Side-panel-container">

   <div className="Button-Container">
            <CloseButton onClick={handleHideSidebar}/>
   </div>
    <Link to='/StockList' className="Sub-container-inventory" onClick={handleHideSidebar}>Inventory</Link>
    <Link to='/ConsumableList' className="Sub-container-account" onClick={handleHideSidebar}>Consumables </Link>
    
    <Link to='/RequestList' className="Sub-container-request" onClick={handleHideSidebar}>Request <Notification requestCount={true}/></Link>
 
    <Link to='/ReturnList' className="Sub-container-return" onClick={handleHideSidebar}>Return    <Notification returnCount={true}/></Link>
    <Link to='/' className="Sub-container-logout" onClick={handleHideSidebar}>Logout</Link>
    
    
    






</div>

)
}



export default Sidebar