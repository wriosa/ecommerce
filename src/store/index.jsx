import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import productsEslice from './slices/products.eslice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        products: productsEslice,
        isLoading: isLoadingSlice,
        purchases: purchasesSlice
    }
})
