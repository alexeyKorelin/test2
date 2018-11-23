import React, {Component} from 'react';
import AppWrapper from 'components/Layouts/AppWrapper';
import Header from 'components/Modules/Mobile/Header';
import Container from 'components/Modules/Mobile/Container';
import Footer from 'components/Modules/Mobile/Footer';
import styles from './index.sass';

class Mobile extends Component {
  static displayName = 'Layouts/Mobile/Application';

  render () {
    return (
      <AppWrapper className={styles.root} {...this.props} mobile>
        {this.props.landing ? (
          this.props.children
        ) : (
          <div>
            <Header/>
            <Container>
              {this.props.children}
            </Container>
            <Footer/>
          </div>
        )}
      </AppWrapper>
    );
  }
}

export default Mobile;
