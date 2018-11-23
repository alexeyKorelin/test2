import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'routes';
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import Avatar from 'components/Modules/Avatar';
import IconNew from 'components/Base/IconNew';
import Bage from 'components/Base/Bage';

@inject('locales')
@observer
class Shop extends Component {

  render() {
    const { locales: { t }, shop, user, slice } = this.props;

    return (
      <div className={cx(styles.root, {[styles.root_gradient]: user})}>
        <Col className={styles.left}>
          <div className={styles.avatar}>
            <Link route={shop.url}>
              <a><Avatar className={styles.avatar} owner={shop} size={49} /></a>
            </Link>
          </div>
          <div className={styles.count}><IconNew i={'list'} />{shop.adverts_count}</div>
        </Col>
        <Col className={styles.right}>
          <If condition={shop.adverts_categories}>
            <div className={styles.categories}>
              <For each='category' of={shop.categories.slice(0, slice)}>
                <Link key={category.slug} route={category.url}>
                  <a className={styles.bage}>
                    <Bage backgroundColor={category.color} borderColor={category.color} color={'#fff'}>
                      {category.name}
                    </Bage>
                  </a>
                </Link>
              </For>
              <If condition={shop.categories.length > slice}>
                <span className={styles.bage_other}>{t('shops.andOther')}</span>
              </If>
            </div>
          </If>
          <If condition={!user}>
            <div className={styles.edit} onClick={shop.edit}><IconNew i={'pencil'} /></div>
          </If>
          <h2 className={styles.name}>
            <Link route={shop.url}>
              <a>«{shop.name}»</a>
            </Link>
          </h2>
          <If condition={!user}>
            <div className={styles.domain}>
              <Link route={shop.url}>
                <a>@{shop.domain}</a>
              </Link>
            </div>
          </If>
          <div className={styles.description}>{shop.description}</div>
          <If condition={!user}>
            <If condition={shop.address}>
              <div className={styles.info}>
                <div className={styles.icon}><IconNew i={'geo'} size={14} /></div>
                <div>{shop.place}</div>
              </div>
            </If>
            <If condition={shop.external_url}>
              <div className={styles.info}>
                <div className={styles.icon}><IconNew i={'link'} /></div>
                <div><a href={shop.external_url} target="_blank" rel="nofollow">{shop.external_url}</a></div>
              </div>
            </If>
          </If>
        </Col>
      </div>
    )
  }
}

export default Shop;