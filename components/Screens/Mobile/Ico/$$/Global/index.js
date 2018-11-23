import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Container from '../Container';

@inject('locales')
@observer
class Global extends Component {
  _toggler = React.createRef();

  state = {
    isOpen: false
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render () {
    const {isOpen} = this.state;
    const {className, locales: {t}} = this.props;

    return (
      <Container className={cx(styles.root, className)}>
        <div ref={this._toggler} className={cx(styles.toggler, {[styles.toggler_active]: isOpen})} onClick={this.toggle}>
          <span className={styles.toggler__inner1} />
          <span className={styles.toggler__inner2} dangerouslySetInnerHTML={{__html: t(`ico.global.toggler`)}} />
          <div className={styles.more}>
            <div className={styles.more__inner1}>
              <div className={styles.more__inner2}>
                <div className={styles.content}>
                  <div className={styles.title} dangerouslySetInnerHTML={{__html: t(`ico.global.toggler`)}} />
                  <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.global.description`)}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }

  toggle = () => this.setState({isOpen: !this.state.isOpen});

  close = () => this.setState({isOpen: false});

  handleClickOutside = (e) => {
    if (!this._toggler.current.contains(e.target)) this.close();
  };
}

export default Global;
