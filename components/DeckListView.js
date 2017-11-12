import React from 'react';
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, Platform, ScrollView } from 'react-native'
import { fetchDeck } from '../utils/api';
import { receiveDecks } from '../actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { green, white } from '../utils/colors';
import styles from '../styles';

class DeckListView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      title: 'Decks'
    }
  )

  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props

    fetchDeck()
      .then((decks) => { decks && dispatch(receiveDecks(decks)) })
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        { decks.length ?
          <ScrollView style={styles.scrollView}>
            {decks.map(({title, cards}, deckKey) =>
              <TouchableOpacity
                key={deckKey}
                onPress={() => this.props.navigation.navigate('Deck', { deckKey })}
                style={styles.itemScrollView}
              >
                <Text style={styles.textItemScrollView}>{`${title} - ${cards.length} cards`}</Text>
             </TouchableOpacity>
          )}
          </ScrollView> :
          <View style={styles.center}>
          <MaterialCommunityIcons
            name="cards-outline"
            size={60}
          />
            <Text>No one deck yet.</Text>
          </View>
        }
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={() => this.props.navigation.navigate('NewDeck')}
        >
          <Text style={styles.submitBtnText}>New Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (decks) => ({ decks })

export default connect(
  mapStateToProps,
)(DeckListView)
