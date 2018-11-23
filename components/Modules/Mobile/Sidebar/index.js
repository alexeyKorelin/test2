import React, {Component} from 'react';
import styles from './index.sass';
import cx from 'classnames';
import Icon from 'components/Base/Icon';
import IconNew from 'components/Base/IconNew';
import AnimatedClose from 'components/Modules/AnimatedClose';
import Settings from 'config';

class Sidebar extends Component {
  componentDidMount() {
    const { isOpened, saveOverflow } = this.props;

    if (!saveOverflow) this.hideBodyOverflow(isOpened);
  }

  componentWillReceiveProps({isOpened, saveOverflow}) {
    if (!saveOverflow) this.hideBodyOverflow(isOpened);
  }

  render() {
    const {isOpened, children, from, className, onBack, saveOverflow, closeIcon, innerClass, closeClass, reverseCloseColor, purpled, reverseOpenColor} = this.props;

    return(
      <div style={{position: 'absolute'}}>
        <div className={cx(styles.root, className, {
          [styles.opened]: isOpened,
          [styles.root_purpled]: purpled,
          [styles.right]: from === 'right',
          [styles.left]: from === 'left'
        })} 
          style={this.props.style}
        >
          <div className={innerClass ? innerClass : styles.inner}>
            <If condition={onBack}>
              <button onClick={onBack} className={styles.back}>
                <IconNew i={'back'} size={20} />
              </button>
            </If>
            <Choose>
              <When condition={purpled}>
                <AnimatedClose 
                  className={styles.animatedClose} 
                  onClick={this.onClose} 
                  active={isOpened} 
                  reverse={reverseOpenColor}
                />
              </When>
              <Otherwise>
                <button onClick={this.onClose} className={cx(closeClass ? closeClass : styles.close, {[styles.close_reverse]: reverseCloseColor})}>
                  <IconNew i={'close'} size={20} />
                </button>
              </Otherwise>
            </Choose>
            <div className={styles.children}>
              {children}
            </div>
          </div>
        </div>
        <If condition={purpled}>
          <div className={cx(styles.purpleCircle, {[styles.purpleCircle_active]: isOpened})} />
        </If>
      </div>
    );
  }

  onClose = () => {
    const { onClose } = this.props;

    onClose();
    this.hideBodyOverflow(false);
  }

  hideBodyOverflow(isOpened) {
    if (window.document.body) window.document.body.style.overflow = isOpened ? 'hidden' : '';
  }
}

export default Sidebar;
