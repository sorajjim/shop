import { createSlice } from "@reduxjs/toolkit"

export const user = createSlice({
    name : 'user',
    initialState: {name : 'kim', age : 20},
    reducers : {
        changeName(state){
            state.name = 'Park'
        },
        increaseAge(state, action){
            state.age += action.payload
        }
    } 
    
})

export const {changeName, increaseAge} = user.actions
