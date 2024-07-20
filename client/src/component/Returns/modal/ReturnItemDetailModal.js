import React from 'react';
import '../../../style/css/itemReturnForm.css';
import  {Addbutton, MinusButton,CancelButton,SubmitButton} from '../../../util/buttons';
import { CustomButton } from '../../../util/buttons';





function ReturnItemDetailModal(){




    return(

        <div className="container">
        <div className="top-container">
          <div className='close-button-container'>
        <i class="fa fa-times fa-lg"></i>
    
        </div>
                              <table className="table-container">
                                  <tr>
                                  <th>Item ID</th>
                                  <th>Item Name</th>
                                  <th>Status</th>
                                  </tr>  
    
    
          
                              </table>
                              </div>
      </div>
    
    
    
            
            
    
        )





}




export default ReturnItemDetailModal