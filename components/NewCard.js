import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View , TextInput, TouchableOpacity, Platform } from 'react-native';
import { createCard } from '../actions'
import { green, white } from '../utils/colors';
import styles from '../styles';

class NewDeck extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      title: 'New Card'
    }
  )

  state = {
    answer: '',
    question: ''
  }

  handleSubmit = () => {
    const { answer, question } = this.state;
    if(!answer || !question) return;

    const { navigation } = this.props;
    this.props.submit(navigation.state.params.deckKey, { answer, question });
    this.props.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Question:</Text>
          <TextInput
            style={styles.input}
            value={this.state.title}
            onChangeText={(answer) => this.setState({answer})}
          />
          <Text style={styles.title}>Answer:</Text>
          <TextInput
            style={styles.input}
            value={this.state.title}
            onChangeText={(question) => this.setState({question})}
          />
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={this.handleSubmit}
          >
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (decks) => ({})

const mapDispatchToProps = (dispatch, { navigation }) => ({
  submit: (deckKey, deck) => dispatch(createCard(deckKey, deck)),
  goBack: () => navigation.goBack(),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
