import {types} from "mobx-state-tree";
import Card from './models';
import API from 'utils/api';

const CardsStore = types
  .model("CardsStore", {
    cards: types.maybeNull(types.array(Card))
  }).actions(self => {
    return {
      fetch () {
        API.cards.index()
          .then(cards => {
            self.fetchSuccess(cards)
          })
      },
      fetchSuccess (cards) {
        self.cards = cards;
      }
    }
  });

export default CardsStore;
