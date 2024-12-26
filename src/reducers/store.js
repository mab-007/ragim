import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./index";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: [], // or whitelist: ['nav'] to persist only nav slice
    errorHandling: (err) => {
      console.error('Persist error:', err);
    }
  };
  
  const persistedReducer = persistReducer(persistConfig, navReducer);
  

export const store = configureStore({
    reducer: {
        nav: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
})

export const persistor = persistStore(store);