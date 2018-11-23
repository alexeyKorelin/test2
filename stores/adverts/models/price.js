import {types} from "mobx-state-tree"

const Price = types
  .model("Price", {
    coin: types.maybeNull(types.string),
    value: types.maybeNull(types.number)
  })
  .views(self => {
    return {
    };
  })
  .actions(self => {
    return {
    };
  })

export default Price;
