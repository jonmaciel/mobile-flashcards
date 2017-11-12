import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View , TextInput, TouchableOpacity, Platform } from 'react-native';
import { createDeck } from '../actions'
import { green, white } from '../utils/colors';
import styles from '../styles';

class NewDeck extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      title: 'New Deck'
    }
  )

  state = {
    title: ''
  }

  handleSubmit = () => {
    const { title } = this.state;
    if(!title) return;

    const newCrdKey = this.props.submit({ title })
    this.props.navigation.navigate('Deck', { deckKey: newCrdKey })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            value={this.state.title}
            onChangeText={(title) => this.setState({title})}
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
  submit: (deck) => dispatch(createDeck(deck))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
