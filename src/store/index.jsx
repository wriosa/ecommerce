import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import productsEslice from './slices/products.eslice'

export default configureStore({
    reducer: {
        products: productsEslice,
        isLoading: isLoadingSlice
    }
})
