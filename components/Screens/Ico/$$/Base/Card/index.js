import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import Indicator from '../Indicator';
import CapSm from '../CapSm';

const Card = inject('locales')(observer(({className, active, title, subtitle, description, percent, soft, hard}) =>
  <div 
    className={cx(
      styles.root, 
      className, 
      {[styles.root_active]: active}
    )} 
  >
    <div className={styles.title}>
      <If condition={title}>
        <span className={styles.title__label}>{title}</span>
      </If>
      <span className={styles.title__number}>{`${percent} %`}</span>
    </div>
    <If condition={subtitle}>
      <div className={styles.subtitle}>{subtitle}</div>
    </If>
    <Indicator className={styles.indicator} percent={percent} />
    <If condition={description}>
      <div className={styles.description}>{description}</div>
    </If>
    <div className={styles.caps}>
      <CapSm className={styles.caps__cap} kind='s'>{soft}</CapSm>
      <CapSm className={styles.caps__cap}>{hard}</CapSm>
    </div>
  </div>
))

export default Card;
