import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Deck from './components/Deck'
import { Text, View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { green, white } from './utils/colors';
import store from './store';
import DeckListView from './components/DeckListView';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import QuizStep from './components/QuizStep';
import QuizResult from './components/QuizResult';

export default class App extends React.Component {
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

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckListView,
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    }
  },
  QuizStep: {
    screen: QuizStep,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    }
  },
  QuizResult: {
    screen: QuizResult,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
      }
    }
  },
})
