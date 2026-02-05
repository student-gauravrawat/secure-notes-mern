import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null
    },
    reducers: {
       setAuthUser: ( state, action)=>{
          state.authUser = action.payload
       },
        clearAuthUser: (state, action)=>{
           state.authUser = null
        }
    }
})

export const {setAuthUser, clearAuthUser} = userSlice.actions 
export default userSlice.reducer;