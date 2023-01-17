import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer, REHYDRATE, PERSIST, REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pagerData from '../reducers/index.js';

const persistConfig = { key: 'root', storage };
const persistData = persistReducer(persistConfig, pagerData);

const store = configureStore({
  reducer: {
    pagerData: persistData,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST, REGISTER],
      },
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };