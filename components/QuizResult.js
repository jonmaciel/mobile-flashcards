import React from 'react';
import { connect } from 'react-redux'
import { Text, View , TextInput, TouchableOpacity, Platform } from 'react-native';
import { AppLoading } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles';

class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => (
    { title:'Quiz Result' }
  )

  state = {
    ready: false,
  }

  render() {
    const { navigation, decks } = this.props
    const { deckKey } = navigation.state.params;
    const { title, cards, lastResult, alreadyPlayed, lastPercentage } = decks[deckKey];
    const cardLength = cards.length;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Your currently Score</Text>
          <Text style={styles.subtitle}>{lastPercentage}%</Text>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={() => navigation.navigate('Deck', { deckKey: deckKey })}
          >
            <Text style={styles.submitBtnText}>New Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtnWhite : styles.AndroidSubmitBtnWhite}
            onPress={() => navigation.navigate('QuizStep', { deckKey: deckKey, cardKey: 0, result: 0, cardLength })}
          >
            <Text style={styles.submitBtnTextBlack}>
              Restart Quiz
            </Text>
            <MaterialCommunityIcons style={styles.playIcon} name='restart' size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (decks) => ({decks})

export default connect(
  mapStateToProps,
)(Deck)
