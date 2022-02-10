import React from 'react';
import AppNavigator from './src/AppNavigator';


/** Redux pusposed */
import configure from './src/store/configure';
import { Provider } from 'react-redux';

const store = configure();

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
