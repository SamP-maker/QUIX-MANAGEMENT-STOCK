import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addNewRequests = createAsyncThunk('request/postNew', async (object) =>{
        try{
            const response = await fetch('http://localhost:8080/postNewRequest',{
                method:'POST',
                credentials:'include',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.parse(object),
            });


            if(response.ok){
                return await response.json()

                
            }else{
                throw new Error('Failed to post',response.status)
            }


            
        }catch(err){
            console.log("Error posting",err)
        }



})

export const updateRequests = createAsyncThunk('request/updateOnce', async (object)=>{

    try{

        const response = await fetch('http://localhost:8080/updateRequestItemList',{

            method:'PUT',
            credentials: 'include',
            headers:{
                "Content-Type": "application/json"
            },
            body:(object),
        })


        if(response.ok){
            return await response.json()
        }else{
            throw new Error('Failed to update status', response.status)
        }
    }catch(err){
        console.log(err)
    }
})

export const fetchAllRequests = createAsyncThunk('requests/fetchAll', async ({ sortBy = 'created_at', sortOrder = 'asc'})=>{


    const url = new URL('http://localhost:8080/getRequestItems')
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('sortOrder', sortOrder)


   try{
    const response = await fetch(url.toString(),{
        method: 'GET',
        credentials: 'include',
        headers:{
            "Content-Type": "application/json"
        },
    });


    if (response.ok){
    
        return await response.json();
    }else{
        throw new Error ('Failed to fetch requests',response.status);
    }
   }catch(err){
        console.log("Error fetching requests", err);
   }
});


const initialState ={
   pendingRequests: [],
   columns:[],
   requestHistory: [{
    request_id: 0,
    returner_id: 0,
    created_at: "",
    updated_at: "",
    return_status:"",
    request_status: "",
    work_order: "",
    team: "",
    department: "",
    items: []
   }],
   actionStatus:{
    status:'idle',
    error: null,
},
};

const requestsSlice = createSlice({
    name:"requests",
    initialState,
    reducers:{
        




    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllRequests.pending, (state) =>{
            state.actionStatus.status = 'loading'
        })
        .addCase(fetchAllRequests.fulfilled, (state,action)=>{ //Fetching request list from server, pending = pending, decline & accept = history
            state.actionStatus.status = 'succeeded';
            const allRequests = action.payload.request.map(request => ({
                request_id: request.request_id,
                returner_id: request.returner_id,
                created_at: request.created_at,
                updated_at: request.updated_at,
                return_status: request.return_status,
                request_status: request.request_status,
                work_order: request.work_order,
                team: request.team,
                department: request.department,
                items: request.items,
            }));
            state.pendingRequests = allRequests.filter(request => request.request_status === 'pending');
    
    // Filter requests with status 'approved' or 'declined'
             state.requestHistory = allRequests.filter(request => request.request_status === 'approved' || request.request_status === 'declined');

            
            state.columns = action.payload.columns;
    })
    .addCase(fetchAllRequests.rejected, (state,action)=>{
        state.status = 'failed'
        state.actionStatus.error = action.error.message;
    })
}})



export default requestsSlice.reducer;