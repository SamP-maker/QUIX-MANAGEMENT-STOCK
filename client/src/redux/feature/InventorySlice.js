import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import { json } from 'react-router-dom';




export const addNewItem = createAsyncThunk('inventory/addNewItems', async (newItem, {dispatch})=>{






    try{
        const response = await fetch('http://localhost:8080/addNewItem',{
            method:'POST',
            credentials:'include',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newItem)
        });


        if(response.ok){
            dispatch(fetchAllInventory())
        }else{
            throw new Error('Failed to add new Item');
        }
    }catch (err){
        console.log("Error adding new item:", err)
    }
})


export const fetchAllInventory = createAsyncThunk('Inventory/fetchAllInventory',async ({ sortBy = 'created_at', sortOrder = 'asc'}, {dispatch}) =>{
        



    const url = new URL('http://localhost:8080/getInventory')
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('sortOrder', sortOrder)



            try{
               const response = await fetch(url.toString(),{
                    method: 'GET',
                    credentials:'include',
                    headers:{
                        "Content-Type": "application/json"
                    },
                });

                if(response.ok){
                
                    return await response.json();
                    
                }else{
                    throw new Error('Failed to fetch inventory');
                }

                
            } catch(err){
                console.log("Error fetching inventory:", err);
            }


})



const initialState = {
    columns:[],
    inventories: [],
    newInventories:[
            {
                item_id:0,
                item_name: "",
                available: 0,
                in_use:0,
                missing_item:0,
                broken_item:0,
                total_count:0,
                price_per_unit_myr:0,
                total_stock_price_myr:0,
                created_at: Date.now(),
                updated_at: Date.now()
            }
        
    ],
    actionStatus:{
        status:'idle',
        error: null,
    }
}



const InventorySlice = createSlice({
    name:"Inventory",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllInventory.pending, (state)=>{
            state.actionStatus.status = 'loading'
        })
        .addCase(fetchAllInventory.fulfilled, (state,action) =>{
            (console.log(action.payload))
            state.actionStatus.status = 'success';
                state.columns = action.payload.columns;
                state.inventories = action.payload.inventories;
               
           
        })
        .addCase(fetchAllInventory.rejected, (state,action)=>{
            state.actionStatus.status = 'failed';
           
        })
        .addCase(addNewItem.pending, (state)=>{
            state.actionStatus.status = 'loading';
        })
        .addCase(addNewItem.fulfilled, (state,action)=>{
            state.actionStatus.status = 'success';
           
            
        })
        .addCase(addNewItem.rejected, (state,action)=>{
            state.actionStatus.status = 'failed';
           
        })

    }
})





export default InventorySlice.reducer;