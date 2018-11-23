import {types} from "mobx-state-tree"

const Status = types
  .model("Status", {
    slug: types.maybeNull(types.string),
    backgroundColor: types.maybeNull(types.string),
    color: types.maybeNull(types.string)
  })
  .views(self => {
    return {
    };
  })
  .actions(self => {
    return {
    };
  })

export default Status;
