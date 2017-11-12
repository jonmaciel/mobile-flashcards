import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import styles from '../styles';
import { saveResult } from '../actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { clearLocalNotification } from '../utils/notification';

class QuizStep extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { cardKey, cardLength } = navigation.state.params;
    return { title: `${cardKey + 1}/${cardLength}`}
  }

  state = {
    isCardFront: true
  }

  goToNextCard = (isCorrect) => {
    const { navigation, cardLength } = this.props;
    const { deckKey, cardKey, result } = navigation.state.params;
    const nextCardKey = cardKey + 1;
    const newResult = isCorrect ? result + 1 : result;

    this.props.saveResult(deckKey, newResult);
    if(nextCardKey >=  cardLength) {
      clearLocalNotification();
      navigation.navigate('QuizResult', { deckKey, title: this.props.deck.title});
    } else {
      navigation.navigate('QuizStep', { deckKey: deckKey, cardKey: cardKey + 1, result: newResult, cardLength });
    }
  }

  render() {
    const { currentlyCard, nextCard, navigation } = this.props;
    const { isCardFront } = this.state;
    const { answer, question } = currentlyCard;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.cardBody}>
            {
              isCardFront ?
              <Text style={styles.title}>{answer}</Text> :
              <Text style={styles.title}>{question}</Text>
            }
          </View>

          <TouchableOpacity
            style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 50 }}
            onPress={() => this.setState({isCardFront: !isCardFront})}
          >
            <Text style={styles.submitBtnTextBlack}>Flip the card to {isCardFront ?'back' : 'front'}</Text>
            <MaterialCommunityIcons
              name={ isCardFront ?'flip-to-back' : 'flip-to-front' }
              style={styles.submitBtnTextBlack}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={() => this.goToNextCard(true)}
          >
            <Text style={styles.submitBtnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtnRed : styles.AndroidSubmitBtnRed}
            onPress={() => this.goToNextCard(false)}
          >
            <Text style={styles.submitBtnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const { deckKey, cardKey } = navigation.state.params;
  const deck = decks[deckKey];

  return {
    deck,
    lastResult: deck.lastResult,
    currentlyCard: deck.cards[cardKey],
    cardLength: deck.cards.length,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  saveResult: (deckKey, result) => dispatch(saveResult(deckKey, result)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizStep);
