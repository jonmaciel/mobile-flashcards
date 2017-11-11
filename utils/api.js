import { AsyncStorage } from 'react-native'
const DECK_STORAGE_KEY = 'mobile-flashcard:DECKS'

export const fetchDeck = () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(r => JSON.parse(r))
}

export const submitDecks = decks =>
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
