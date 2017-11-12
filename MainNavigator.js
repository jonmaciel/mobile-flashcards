import { StackNavigator } from 'react-navigation';
import { green, white } from './utils/colors';
import DeckListView from './components/DeckListView';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import QuizStep from './components/QuizStep';
import QuizResult from './components/QuizResult';
import Deck from './components/Deck'

export default StackNavigator({
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