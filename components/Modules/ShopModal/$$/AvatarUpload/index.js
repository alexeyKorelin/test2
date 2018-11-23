import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {observer, inject} from 'mobx-react';
import {imageAcceptFormats} from 'utils/const'
import Icon from 'components/Base/Icon';

@inject('locales')
@observer
class AvatarUpload extends Component {

  onChange = (e) => {
    const {shop} = this.props;

    e.preventDefault();
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    if (file) {
      reader.readAsDataURL(file);
    } else {
      shop.applyChanges({avatar: ''});
    }
    reader.onloadend = () => {
      shop.applyChanges({avatar: reader.result});
    }
  }

  openUploadDialog = () => {
    const elem = document.getElementById('avatar');
    if (elem) elem.click();
  }

  deleteImage = () => {
    const {shop} = this.props;
    shop.applyChanges({avatar: ''});
  }

  render() {
    const {shop, error, locales: {t}} = this.props;

    return(
      <div className={cx(styles.root, {[styles.root_error]: error})}>
        <div className={styles.avatar}>
          <img src={shop.avatar} />
        </div>
        <If condition={shop.avatar}>
          <button className={styles.avatar_remove} onClick={this.deleteImage}>
            <Icon icon={'rounded-cross'} width={6} />
          </button>
        </If>
        <div className={styles.avatar_button}><span onClick={this.openUploadDialog}>{t('createShop.avatarUpload')}</span></div>
        <input
          id='avatar'
          hidden
          type={'file'} 
          name={'avatar'}
          onChange={this.onChange}
          accept={imageAcceptFormats}
        />
      </div>
    )
  }
};

export default AvatarUpload;