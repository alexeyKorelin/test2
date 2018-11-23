import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import cx from 'classnames';
import styles from './index.sass';
import Popup from 'components/Modules/Popup';
import Button from 'components/Base/Button';
import TextInput from 'components/Base/Form/TextInput';
import Icon from 'components/Base/Icon';
import * as S from './$$';
import {Router} from 'routes';

@inject('locales')
@inject('actions')
@inject('shops')
@inject('auth')
@observer
class ShopModal extends Component {
  state = {
    success: false,
    errors: null,
    domain: this.props.shop && this.props.shop.domain,
    avatar: this.props.shop && this.props.shop.avatar
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shop) {
      this.setState({ ...nextProps.shop })
    }
  }

  onChange = (e) => {
    const {name, value} = e.target
    const {shop} = this.props;
    shop.applyChanges({[name]: value});
    this.setState({errors: null});
  }

  submit = () => {
    const { shop, auth: { user } } = this.props;
    const { domain, avatar } = this.state;
    const params = {
      name: shop.name,
      description: shop.description,
      domain: shop.domain,
      address: shop.address,
      external_url: shop.external_url,
      avatar: shop.avatar !== avatar ? shop.avatar : null
    }
    user.saveShop(params, domain)
      .then(res => {
        if (shop.id) {
          this.setState({ errors: null })
          this.props.shops.dismissShop()
        } else {
          this.setState({ success: true, errors: null })
        }
      })
      .catch(res => {
        this.setState({ errors: res.errors });
      })
  }

  onClose = () => {
    this.setState({ success: false })
    this.props.shops.dismissShop()
  }

  goToShop = () => {
    const { shop } = this.props
    Router.pushRoute(shop.url)
    this.onClose()
  }

  render() {
    const { locales: { t }, shops, shop, size } = this.props;
    const { success, errors, domain } = this.state;
    const isOpen = shops.editingShop;

    return !success ? (
      <Popup size={size} kind={'shop'} className={styles.root} isOpen={isOpen} onClose={shops.dismissShop}>
        <h2 className={cx({[styles.h2_mobile]: size == 'sm-fullsize'})}>{domain ? t('createShop.title.edit') : t('createShop.title.new')}</h2>
        <TextInput className={styles.input} label={t('createShop.fields.name')} name={'name'} value={shop && shop.name} count={'50'} onChange={this.onChange} required={true} error={errors ? errors.name : null} />
        <TextInput className={styles.input} label={t('createShop.fields.description')} name={'description'} value={shop && shop.description} count={'70'} onChange={this.onChange} required={true} error={errors ? errors.description : null} />
        <TextInput className={styles.input} label={t('createShop.fields.domain')} description={`(mentalmarket.io/${domain ? domain : 'my_beauty_shop'})`} name={'domain'} value={shop && shop.domain} count={'40'} onChange={this.onChange} required={true} error={errors ? errors.domain : null} />
        <S.GeoInput label={t('createShop.fields.geo')} shop={shop} type={'address'} error={errors ? errors.address : null} />
        <TextInput className={styles.input} label={t('createShop.fields.external_url')} name={'external_url'} value={shop && shop.external_url} onChange={this.onChange} />
        <S.AvatarUpload shop={shop} error={errors ? errors.avatar : null} />
        <Button kind={'circled'} color={'gradient'} onClick={this.submit}>
          {domain ? t('createShop.buttons.edit') : t('createShop.buttons.new')}
        </Button>
      </Popup>
    ) : (
      <Popup className={styles.success} kind={'tight'} color={'gradient'} isOpen={isOpen} onClose={this.onClose}>
        <div className={styles.success_icon}>
          <Icon icon="mental-v" width={36} />
        </div>
        <h2>{t('createShop.thanks')}</h2>
        <p className={styles.success_description}>{t('createShop.success')}</p>
        <Button color={'white'} onClick={this.goToShop}>
          {t('createShop.goToShop')}
        </Button>
      </Popup>
    )
  }
}

export default ShopModal;