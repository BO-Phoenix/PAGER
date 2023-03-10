import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/index.js';
import './firebase-config';
import RootNavigation from './navigation/Index.jsx';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}
