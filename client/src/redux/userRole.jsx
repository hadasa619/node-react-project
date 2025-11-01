import {createSlice} from "@reduxjs/toolkit"
const initVal={
    role:"User"
}
const roleSlice = createSlice({
    name:"role",
    initialState: initVal,
    reducers:{
    resetRole:(state, actions) => {
        state.role = "User"
    }
   }
})

export const {resetRole} = roleSlice.actions
export default roleSlice.reducer