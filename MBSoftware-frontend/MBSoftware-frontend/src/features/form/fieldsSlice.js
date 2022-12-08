import { createSlice } from "@reduxjs/toolkit";
import { fields } from "../../assets/formFields";

const fieldsSlice = createSlice({
    name: 'fields',
    initialState: fields,
    reducers: {
        setError: (state, { payload }) => {
            const { name, error } = payload;
            state[name].error = error;
        }
    }
})

export const { setError } = fieldsSlice.actions;

export default fieldsSlice.reducer