import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'
import formReducer from '../features/form/formSlice'
import fieldsReducer from '../features/form/fieldsSlice'
import sectionReducer from '../features/form/sectionSlice'
import firebaseReducer from '../features/form/firebaseSlice'
import { setupListeners } from "@reduxjs/toolkit/dist/query"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        form: formReducer,
        fields: fieldsReducer,
        section: sectionReducer,
        firebase: firebaseReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})