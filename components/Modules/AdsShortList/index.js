import React, {Component} from 'react';
import {chunk} from 'lodash';
import { Row, Col } from 'components/Base/Grid';
import {Link} from 'routes';
import * as U from 'components/Base/Utilities';
import cx from 'classnames';
import styles from './index.sass';

const AdsShortList = props => {
  const count = props.list.length;
  const list = props.list.slice(0, 7);  

  return props.comingSoon ? 
    <div className={cx(styles.root, props.className)}>
      <div className={styles.top}>
        <div className={cx(styles.title, {[styles.comingSoon_title]: props.comingSoon})}>
          {props.title}
          <span className={cx(styles.count, {[styles.comingSoon_count]: props.comingSoon})}>Coming soon</span>
        </div>
      </div>
    </div> :
    <div className={cx(styles.root, props.className)}>
      <div className={styles.top}>
        <div className={styles.title}>
          {props.title}
          <span className={cx(styles.count, !count ? styles.count_zero : '')}>{count}</span>
        </div>
        <div className={styles.actions}>
          <If condition={(props.seeAllUrl && count>7)}>
            <Link route={props.seeAllUrl}>  
              <a className={styles.action}>Смотреть все</a>
            </Link>
          </If>
          <If condition={(props.actionText && props.actionUrl)}>
            <Link route={props.actionUrl}>  
              <a className={styles.action}>{props.actionText}</a>
            </Link>
          </If>
          <If condition={(props.actionText && props.onClick)}>
            <span className={styles.action} onClick={props.onClick}>{props.actionText}</span>
          </If>
        </div>
      </div>
      <If condition={count > 0}>
        <Row className={styles.ads}>
          {list.map((item, i) =>
            <Col size={'1-7'} key={i}>
              <Link route={item.url}>
                <a className={styles.a}>
                  <div className={styles.ad}>
                    <div 
                      className={styles.imageContainer} 
                      style={{backgroundImage: props.isShops ? item.avatar ? `url(${item.avatar})` : 'none' : item.avatar ? `url(${item.avatar.thumb})` : 'none'}}
                      title={item.name}
                    />
                    <div title={item.name} className={styles.adTitle}>{item.name}</div>
                  </div>
                </a>
              </Link>
            </Col>
          )}
        </Row>
      </If>
    </div>
}

AdsShortList.displayName = 'Modules/AdsShortList';

export default AdsShortList;
