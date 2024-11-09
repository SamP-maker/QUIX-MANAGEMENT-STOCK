import React,{useState} from 'react';
import '../../../style/css/itemReturnForm.css';
import  {CloseButton,Addbutton, MinusButton,CancelButton,SubmitButton} from '../../../util/buttons';
import { useSelector, useDispatch } from 'react-redux';






function ItemForm(){

    const {pendingReturns,returnHistory} = useSelector((store) => store.returnForm)
    const {item} = useSelector((store) => store.itemForm)
    const [team, setTeam] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault();
      }

    return(


     
<div className="container">

   
    <form className="top-container" onSubmit={handleSubmit}>
        
    <div className="Close-Button-Container">
    <CloseButton/>
    </div>      

            
                <div className='Logo-Container'>
                            <h1 >Item Return Form</h1>
                </div>

                <hr className='Line'/>

                
{pendingReturns.map( (returnItem) => (
            <div className="return-form-list-container">

                   <h1 className="Header">Department</h1>
                   <p1 className="Description">{returnItem.department}</p1>
                   <h1 className="Header">Work Order</h1>
                   <p1 className="Description">{returnItem.WorkOrder}</p1>
                   <h1 className="Header">Team</h1>
                   <p1 className="Description">{returnItem.Team}</p1>
                   <h1 className="Header">Return Date</h1>
                   <p1 className="Description">{returnItem.expiry}</p1>
                   <h1 className="Header">Items to Return</h1>
                   {item.map( (ItemDetails) => (
                   
                   <div className="Item-detail-container">

                    <p>{ItemDetails.item_name}</p>
                    
                    <select className='Department' value={ItemDetails.status} onChange={(e) => dispatch(e.target.value)}>
                                    <option value="Inspection-Team">InUse</option>
                                    <option value="Scaffold-Team">Missing</option>
                                    <option value="Insulation-Team">Broken</option>

                            </select>

                            <i class="arrow down"></i>
                   
                    
                    
                    
                   
                   
                   
                   </div>
                   )
                   
                   )}


</div> 







))}

                  




  <div className="form-event-button">
                                    <CancelButton/>
                                    <SubmitButton/>
  </div>
    </form>


    




        
        
</div>
    )





}




export default ItemForm