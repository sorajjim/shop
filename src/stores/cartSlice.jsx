import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
    name :'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
      reducers : {
        increaseCount(state, action) {
            const stateIndex = state.findIndex(obj => obj.id == action.payload)
            state[stateIndex].count++
        },
        addCart(state, action) {
            const addState = {"id" : action.payload.id, "name" : action.payload.title, "count" : 1 } 
            const stateIndex = state.findIndex(obj => obj.id == action.payload.id)
            if(stateIndex != -1) {
                state[stateIndex].count += addState.count
            } else {
                state.push(addState)
            }
        }, 
        deleteCart(state, action) {
            const stateIndex = state.findIndex(obj => obj.id == action.payload)
            // console.log(stateIndex)
            state.splice(stateIndex, 1)
        }
      }
})

export const {increaseCount, addCart, deleteCart} = cart.actions