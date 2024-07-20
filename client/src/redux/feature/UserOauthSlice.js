import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';




export const UserOauth = createAsyncThunk("returns/fetchAll", async () =>{
    try{
        const response = await fetch('http://localhost/8080/getUsers',{
            method:'GET',
            credentials:'include',
            headers:{
                "Content-Type": "application/json"
            },
        })


        if(response.ok){
            return await response.json()
        }else{
            throw new Error('Failed to fetch requests');
        }
    }catch(err){
        console.log("Error fetching returns", err)
    }
})


const initialState ={
    username:'',
    LoggedIn:false,
    CookieStatus:'',
}



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(UserOauth.fullfiled, (state,action)=>{
            state.LoggedIn = true;
            state.username = action.payload.username;
                state.CookieStatus = Cookies.get('CookieStatus') || '';

        })
        
    }
})


export default userSlice.reducer;