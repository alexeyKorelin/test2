import {types} from "mobx-state-tree"
import Advert from '../../adverts/models'

const Card = types
  .model("Card", {
    title: types.maybeNull(types.string),
    avatar: types.maybeNull(types.string),
    advert: types.maybeNull(Advert),
    description: types.maybeNull(types.string),
    price: types.maybeNull(types.number),
  })
  .views(self => {
    return {

    };
  })

export default Card
