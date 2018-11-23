import { Component } from 'react';
import cx from 'classnames';
import { Link } from 'routes';
import Button from 'components/Base/Button';
import Avatar from 'components/Modules/Avatar';
import IconNew from 'components/Base/IconNew'
import { inject, observer } from 'mobx-react';
import styles from './index.sass';
import Dropdown from 'components/Base/Dropdown';
import ShopModal from 'components/Modules/ShopModal';

@inject('auth')
@inject('actions')
@inject('shops')
@inject('locales')
@observer
class ShopCard extends Component {

  render() {
    const { className, auth: { user }, locales: { t }, shop, shops, ad } = this.props;
    const userShop = user && user.isShops(shop.domain)
    
    return (
      <div className={cx(styles.root, className)}>
        <If condition={userShop}>
          <div className={styles.dropdown}>
            <Dropdown icon={'pencil'} color={'light'}>
              <a onClick={shop.edit}>{t('shops.editShop')}</a>
              <a onClick={shop.delete}>{t('shops.deleteShop')}</a>
              <Link route={'/new_ad'}>
                <a>{t('createAd.buttons.createAd')}</a>
              </Link>
            </Dropdown>
          </div>
        </If>
        <If condition={ad}>
          <Link route={shop.url}>
            <a className={styles.avatar_a}><Avatar className={styles.avatar} owner={shop} size={70} isShop /></a>
          </Link>
        </If>
        <If condition={!ad}>
          <Avatar className={styles.avatar} owner={shop} size={70} isShop />
        </If>
        <div className={styles.domain}>@{shop.domain}</div>
        <If condition={ad}>
          <div className={styles.name}>
            <Link route={shop.url}>
              <a>«{shop.name}»</a>
            </Link>
          </div>
        </If>
        <If condition={!ad}>
          <div className={styles.name}>«{shop.name}»</div>
        </If>
        <div className={styles.since}>{t('profile.registeredFrom')} {shop.date}</div>
        <div className={styles.description}>{shop.description}</div>
        <If condition={shop.external_url && !userShop}>
        <div className={styles.link}>
          <a href={shop.external_url} target='_blank' className={styles.link__a}>{shop.external_url}</a>
        </div>
        </If>
        <If condition={!userShop}>
          <Button color={'white'} className={styles.button} href={shop.user.tg} target={'_blank'} external>
            {t('profile.getInTouch')}
            <IconNew i={'telegram'} className={styles.telegramIcon} />
          </Button>
        </If>
        <If condition={shop.address && !userShop}>
          <div className={styles.address}>{shop.place}</div>
        </If>
        <If condition={userShop}>
          <ShopModal shop={shops.editingShop} />
        </If>
      </div>
    )
  }
}

ShopCard.displayName = 'Modules/ShopCard';

export default ShopCard;