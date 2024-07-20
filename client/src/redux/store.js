import {configureStore} from '@reduxjs/toolkit'

const store = configure({
    


    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
    reducer:{

    }
})

export default store