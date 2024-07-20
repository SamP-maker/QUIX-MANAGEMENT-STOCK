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

                    <div className="Checkbox">
                    Spanner 30mm 4"<CustomButton text={"Returned"} padding={"return"}>Returned</CustomButton> <CustomButton text={"Missing"} padding={"missing"}>Missing</CustomButton> <CustomButton text={"Broken"} padding={"broken"}>Broken</CustomButton>
                    </div>

                    <div className="Checkbox">
                    Spanner 30mm 4"<CustomButton text={"Returned"} padding={"return"}>Returned</CustomButton> <CustomButton text={"Missing"} padding={"missing"}>Missing</CustomButton> <CustomButton text={"Broken"} padding={"broken"}>Broken</CustomButton>
                    </div>

                    <div className="Checkbox">
                    Spanner 30mm 4"<CustomButton text={"Returned"} padding={"return"}>Returned</CustomButton> <CustomButton text={"Missing"} padding={"missing"}>Missing</CustomButton> <CustomButton text={"Broken"} padding={"broken"}>Broken</CustomButton>
                    </div>

                   
                </div>



  <div className="form-event-button">
                                    <CancelButton/>
                                    <SubmitButton/>
  </div>
    </form>


    




        
        
</div>
    )





}




export default ItemForm