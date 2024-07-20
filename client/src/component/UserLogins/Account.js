import React from "react";
import '../../style/css/Account.css';
import Sidebar from '../navigation/Sidebar';
import { SubmitButton, CancelButton} from "../../util/buttons";



const Account = () =>{


    return(


        
        <div className="page-container">
            <Sidebar/>


            <div className="account-container">


               <form className="personal-form-container">

                <h3 className="personal-info">Personal Information</h3>

                <div className="label-input-container">

                        <label className='label-container'>First Name</label>
                        <input className="input-container"></input>

                </div>

                <div className="label-input-container">

                        <label className='label-container'>Last Name</label>
                        <input className="input-container"></input>

                </div>

                <div className="label-input-container">

                        <label className='label-container'>Email</label>
                        <input className="input-container"></input>

                </div>

                <div className="label-input-container">

                        <label className='label-container'>Phone Number</label>
                        <input className="input-container"></input>

                </div>
             

               </form>
       


            </div>
        
       
        
        
        </div>
    )






}


export default Account