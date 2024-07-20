import {createAyncThunk, createSlice} from '@reduxjs/toolkit';



export const addNewItem = createAyncThunk('', async (newItem, {dispatch})=>{






    try{
        const response = await fetch('http://localhost/8080/addNewItem',{
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


export const fetchAllInventory = createAyncThunk('',async (_, {dispatch}) =>{



    try{
        const response = await fetch('http://localhost:8080/getInventory',{
            method:'GET',
            credentials:'include',
            headers:{
                "Content-Type": "application/json"

            },


        })



        if(response.ok){
            const result = response.json()
        }
    }catch(err){
        console.log("error", err);

    }
})



const initialState = {
    Inventory:{
                itemID: "",
                itemName:"",
                count: 0,
                missing_Items: 0,
                broken_Items: 0,
                total_count: 0,
    },
    newItem:{
        itemID: "",
        itemName:"",
        count:0,
        missing_Items: 0,
        broken_Items: 0,
        total_count: 0,

    },
    actionStatus:{
        status:'idle',
        error: null,
    }
}



const InventorySlice = createSlice({
    name:"Inventory",
    initialState,
    reducers:{


     
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllInventory.pending, (state,)=>{
            state.actionStatus = 'loading'
        })
        .addCase(fetchAllInventory.fullfilled, (state,action) =>{
            state.actionStatus = 'success'
            if(action.payload){
                const { itemID, itemName, Count, MissingItem, Broken_Item, Total_Count} = action.payload
                state.Inventory= {
                    itemID,
                    itemName,
                    Count,
                    MissingItem,
                    Broken_Item,
                    Total_Count
                }
            }else{
                state.Address ={
                    ...initialState.Inventory
                }
            }
        })
        .addCase(fetchAllInventory.rejected, (state,action)=>{
            state.actionStatus = 'failed';
            state.error = action.error.message;
        })
        .addCase(addNewItem.pending, (state)=>{
            state.actionStatus = 'loading';
        })
        .addCase(addNewItem.fullfilled, (state)=>{
            state.actionStatus = 'fullfilled';
        })
        .addCase(addNewItem.rejected, (state,action)=>{
            state.actionStatus = 'failed';
            state.actionStatus.error = action.error.message;
        })

    }
})





export default InventorySlice.reducer;