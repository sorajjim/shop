import { createSlice } from "@reduxjs/toolkit";

export const studyCart = createSlice({
    name : 'studyCart',
    initialState : {
        cartItem: []
    },
    reducer : {
        setCartItem(state, action){
            state.cartItem = [...state.data, ...action.payload]
        },
        increaseQuantity(state, action) {
            
        }
    }
})

export const {setCartItem} = studyCart.actions