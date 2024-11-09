import { createSlice } from "@reduxjs/toolkit";
import { fetchAllRequests } from "./RequestSlice";
import { fetchAllReturns } from "./ReturnSlice";


const initialState = {
    revealSidebar: false,
    ReturnCount: 0,
    RequestCount: 0,
};




const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
      openSidebar: (state) => {
          state.revealSidebar = !state.revealSidebar;
      },
      increaseReturnCount: (state, action) => {
          state.ReturnCount += action.payload;
      },
      reduceReturnCount: (state, action) => {
          state.ReturnCount -= action.payload;
      },
      increaseRequestCount: (state, action) => {
          state.RequestCount += action.payload;
      },
      reduceRequestCount: (state, action) => {
          state.RequestCount -= action.payload;
      },
  },
  extraReducers: (builder) => {
      builder
          .addCase(fetchAllReturns.fulfilled, (state, action) => {
        
              const pendingReturns = action.payload.request.filter(request => request.return_status === 'pending');
              state.ReturnCount = pendingReturns.length;
          })
          .addCase(fetchAllRequests.fulfilled, (state, action) => {
            

              const pendingRequests = action.payload.request.filter(request => request.request_status === 'pending');
              state.RequestCount = pendingRequests.length;
          });
  },
});

export const { openSidebar, increaseReturnCount, reduceReturnCount, increaseRequestCount, reduceRequestCount } = sideBarSlice.actions;
export default sideBarSlice.reducer;
