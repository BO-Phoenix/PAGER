import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index.js';
import './firebase-config';
import RootNavigation from './navigation/Index.jsx';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
