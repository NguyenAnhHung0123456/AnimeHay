import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counterSlice'
import userReducer from './userSlice'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
})

const persistor = persistStore(store)

export {
    store, persistor
}