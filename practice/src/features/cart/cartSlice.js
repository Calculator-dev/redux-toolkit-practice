import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}
 
const url = "https://course-api.com/react-useReducer-cart-project"
export const getCartItems = createAsyncThunk("cart/getCartItems", async (thunkAPI) => {
    try {
        const response = await axios(url)
        return response.data
    } catch (error) {
        return thunkAPI.rejectedWithValue("something went wrong")
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, {payload}) => {
            const itemId = payload
            state.cartItems = state.cartItems.find((item) => item.id !== itemId)
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.price * item.amount
            })
            state.amount = amount
            state.total = total
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.cartItems = payload;
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = true;
        }
    }
})

export const {clearCart, removeItem, increase, decrease, calculateTotal} = cartSlice.actions

export default cartSlice.reducer