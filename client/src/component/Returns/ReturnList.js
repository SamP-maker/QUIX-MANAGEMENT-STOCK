import React, {useEffect,useState} from "react";
import "../../style/css/ReturnList.css"
import Sidebar from "../navigation/Sidebar";
import { CustomButton,BurgerBars } from "../../util/buttons";
import {useDispatch, useSelector} from 'react-redux';
import { openSidebar } from "../../redux/feature/SidebarSlice";
import { useLocation,useNavigate } from "react-router-dom";
import { fetchAllReturns, updateReturnStatus} from "../../redux/feature/ReturnSlice";
import ItemForm from "./modal/ReturnItemDetailModal";




const useQuery = () =>{
    return new URLSearchParams(useLocation().search);
}
const Return = ()=>{
  
    const {revealSidebar} = useSelector((store) => store.sidebar)
    const {pendingReturns,itemSpreadList,columns,returnHistory,actionStatus} = useSelector((store) => store.return)
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = returnHistory.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(returnHistory.length / itemsPerPage);
    const [selectedData, setSelectedData] = useState(null);


    useEffect(()=>{console.log(returnHistory)},[])


    const handleOpenModal = (data) => {
        setSelectedData(data);
        setOpenModal(true);
   
    };
      
const renderPagination = () => {
    const pageNumbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }


    return (
        <div className="page-container">
            {pageNumbers.map((number) => (
                <button key={number} onClick={() => handlePageChange(number)}>
                    {number}
                </button>
            ))}
        </div>
    );
};


const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
};
    const [sortBy, setSortBy] = useState(query.get('sortBy') || 'created_at');
    const [sortOrder, setSortOrder] = useState(query.get('sortOrder') || 'asc');


    useEffect(()=>{
        dispatch(fetchAllReturns({ sortBy: sortBy, sortOrder: sortOrder }));




    },[dispatch, sortBy, sortOrder])



    const updateQueryParams = (newSortBy, newSortOrder) =>{
        const searchParams = new URLSearchParams();
        searchParams.set('sortBy', newSortBy);
        searchParams.set('sortOrder',newSortOrder)
        navigate({search: searchParams.toString()});
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
    };





    const handleHideSidebar = ()=>{
        dispatch(openSidebar())
    }

    const handleSortChange = (e)=>{
        const newSortBy = e.target.value;
        updateQueryParams(newSortBy, sortOrder);
    }

    const handleOrderChange = (e) =>{
        const newSortOrder = e.target.value;
        updateQueryParams(sortBy, newSortOrder);
    }

    if (actionStatus.status === 'loading') {
        return <div>Loading...</div>;
    }

    if (actionStatus.status === 'failed') {
        return <div>Error: {actionStatus.error}</div>;
    }



    
    const renderTableheaders = () => {

        const filterString = (string = '') => {
            // Replace underscores with spaces
            let formattedString = string.replace(/_/g, ' ');
    
            // Convert to title case
            formattedString = formattedString.replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            });
    
            return formattedString;
        }
       
    
        return (
          
                <tr>
                    {columns.map((column) => 
                        <th key={column}>{filterString(column)}</th>
                    )}
                </tr>
       
        );
    }


   

    const renderTableRows = () => {
        return currentItems.map((item) => (
            <tr key={item.request_id}>
                <td>{item.request_id}</td>
                <td>{item.returner_id}</td>
                <td>{item.created_at}</td>
                <td>{item.updated_at}</td>
                <td>{item.request_status}</td>
                <td>{item.work_order}</td>
                <td>{item.team}</td>
                <td>{item.department}</td>
                
                <td>{ <a  onClick={()=>handleOpenModal(item)}> View </a>}</td>
            </tr>
        ));
    }

    const renderNewRequest = ()=>{

    
        return pendingReturns.map((item)=>(
                <form>
                 
             
            <div className="pending-table-container " key={item.request_id}>
     
      
            <i class="fa fa-file"></i>
                <p1>{item.team.charAt(0).toUpperCase() + item.team.substring(1).toLowerCase()}</p1>
                <p1>{item.department.charAt(0).toUpperCase() + item.department.substring(1).toLowerCase()}</p1>
                <p1>{item.created_at}</p1>
                <div className="view-modal-container" onClick={()=>handleOpenModal(item)}>View</div>
                {console.log(item)}
        
            </div>
            </form>
        ))
    }
    
    

    

    const exportToCSV = () => {
        // Create CSV rows
        const csvRows = [];
    
        // Add headers
        const headers = columns.join(',');
        csvRows.push(headers);
    
        // Add data rows
        returnHistory.forEach(item => {
            const values = columns.map(column => item[column]);
            csvRows.push(values.join(','));
        });
    
        // Create CSV string
        const csvString = csvRows.join('\n');
    
        // Create a Blob from the CSV string
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    
        // Create a link element
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
    
        // Set link attributes
        link.setAttribute('href', url);
        link.setAttribute('download', 'inventory.csv');
        link.style.visibility = 'hidden';
    
        // Append link to the body
        document.body.appendChild(link);
    
        // Programmatically click the link to trigger the download
        link.click();
    
        // Remove link from the body
        document.body.removeChild(link);
    };
    



    return (
        <div className={"page-container"}>
        
{openModal ? 
    <div className={"item-form-border"}>
                <ItemForm
                   data={selectedData}
                    onClose={() => setOpenModal(false)}
                />
               </div>
            : null}
   <div className={`${openModal ? 'blur-background' : ''}`}>



        <div className="stock-list-container">

        <BurgerBars onClick={handleHideSidebar}></BurgerBars>
        {revealSidebar ? <Sidebar/> : null}
        

        
       
        <label className="label-container"><h1>Pending Returns</h1></label>
        {renderNewRequest()}
        
     
 
 


            <div className="flexbox-container">

            <label className="label-container"><h1>Return History</h1></label>

            <div className="table-nav-container">

                <div className="left-container">
               
                <CustomButton padding={"request-sort"} text={"Sort by:"} sortBy={sortBy} onChange={handleSortChange}/>
                <CustomButton padding={"order"} text={"Order by:"} sortOrder={sortOrder} onChange={handleOrderChange}/>
                <CustomButton text={"Export csv"} padding={"csv"} onClick={exportToCSV}/>
        
               
   
                </div>

                <div className="right-container">
                <div className="custom-container">
            <label>Filter</label>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
        </div>
                </div>
            </div>

            
    
    <table className="table-container">
  
    <thead>
   
   {renderTableheaders()}
           
      </thead>
      <tbody>
      {renderTableRows()}
      </tbody>


       
    </table>


    {renderPagination()}
            </div>


         

</div>






   </div>
   </div>
    )
}





export default Return
