import React from "react";
import "../../style/css/StockList.css"
import Sidebar from "../navigation/Sidebar";
import { CustomButton } from "../../util/buttons";


const StockList = ()=>{



    return (
   <div className="page-container">
        <Sidebar/>

        <div className="stock-list-container">


            <div className="flexbox-container">

            <label className="label-container"><h1>Inventory</h1></label>

            <div className="table-nav-container">

                <div className="left-container">
                <CustomButton padding={"sort"}/>
               
                <CustomButton text={"Export csv"} padding={"export"}/>
                </div>

                <div className="right-container">
                <CustomButton text={"Filter"} padding={"filter"}/>
                </div>
            </div>

            
    
    <table className="table-container">
       <tr>
       <th>Item ID</th>
       <th>Item Name</th>
       <th>Quantity</th>
       <th>Missing Items</th>
       <th>Broken Items</th>
       <th>Total Count</th>
       </tr>  


       <tr>
       <td>001</td>
       <td>Grinder</td>
       <td>1</td>
       <td>7</td>
       <td>3</td>
       <td>3</td>
       </tr>  

       
    </table>
            </div>


         

</div>






   </div>
    )
}





export default StockList