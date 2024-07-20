import React from 'react';
import '../../../style/css/ItemDetailModal.css';





function ItemDetailModal(){



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
                              <th>Available Unit</th>
                              <th>Quantity</th>
                              
                              </tr>  


      
                          </table>
                          </div>
  </div>



        
        

    )





}




export default ItemDetailModal