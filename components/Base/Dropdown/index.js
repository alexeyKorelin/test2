import React, {Component} from 'react'
import cx from 'classnames'
import styles from './index.sass'
import IconNew from 'components/Base/IconNew'
import Icon from 'components/Base/Icon'
import Toggle from 'components/Base/Toggle'

class Dropdown extends Component {
  _toggler = React.createRef()

  state = {
    opened: false
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const {className, children, icon, whiteIcon, oldIcon, caretDown, oldIconParams, label, color} = this.props;
    const {opened} = this.state;
    const iconComponent = (oldIcon) ? <Icon icon={icon} {...oldIconParams} /> : <IconNew i={icon} size={14} />;
    const empty = !children || (Array.isArray(children) && children.find(children => children !== null && children !== false) === undefined);

    return (
      <div 
        className={cx(
          styles.root, 
          className,
          {
            [styles.root_whiteIcon]: whiteIcon,
            [styles.root_opened]: opened,
            [styles.root_caretDown]: !empty && (icon === 'gear' || caretDown),
            [styles[`root_${color}`]]: color
          }
        )}
      >
        <button 
          ref={this._toggler}
          className={styles.toggler}
          disabled={empty}
          onClick={this.toggle}
        >
          <If condition={label}>
            <span className={styles.label}>{ label }</span>
          </If>
          { iconComponent }
        </button>
        <If condition={!empty}>
          <Toggle>
            <If condition={opened}>
              <div className={styles.dropdown}>
                { children }
              </div>
            </If>
          </Toggle>
        </If>
      </div>
    )
  }

  toggle = () => this.setState({opened: !this.state.opened})

  handleClickOutside = (e) => {
    const { opened } = this.state;
    const toggler = this._toggler.current;

    (!this._toggler.current.contains(e.target) && opened) && this.setState({opened: false})
  }
}

Dropdown.displayName = 'components/Base/Dropdown'

export default Dropdown
