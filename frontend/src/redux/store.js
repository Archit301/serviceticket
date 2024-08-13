
// import { useReducer } from "./user/userReducer";
// import { createStore,combineReducers,applyMiddleware } from "redux";
// import { thunk } from "redux-thunk";



// const rootReducer=combineReducers({
//     user:useReducer,
//     tickets:ticketReducer
// })


// const store=createStore(rootReducer,applyMiddleware(thunk))
// export default store;

import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { persistReducer,persistStore } from "redux-persist";
import userReducer from "./user/userSlice"
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
