import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import {combineReducers} from "redux"
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage" 


const rootReducer = combineReducers({
   user: userReducer
})

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"]
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
       getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"]
            }
        })
})

export const persistor = persistStore(store)
export default store