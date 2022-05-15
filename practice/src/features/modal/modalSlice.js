import {createSlice} from "@reduxjs/toolkit"

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false
    },
    reducers: {
        openModal: (state, {payload}) => {
            state.isOpen = true;
        },
        closeModal: (state, {payload}) => {
            state.isOpen = false;
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions

export default modalSlice.reducer