import { createSlice } from "@reduxjs/toolkit";
import { names } from "../../assets/formFields";

const formSlice = createSlice({
    name: 'form',
    initialState: names,
    reducers: {
        clearFields: (state, { payload }) => {
            payload.forEach(field => {
                state[field] = null
            })
        },
        setField: (state, {payload}) => {
            state[payload[0]] = payload[1]
        },
        setFields: (state, { payload }) => {
            payload.forEach(field => {
                state[field[0]] = field[1]
            })
        },
        removeFamilyMember: (state, { payload }) => {
            const { members } = state.FamilyDetails
            const newMembers = 
                members
                    .map((member, index) => {
                        if(index !== payload) return member
                        else return -1
                    })
                    .filter(member => member !== -1)
            state.FamilyDetails.members = newMembers
            state.FamilyDetails.number = state.FamilyDetails.members.length
        },
        addFamilyMember: (state, { payload }) => {
            console.log(payload)
            let { members } = state.FamilyDetails
            if(Array.isArray(payload)) members.push(...payload)
            else members.push(payload)
            state.FamilyDetails.number = members.length
        },
        resetFamilyMembers: (state) => {
            state.FamilyDetails.members = []
            state.FamilyDetails.number = 0
        },
        removeReference: (state, { payload }) => {
            const references = state.References
            const newReferences = 
                references
                    .map((member, index) => {
                        if(index !== payload) return member
                        else return -1
                    })
                    .filter(member => member !== -1)
            state.References = newReferences
        },
    }
})

export const { clearFields, setField, setFields, removeFamilyMember, addFamilyMember, resetFamilyMembers, removeReference } = formSlice.actions

export default formSlice.reducer
