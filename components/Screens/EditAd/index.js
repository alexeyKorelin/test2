import React, {Component} from 'react';
import styles from './index.sass';
import AdForm from 'components/Modules/AdForm';
import {Container} from 'components/Base/Grid';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';

@inject('advertForm')
@inject('device')
@observer
class EditAd extends Component {

  render () {
    const {advertForm: {advert}, device: { isMobileDevice }} = this.props;
    if (!advert || !advert.fields) return null;

    return (
      <Choose>
        <When condition={isMobileDevice}>
          <div className={styles.root}>
            <AdForm advert={advert} />
          </div>
        </When>
        <Otherwise>
          <Container className={cx(styles.root, styles.root_desktop)}>
            <AdForm advert={advert} />
          </Container>
        </Otherwise>
      </Choose>
    )
  }
}

export default EditAd;
