import React from 'react';
import '../../../style/css/itemForm.css';
import  {Addbutton, MinusButton,CancelButton,SubmitButton} from '../../../util/buttons';






function ItemForm(){


    const handleSubmit = (e)=>{
        e.preventDefault();
      }

    return(


     
<div className="container">

   
    <form className="top-container" onSubmit={handleSubmit}>
        


            
                <div className='Logo-Container'>
                            <h1 >Item Borrow Form</h1>
                </div>

                <hr className='Line'/>


    <div className="search-container">
                                <input className="input-container" placeholder='Search for an item'></input>
                                                <i class="fas fa-filter fa-xs"></i>
    </div>

    <div className='item-added-container'>
        <p2> Spanner 30mm 4"</p2>

                                <div className='count-container'>

                                <Addbutton/>
                                        <p1>1</p1>
                                <MinusButton/>
                                </div>
    </div>

    <div className="label-input-container">

        <label  className='label-container'>Department</label>
                            <select className='Department'>
                                    <option value="Inspection-Team">Inspection</option>
                                    <option value="Scaffold-Team">Scaffold</option>
                                    <option value="Insulation-Team">Insulation</option>
                                    <option value="Mechanical-Team">Mechanical Team</option>

                            </select>
    </div>

    <div className="label-input-container">
                                    <label  className='label-container'>Work Order</label>
                                    <input className="input-container"></input>
    </div>


    <div className="label-input-container">
                                    <label  className='label-container'>Team</label>
                                    <input className="input-container"></input>
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