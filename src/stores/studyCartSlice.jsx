import { createSlice } from "@reduxjs/toolkit";

export const studyCart = createSlice({
    name: 'studyCart',
    initialState: {
        cartItem: []
    },
    reducers: {
        setCartItem(state, action) {
            const exists = state.cartItem.find(item => item.id === action.payload.id);
            if (!exists) {
                state.cartItem.push(action.payload);
            }
        },
        increaseQuantity(state, action) {
            const item = state.cartItem.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            }
        }
    }
});

export const { setCartItem, increaseQuantity } = studyCart.actions;
