import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { AuthSlice, CartSlice, ProductSlice, UserSlice } from './slice';

const persistConfig = {
   key: "root",
   storage,
 };

 const rootReducer = combineReducers({
   
      Authentication: persistReducer(persistConfig, AuthSlice),
    User:UserSlice,
    product:ProductSlice,
    cart:CartSlice
   
  })

  const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: false,
     }),
 });
 
 const persistedStore = persistStore(store);
 
 export { store, persistedStore };