import React, {Component} from 'react';
import cx from 'classnames';
import Icon from 'components/Base/Icon';
import styles from './index.sass';
import {Link} from 'routes';

class BigStepsCrumbs extends Component {
  render () {
    const {className, advert, step, title, setStep, t} = this.props;
    return (
      <div className={cx(styles.root, className)}>
        <div
          className={cx(
            styles.point,
            {[styles.point_active]: step === 1},
            {[styles.point_closed]: step > 1}
          )}
        >
          <div className={styles.left}>
            <div className={styles.iconContainer}>
              <Link route={'/new_ad'}>
                <a className={styles.icon}>
                  <span className={styles.number}>1</span>
                  <Icon className={styles.closedIcon} width={18} icon={`point-closed`} />
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{t('createAd.crumbs.whatDoYouSell')}</div>
            <div className={styles.description}>{advert.subcategory.name}</div>
          </div>
        </div>
        <div className={styles.divider}>
          <Icon width={77} icon={'short-dashed-line'} />
        </div>
        <div
          className={cx(
            styles.point,
            {[styles.point_active]: step === 2},
            {[styles.point_closed]: step > 2}
          )}
        >
          <div className={styles.left}>
            <div className={styles.iconContainer}>
              <div className={styles.icon} onClick={() => {setStep(2)}}>
                <span className={styles.number}>2</span>
                <Icon className={styles.closedIcon} width={18} icon={`point-closed`} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{t('createAd.crumbs.details')}</div>
            <div className={styles.description}>{title}</div>
           </div>
        </div>
        <div className={styles.divider}>
          <Icon width={77} icon={'short-dashed-line'} />
        </div>
        <div
          className={cx(
            styles.point,
            {[styles.point_active]: step === 3},
            {[styles.point_closed]: step > 3},
            {[styles.point_emptyDesc]: true}
          )}
        >
          <div className={styles.left}>
            <div className={styles.iconContainer}>
              <div className={styles.icon}>
                <span className={styles.number}>3</span>
                <Icon className={styles.closedIcon} width={18} icon={`point-closed`} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{t('createAd.crumbs.cost')}</div>
          </div>
        </div>
      </div>
    )
  }
}


export default BigStepsCrumbs;
