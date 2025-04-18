import { configureStore } from '@reduxjs/toolkit'
import { user } from './stores/userSlice'
import { cart } from './stores/cartSlice'
import { shoes } from './stores/shoesSlice'
import { studyCart } from './stores/studyCartSlice'

export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer,
    shoes : shoes.reducer,
    studyCart : studyCart.reducer
   }
}) 