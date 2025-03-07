/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import RootNavigation from './src/routes/RootNavigation';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './src/utils/redux/index';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigation />
        <Toast />
      </Provider>
    </>
  );
}

export default App;
