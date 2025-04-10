import { createSlice } from "@reduxjs/toolkit";
import data from "../data";

export const shoes = createSlice({
    name : 'shoes',
    initialState : {data : data},
    reducers : {
        setShoes(state, action){
            state.data = [...state.data, ...action.payload]
        }
    }
})

export const {setShoes} = shoes.actions