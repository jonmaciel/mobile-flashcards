import { submitDecks } from '../utils/api';
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, ADD_RESULT } from '../actionTypes';

export const receiveDecks = decks => ({ type: RECEIVE_DECKS, decks })
export const addDeck = deck => ({ type: ADD_DECK, deck })
export const addCard = (deckKey, card) => ({ type: ADD_CARD, deckKey, card })
export const addResult = (deckKey, result) => ({ type: ADD_RESULT, deckKey, result })

export const createDeck = (deck) =>
  (dispatch, getState) => {
    dispatch(addDeck(deck));
    const decks = getState();
    submitDecks(decks);
    return decks.length - 1;
  }

export const createCard = (deckKey, card) =>
  (dispatch, getState) => {
    dispatch(addCard(deckKey, card));
    submitDecks(getState());
  }

export const saveResult = (deckKey, result) =>
  (dispatch, getState) => {
    dispatch(addResult(deckKey, result));
    submitDecks(getState());
  }
