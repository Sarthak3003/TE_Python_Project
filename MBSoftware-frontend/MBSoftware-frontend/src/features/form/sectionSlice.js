import { createSlice } from "@reduxjs/toolkit";
import { sections } from "../../assets/formFields";

const sectionSlice = createSlice({
    name: 'section',
    initialState: sections,
    reducers: {
        getSection: (state, { payload }) => {
            return state[payload]
        },
    }
})

export const { getSection } = sectionSlice.actions

export default sectionSlice.reducer