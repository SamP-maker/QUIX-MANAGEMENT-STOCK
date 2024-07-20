import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchAllRequests = createAsyncThunk('requests/fetchAll', async ()=>{

   try{
    const response = await fetch('http://localhost/8080/getRequests',{
        method: 'GET',
        credentials: 'include',
        headers:{
            "Content-Type": "application/json"
        },
    });


    if (response.ok){
        return await response.json();
    }else{
        throw new Error ('Failed to fetch requests');
    }
   }catch(err){
        console.log("Error fetching requests", err);
   }
});


const initialState ={
   pendingRequests: [],
   requestHistory: [],
   status:'idle',
   error:null,
};

const requestsSlice = createSlice({
    name:"requests",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllRequests.pending, (state) =>{
            state.status = 'loading'
        })
        .addCase(fetchAllRequests.fulfilled, (state,action)=>{
            state.status='succeeded'
            const allRequests = action.payload;
            state.pendingRequests = allRequests.filter(request => request.status === 'pending')
            state.requestHistory = allRequests.filter(request => request.status === 'decline' || request.status === 'accept')
    })
    .addCase(fetchAllRequests.rejected, (state,action)=>{
        state.status = 'failed'
        state.error = action.error.message;
    })
}})



export default requestsSlice.reducer;