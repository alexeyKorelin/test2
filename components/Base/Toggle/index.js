import CSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './index.sass';

const Toggle = ({children, noLeave}) =>
  <CSSTransitionGroup
    component={'div'}
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
    transitionLeave={!noLeave}
    transitionName={{
      enter: styles.enter,
      enterActive: styles.enterActive,
      leave: styles.leave,
      leaveActive: styles.leaveActive
    }}
  >{children}</CSSTransitionGroup>

export default Toggle;