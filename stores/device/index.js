import {types} from "mobx-state-tree";
import MobileDetect from 'mobile-detect'

const getSize = (mobile, tablet) => {
  if (mobile && !tablet) return 'mobile'
  if (mobile && tablet) return 'tablet'
  if (!mobile && !tablet) return 'desktop'
}

const DeviceStore = types
  .model('DeviceStore', {
    agent: types.maybeNull(types.string),
    size: types.maybeNull(types.string),
  })
  .preProcessSnapshot(snapshot => {
    if (snapshot) {
      const md = new MobileDetect(snapshot.agent)
      const newSnapshot = {
        ...snapshot,
        size: getSize(!!md.mobile(), !!md.tablet()),
      }
      return newSnapshot
    }
  })
  .views(self => ({
    get isMobileDevice() {
      return self.size === 'mobile' || self.size === 'tablet'
    },
    get isMobile() {
      return self.size === 'mobile'
    },
    get isTablet() {
      return self.size === 'tablet'
    }
  }))

export default DeviceStore
