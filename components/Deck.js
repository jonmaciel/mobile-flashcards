import React from 'react';
import { connect } from 'react-redux'
import { Text, View , TextInput, TouchableOpacity, Platform } from 'react-native';
import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles';

class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => (
    { title: 'Deck' }
  )

  render() {
    const { navigation, decks } = this.props
    const { deckKey } = navigation.state.params;
    const { title, cards, alreadyPlayed, lastPercentage } = decks[deckKey];
    const cardLength = cards.length;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {cardLength <= 0 ? 'There is no card yet...' : `${cardLength} cards`}
          </Text>
          {alreadyPlayed && <Text style={styles.subtitle}>Last quiz percentage of correct: {lastPercentage}%</Text>}
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={() => navigation.navigate('NewCard', { deckKey })}
          >
            <Text style={styles.submitBtnText}>New Card</Text>
          </TouchableOpacity>
          {
            cardLength > 0 &&
            <TouchableOpacity
              style={Platform.OS === 'ios' ? styles.iosSubmitBtnWhite : styles.AndroidSubmitBtnWhite}
              onPress={() => navigation.navigate('QuizStep', { deckKey: deckKey, cardKey: 0, result: 0, cardLength })}
            >
              <Text style={styles.submitBtnTextBlack}>
                Start Quiz
              </Text>
              <FontAwesome style={styles.playIcon} name='play' size={25} />
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = (decks) => ({decks})

export default connect(
  mapStateToProps,
)(Deck)
