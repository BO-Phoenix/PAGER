import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pagerData from '../reducers/index.js';

const persistConfig = { key: 'root', storage };
const persistData = persistReducer(persistConfig, pagerData);

const store = configureStore({
  reducer: {
    pagerData: persistData,
  },
});

const persistor = persistStore(store);

export { store, persistor };