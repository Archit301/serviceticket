import { createSlice } from "@reduxjs/toolkit";

const initialState={
  currentUser:null,
    error:null,
    loading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        siginInStart:(state)=>{
            state.loading=true;
        },
        siginInSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.loading=false
            state.error=null
        },
        signinFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        updateUserStart: (state) => {
            state.loading = true;
          },
          updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          signOutUserStart: (state) => {
            state.loading = true;
          },
          signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
          },
          signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },   

    }
})



export const {siginInStart,siginInSuccess,signinFailure,updateUserFailure,updateUserStart,updateUserSuccess,signOutUserFailure,signOutUserSuccess,signOutUserStart}=userSlice.actions

export default userSlice.reducer