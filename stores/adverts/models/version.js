import {types} from "mobx-state-tree"

const Version = types
  .model("Version", {
    uid: types.identifier,
    locale: types.maybeNull(types.string),
    status: types.maybeNull(types.string)
  })
  .views(self => {
    return {
    };
  })
  .actions(self => {
    return {
    };
  })

export default Version;
