import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, ADD_RESULT } from '../actionTypes';

const decks = (state = [], action) => {
  const {deckKey, deck, card, result, percentage} = action;
  switch (action.type) {
    case RECEIVE_DECKS: {
      return [
        ...state,
        ...action.decks
      ]
    }

    case ADD_DECK: {
      return [
        ...state,
        {
          ...action.deck,
          cards: [],
          lastPercentage: 0,
          alreadyPlayed: false,
        }
      ]
    }

    case ADD_CARD: {
      let decks = [...state];
      decks[deckKey].cards.push(card);
      return decks;
    }

    case ADD_RESULT: {
      let decks = [...state];
      const currentlyDeck = decks[deckKey]

      currentlyDeck.lastPercentage = result * 100 / currentlyDeck.cards.length;
      currentlyDeck.alreadyPlayed = true;
      return decks;
    }

    default: {
      return state;
    }
  }
}

export default decks;
