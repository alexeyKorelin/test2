import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Button from 'components/Base/Button';
import { inject, observer } from 'mobx-react';

@inject('actions')
@inject('locales')
@observer
class CreateAd extends Component {
  render() {
    const { auth, color, kind, locales: { t }} = this.props;

    return (
      <Button onClick={this.handleClick} href={auth.user && '/new_ad'} className={this.props.className} kind={kind} color={color}>{ t('header.createAd') }</Button>
    )
  }

  handleClick = () => {
    const { auth, actions } = this.props;

    if (auth.user) {
      return false;
    } else {
      actions.setAction('unauthorized');
    }
  }
}

CreateAd.displayName = 'Modules/Header/CreateAd';

export default CreateAd;
