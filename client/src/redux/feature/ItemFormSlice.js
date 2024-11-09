import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INCREASE_COUNT,DECREASE_COUNT} from "../actions/actions";


export const ItemSearch = createAsyncThunk('ItemSearch/searchAll', async () =>{
  try{
    const response = await fetch('http://localhost:8080/updateReturnStatus',{
      method:'PUT',
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

  }
)

export const AddNewRequest = createAsyncThunk('AddNewRequest/addRequest', async ({NewRequest,dispatch}) =>{
  console.log(JSON.stringify(NewRequest))
  try{
    const response = await fetch('http://localhost:8080/postRequestItems',{
      method:'POST',
      credentials:'include',
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(NewRequest)
      

    })


    if (response.ok) {
      const data = await response.json();
      console.log('Response Data:', data); // Log the response data
      return data;
    } else {
      const errorText = await response.text(); // Get the error text
      console.error('Response Error:', errorText); // Log the error text
      throw new Error('Failed to post request');
    }
  } catch (err) {
    console.error('Fetch Error:', err.message); // Log any fetch errors
    throw err;
  }
})



const initialState = {
  

        request_id: null,
        returner_id: null,
        created_at: null,
        updated_at: null,
        expire_at:null,
        return_status: "",
        request_status: "",
        work_order: "",
        team:"",
        department:"",
        item: [


        ]

    
};


const itemFormSlice = createSlice({
    name: 'itemForm',
    initialState,
    reducers: {

      //Increase count of form items
      increaseCount: (state, action) => {
        const itemId = action.payload;
        
        const index = state.item.findIndex(item => item.item_id === itemId.item_id);
        console.log(index);
        if (index !== -1) {
          state.item[index].item_quantity += 1;
        }
        
   
        
      },
  
      // Decrease the count of form items
      decreaseCount: (state, action) => {
        const itemId = action.payload;
      
        const index = state.item.findIndex(item => item.item_id === itemId.item_id);
        if (index !== -1) {
          const newCount = state.item[index].item_quantity - 1;
          if (newCount <= 0) {
            state.item = state.item.filter(item => item.item_id !== itemId.item_id);
          } else {
            state.item[index].item_quantity = newCount;
          }
        }
        
      },

      //Adding NEW Items into LIST 
      addNewItems: (state, action) => {
        const { item_id, item_name } = action.payload;
  
        // Check if the item already exists and update if so
        const existingItemIndex = state.item.findIndex(item => item.item_id === item_id);
        if (existingItemIndex !== -1) {
          // Increment the item_quantity if the item already exists
          state.item[existingItemIndex].item_quantity += 1;
          state.item[existingItemIndex].updated_at = new Date().toISOString();
        } else {
          // Add the new item with an initial item_quantity of 1
          state.item.push({
            id: state.item.length ? state.item[state.item.length - 1].id + 1 : 1,
            item_id: item_id,
            item_name: item_name,
            item_quantity: 1, // Initialize item_quantity to 1
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            request_id: null,
            return_id: null,
          });
        }
  
        console.log(state.item);
      },addNewRequest: (state,action)=>{
      const { request_id, returner_id, return_status, request_status, work_order, team, department, items } = action.payload;
      const currentDate = new Date(); // Current date and time
      const dateWith10DaysAdded = new Date(currentDate); // Create a copy of the current date
      dateWith10DaysAdded.setDate(currentDate.getDate() + 10); // Add 10 days
      const isoString = dateWith10DaysAdded.toISOString(); // Convert to ISO string
      
      state.request_id = request_id;
      state.returner_id = returner_id;
      state.created_at = new Date().toISOString(); // Set created_at to current date
      state.updated_at = new Date().toISOString(); // Set updated_at to current date
      state.expire_at =  isoString;
      state.return_status = return_status;
      state.request_status = request_status;
      state.work_order = work_order;
      state.team = team;
      state.department = department;
      state.item = items.map(item => ({
        ...item,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        request_id: request_id,
        return_id: null,
      }));
        
      
        
    }
    
    }
    }
  );


export const { increaseCount, decreaseCount, addNewItems,addNewRequest} = itemFormSlice.actions;
export default itemFormSlice.reducer;
