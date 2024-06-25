/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/config/redux/store';
import { TouchableOpacity, Text, View } from 'react-native';
import Home from './src/screens/home';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <Home/>
      {/* <TouchableOpacity style={{
        position: 'absolute', 
        bottom: 0, 
        right: 10,
        width: 60,
        height: 60, 
        borderRadius: 50,
        borderWidth: 1
      }}>
          <Text style={{
            margin: 'auto',
            fontSize: 25
          }}>+</Text>
      </TouchableOpacity> */}
    </Provider>
  );
}

export default App;
