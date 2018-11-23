import {types} from "mobx-state-tree"

const Image = types
  .model("Image", {
    id: types.maybeNull(types.number),
    url: types.maybeNull(types.string),
    thumb: types.maybeNull(types.string),
    mid: types.maybeNull(types.string)
  })
  .views(self => {
    return {
    };
  })
  .actions(self => {
    return {
    };
  })

export default Image;
