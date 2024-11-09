import React, { useEffect,useState} from "react";
import "../../style/css/StockList.css"
import Sidebar from "../navigation/Sidebar";
import { CustomButton, BurgerBars} from "../../util/buttons";
import {useDispatch, useSelector} from 'react-redux';
import { openSidebar } from "../../redux/feature/SidebarSlice";
import { fetchAllInventory } from "../../redux/feature/InventorySlice";
import { useLocation, useNavigate } from 'react-router-dom';
import { AddItemButton} from "../../util/buttons";
import SearchBar from "../../util/search-bar-content";


const useQuery = () =>{
    return new URLSearchParams(useLocation().search);
}



const StockList = ()=>{

    const dispatch = useDispatch();
    const {revealSidebar} = useSelector((store) => store.sidebar)
    const{columns,inventories, actionStatus,newInventories} = useSelector((store) => store.inventory)
    const query = useQuery();
    const navigate = useNavigate();

    const [newItem, setNewItem] = useState([])
    const [ITEMNAME, setItemName] = useState('')
    const [ITEMAVAILABLE, setItemAvailable] = useState(0)
    const [ITEMPRICE, setItemPrice] = useState(0)

    

    const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(25);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = inventories.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(inventories.length / itemsPerPage);

const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
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


  



    const handleNewItems = () => {
        const itemExists = newItem.find(item => item.item_name === ITEMNAME && item.price_per_unit_myr === ITEMPRICE);
    
        if (itemExists) {
            // Item exists, update the available count and total count
            setNewItem(newItem.map(item =>
                item.item_name === ITEMNAME && item.price_per_unit_myr === ITEMPRICE
                    ? {
                        ...item,
                        available: item.available + ITEMAVAILABLE,
                        total_count: item.total_count + ITEMAVAILABLE,
                        total_stock_price_myr: (item.available + ITEMAVAILABLE) * ITEMPRICE
                    }
                    : item
            ));
        } else {
            // Item doesn't exist, add a new item
            setNewItem([
                ...newItem,
                {
                    item_id: 0,
                    item_name: ITEMNAME,
                    available: ITEMAVAILABLE,
                    in_use: 0,
                    missing_item: 0,
                    broken_item: 0,
                    total_count: ITEMAVAILABLE,
                    price_per_unit_myr: ITEMPRICE,
                    total_stock_price_myr: ITEMAVAILABLE * ITEMPRICE,
                    created_at: Date.now(),
                    updated_at: Date.now()
                }
            ]);
        }
        console.log(newItem);
    };
    

    const handleItemName = (e) =>{
        setItemName(e.target.value)
     
    }

    const handleItemQuantity = (e) =>{
       
        setItemAvailable(Number(e.target.value))
        
    }

    const handleItemPrice = (e) =>{
        
        setItemPrice(Number(e.target.value))
        console.log(newItem)
    }

    const removeNewItem = (index) => {
        const items = [...newItem];
        items.splice(index, 1);
        setNewItem(items);
    };

    const removeAllFromList = () => {
        setNewItem([]);
       
    };

    
    useEffect(()=>{

        console.log(inventories)
    },[])

    const [sortBy, setSortBy] = useState(query.get('sortBy') || 'created_at');
    const [sortOrder, setSortOrder] = useState(query.get('sortOrder') || 'asc');

    useEffect(()=>{
        dispatch(fetchAllInventory({ sortBy: sortBy, sortOrder: sortOrder }));


      


    },[dispatch, sortBy, sortOrder,])

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

    const handleSortChange = (e) =>{
        const newSortBy = e.target.value;
        updateQueryParams(newSortBy, sortOrder);
    }

    const handleOrderChange = (e) =>{
        const newSortOrder = e.target.value;
        updateQueryParams(sortBy,newSortOrder);
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

    const renderNewItemForm = ()=>{
        return (
            <div className="add-item-container">
       

                    <div className="form-container">
                             <label>Item Name:</label>
                                    <input onChange={handleItemName} />

                             <label>Quantity:</label>
                                    <input  onChange={handleItemQuantity} />

                             <label>Price per unit:</label>
                                    <input  onChange={handleItemPrice} />


                    <AddItemButton onClick={handleNewItems} text={"Add"} type={"normal"}></AddItemButton>
            </div>


            <div className={"new-item-container"}>
                
           
                            <div className="form-container">
                                     {newItem.map((item, index) => (
                                    <ul key={index}>
                                                    <li>
                                                        <p>{item.item_name}</p>
                                                        <p>{item.available}</p>
                                                        <p>{item.price_per_unit_myr}</p>
                                                        <AddItemButton onClick={() => removeNewItem(index)} text={"Remove"} type={"normal"} />
                                                    </li>
                                    </ul>
                                     ))}
                            </div>

       
       

       

            </div>

       

       <div className="Add-button-container">
            <AddItemButton text={"Cancel"} type={"cancel"} onClick={removeAllFromList}></AddItemButton>
            <AddItemButton text={"Submit"} type={"normal"}> </AddItemButton>
       </div>

   </div>
        )
    }


      
           
        
       
        

    

    const renderTableRows = () =>{
        return currentItems.map((item) =>(
            <tr key={item.ItemID}>
                {columns.map((column,index)=>(
                    <td key={index}>{item[column]}</td>
                ))}
            </tr>
        ))
    }

    const exportToCSV = () => {
        // Create CSV rows
        const csvRows = [];
    
        // Add headers
        const headers = columns.join(',');
        csvRows.push(headers);
    
        // Add data rows
        inventories.forEach(item => {
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
   <div className="page-container">


    

        

        <div className="stock-list-container">
        <BurgerBars onClick={handleHideSidebar}></BurgerBars>
        {revealSidebar ? <Sidebar/> : null}
        <label className="label-container"><h1>Add new Items</h1></label>
            {renderNewItemForm()}



            <label className="label-container"><h1>Search for an item</h1></label>
            <SearchBar></SearchBar>
        
    
        
            <div className="flexbox-container">

               
           
            <label className="label-container"><h1>Inventory</h1></label>

            <div className="table-nav-container">

                <div className="left-container">
                <CustomButton padding={"sort"} text={"sort"} sortBy={sortBy} onChange={handleSortChange}/>
                <CustomButton padding={"order"} text={"order"} sortOrder={sortOrder} onChange={handleOrderChange}/>
               
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
    )
}





export default StockList