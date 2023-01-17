import { configureStore } from '@reduxjs/toolkit';
import pagerData from '../reducers/index.js';

const store = configureStore({
  reducer: {
    pagerData,
  },
});

export default store;