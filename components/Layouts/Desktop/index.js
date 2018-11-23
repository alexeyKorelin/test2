import {Component} from 'react';
import AppWrapper from 'components/Layouts/AppWrapper';
import Header from 'components/Modules/Header';
import Footer from 'components/Modules/Footer';
import styles from './index.sass'

class Application extends Component {
  static displayName = 'Layouts/Application';

  render () {
    return (
      <AppWrapper className={styles.root} {...this.props}>
        {this.props.landing ? (
          this.props.children
        ) : (
          <div>
            <Header/>
            <div className={styles.container}>
              {this.props.children}
            </div>
            <Footer/>
          </div>
        )}
      </AppWrapper>
    );
  }
}

export default Application;
