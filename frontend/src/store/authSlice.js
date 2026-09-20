import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: "unauthenticated",
    accountType: null, 
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        login: (state, action) => {
            state.status = "authenticated";
            state.accountType = action.payload.accountType;
            state.userData = action.payload.userData
        },

        logout: (state) => {
            state.status = "unauthenticated";
            state.accountType = null;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer