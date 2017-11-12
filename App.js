import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { green } from './utils/colors';
import { setLocalNotification } from './utils/notification';
import store from './store';
import MainNavigator from './MainNavigator';

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return(
      <Provider store={store}>
        <View style={{flex: 1}}>
          <View style={{ backgroundColor: green, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={green} barStyle="light-content" />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
