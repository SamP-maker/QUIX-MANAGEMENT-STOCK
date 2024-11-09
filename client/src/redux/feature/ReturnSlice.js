import {createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const duplicateItemsBasedOnCount = (items) =>{
    const duplicatedItems = [];
    items.forEach(item => {
        for( let i = 0; i < item.item_quantity; i ++){
            duplicatedItems.push({...items, id: Math.random()})
        }
    });
    return duplicatedItems;
}


export const updateReturnStatus = createAsyncThunk('returns/updateAll', async (object)=>{
    try{
        const response = await fetch('http://localhost:8080/updateReturnStatus',{
            method:'PUT',
            credentials:'include',
            headers:{
                "Content-Type": "application/json"
            },
            body:(object)
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




export const fetchAllReturns = createAsyncThunk('returns/fetchAll', async ({ sortBy = 'created_at', sortOrder = 'asc'})=>{

    

    const url = new URL('http://localhost:8080/getReturnItemList')
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

const initialState = {
    pendingReturns:[],
    itemSpreadList:[],
    columns:[],
    returnHistory:[{
        request_id: 0,
        returner_id: 0,
        created_at: "",
        updated_at: "",
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



const returnSlice = createSlice({
    name:"returns",
    initialState,
    reducers:{

          

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllReturns.pending, (state) =>{
            state.actionStatus.status = 'loading';
        })
        .addCase(fetchAllReturns.fulfilled, (state,action)=>{ //Fecth all requests
            state.actionStatus.status = 'succeeded'
            console.log(action.payload.request)
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
            state.pendingReturns = allRequests.filter(request => request.return_status === 'pending');
    
    // Filter requests with status 'approved' or 'declined'
             state.returnHistory = allRequests.filter(request => request.return_status === 'approved' || request.return_status === 'declined');
            state.columns = action.payload.columns;
        })
        .addCase(fetchAllReturns.rejected, (state,action)=>{
            state.actionStatus.status = 'failed'
            state.error = action.error.message;
        })
        .addCase(updateReturnStatus.pending, (state) =>{
            state.actionStatus.status = 'loading';
        })
        .addCase(updateReturnStatus.fulfilled, (state,action)=>{ //updating return statuses
            state.actionStatus.status = 'succeeded'
            const { request_id, returner_id, return_status, request_status, work_order, team, department, items } = action.payload;
            const request = state.requestList.find(req => req.request_id === request_id);
            if(request){
                request.items = items;
                request.updated_at = new Date();
                request.return_status = items.every(item => item.status !== 'inUse') ? 'closed' : 'pending';
                state.itemSpread = duplicateItemsBasedOnCount(items)

                
                
            }
           

        })
        .addCase(updateReturnStatus.rejected, (state,action)=>{
            state.actionStatus.status = 'failed'
            state.error = action.error.message;
    
        })
    }
})

export default returnSlice.reducer;