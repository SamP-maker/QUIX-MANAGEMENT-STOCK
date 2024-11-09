import React from 'react';
import '../../../style/css/itemReturnForm.css';
import  {Addbutton, MinusButton,CancelButton,SubmitButton} from '../../../util/buttons';
import { CustomButton } from '../../../util/buttons';





function ItemForm(){


    const handleSubmit = (e)=>{
        e.preventDefault();
      }

    return(


     
<div className="container">

   
    <form className="top-container" onSubmit={handleSubmit}>
        


            
                <div className='Logo-Container'>
                            <h1 >Item Return Form</h1>
                </div>

                <hr className='Line'/>

                <div className="return-form-list-container">

                   <h1 className="Header">Department</h1>
                   <p1 className="Description">Mechanical</p1>
                   <h1 className="Header">Work Order</h1>
                   <p1 className="Description">HLENG</p1>
                   <h1 className="Header">Team</h1>
                   <p1 className="Description">Mohd Hirfan</p1>
                   <h1 className="Header">Return Date</h1>
                   <p1 className="Description">25/7/2024</p1>
                   <h1 className="Header">Items to Return</h1>


                   <div className="Item-detail-container">

                    <p>Spanner 30mm 4" </p>
                    
                    
                    <p>In-use</p>
                    
                    
                    <i class="arrow down"></i>
                   
                   
                   
                   </div>


                   <div className="Item-detail-container">

                    <p>Spanner 30mm 4" </p>
                    
                    
                    <p>In-use</p>
                    
                    
                    <i class="arrow down"></i>
                   
                   
                   
                   </div>


                   <div className="Item-detail-container">

                    <p>Spanner 30mm 4" </p>
                    
                    
                    <p>In-use</p>
                    
                    
                    <i class="arrow down"></i>
                   
                   
                   
                   </div>

                   
                </div>


    </form>


    




        
        
</div>
    )





}




export default ItemForm