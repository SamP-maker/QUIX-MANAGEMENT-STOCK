import React from "react";
import "../../style/css/RequestList.css"
import Sidebar from "../navigation/Sidebar";
import { CustomButton } from "../../util/buttons";


const StockList = ()=>{



    return (
   <div className="page-container">
        <Sidebar/>

        <div className="stock-list-container">


        <label className="label-container"><h1>Pending Request</h1></label>

        
    <table className="pending-table-container">
       <tr>
       <th>Request ID</th>
       <th>Item Name</th>
       <th>Employee Name</th>
       <th>Item Detail</th>
       <th>Work Order</th>
       <th>Request Time</th>
       <th>Request Date</th>
       </tr>  

       
    </table>


            <div className="flexbox-container">

            <label className="label-container"><h1>Request History</h1></label>

            <div className="table-nav-container">

                <div className="left-container">
                <div className="button-sort-container">
            <select >
                <option value="0">Asc</option>
                <option value="0">Desc</option>
                <option value="0">Quantity</option>
                <option value="0">Item Id</option>
            </select>
        </div>
               
                <CustomButton text={"Export csv"} padding={"export"}/>
                </div>

                <div className="right-container">
                <CustomButton text={"Filter"} padding={"filter"}/>
                </div>
            </div>

            
    
    <table className="table-container">
       <tr>
       <th>Employee ID</th>
       <th>Employee Name</th>
       <th>Department</th>
       <th>Project Name</th>
       <th>Time createdAt</th>
       <th>Item Detail</th>
    
       

       
       </tr>  


       <tr>
       <td>001</td>
       <td>Grinder</td>
       <td>Hagrid Bin Alibaba</td>
       <td><a href="/"> Item Detail</a></td>
       <td>2A1</td>
       </tr>  

       
    </table>
            </div>


         

</div>






   </div>
    )
}





export default StockList