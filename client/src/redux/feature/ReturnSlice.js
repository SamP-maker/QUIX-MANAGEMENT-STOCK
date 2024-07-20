import {createAsyncThunk, createSlice } from "@reduxjs/toolkit"



export const fetchAllReturns = createAsyncThunk("returns/fetchAll", async ()=>{
    try{
        const response = await fetch('http://localhost/8080/getReturns',{
            method:'GET',
            credentials:'include',
            headers:{
                "Content-Type": "application/json"
            },
        })




        if(response.ok){
            return await response.json();
        }else{
            throw new Error('Failed to fetch requests');
        }
    }catch(err){
        console.log("Error fetching returns", err)
    }
})


const initialState = {
    pendingReturns:[],
    returnHistory:[],
    status:'idle',
    error: null,
};



const returnSlice = createSlice({
    name:"returns",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllReturns.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchAllReturns.fulfilled, (state,action)=>{
            state.status = 'succeeded'
            const allReturns = action.payload;
            state.pendingReturns = allReturns.filter(returns => returns.status === 'pending')
            state.returnHistory = allReturns.filter(returns => returns.status === 'decline' || returns.status === 'accept')

        })
        .addCase(fetchAllReturns.rejected, (state,action)=>{
            state.status = 'failed'
            state.error = action.error.message;
        })
    }
})

export default returnSlice.reducer;