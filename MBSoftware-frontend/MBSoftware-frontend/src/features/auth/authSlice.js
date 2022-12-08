import { createSlice } from "@reduxjs/toolkit"

const data = localStorage.getItem('data')

const authSlice = createSlice({
    name: 'auth',
    initialState: data ? JSON.parse(data) : { email: null, token: null , isAgent : null , isAdmin : null },
    reducers: {
        setCredentials: (state, { payload }) => {
            state.email = payload.email
            state.token = payload.token
            state.isAgent = payload.isAgent
            state.isAdmin = payload.isAdmin
            localStorage.setItem('data', JSON.stringify(payload))
        },
        logOut: state => {
            state.email = null
            state.token = null
            state.isAgent = null
            state.isAdmin = null
            localStorage.clear()
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token