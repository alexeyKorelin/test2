import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import { Component } from 'react'
import { Row, Col } from 'components/Base/Grid';
import AdBage from 'components/Modules/Mobile/AdBage';
import Toggle from 'components/Base/Toggle';
import Button from 'components/Base/Button';
import styles from './index.sass';
import Settings from 'config';
import CategoryIsEmpty from 'components/Modules/CategoryIsEmpty';
import AdsIsEmpty from 'components/Modules/AdsIsEmpty';
import SearchIsEmpty from 'components/Modules/SearchIsEmpty';
import ShopIsEmpty from 'components/Modules/ShopIsEmpty';
import Icon from 'components/Base/Icon';

@inject('locales')
@observer
class AdsList extends Component {

  state = {
    limiter: 6
  }

  incrementLimiter() {
    const { limiter } = this.state
    const { moreAction } = this.props
    this.setState({ limiter: limiter + 6})
  }

  render() {
    const {
      className,
      list,
      auth,
      user,
      columnsCount,
      columnSize,
      showCategory,
      showSubcategory,
      adKind,
      moreAction,
      moreDisabled,
      finished,
      emptyDescription,
      emptyImage,
      emptyLink,
      emptyLinkText,
      isCategory,
      isSubcategory,
      categories,
      slug,
      touched,
      useLimiter,
      isAds,
      isSearch,
      isShop,
      isIndex,
      isMyAds,
      userShop,
      loading,
      locales: {t}
    } = this.props
    const { limiter } = this.state
    const selectedList = useLimiter ? list.slice(0, limiter) : list
    return selectedList.length > 0 ? (
      <Row className={cx(styles.root, className)}>
        {selectedList.map((item, i) =>
          <Col
            key={item.uid}
            className={styles.col}
            xs={6}
            sm={4}
            md={3}
          >
            <AdBage
              className={styles.adBage}
              ad={item}
              toggleModal={this.toggleModal}
              showCategory={showCategory}
              showSubcategory={showSubcategory}
              kind={adKind}
              isIndex={isIndex}
              isMyAds={isMyAds}
              userShop={userShop}
            />
            </Col>
          )}
        {(moreAction && !finished) &&
          <Col size={12} className={styles.controls}>
            <Toggle>
              {(moreAction && !finished) &&
                <button className={styles.more} onClick={moreAction} disabled={moreDisabled}>
                  <Icon className={styles.more__icon} icon='arrow-more-sm' />
                </button>}
            </Toggle>
          </Col>
        }
        {(useLimiter && limiter < list.length) &&
          <Col size={12} className={styles.controls}>
            <Toggle>
              {(moreAction && !finished) &&
                <button className={styles.more} onClick={this.incrementLimiter} disabled={moreDisabled}>
                  <Icon className={styles.more__icon} icon='arrow-more-sm' />
                </button>}
            </Toggle>
          </Col>
        }
      </Row>
    ) : (
      <If condition={!touched && !loading}>
        <Choose>
          <When condition={isCategory}>
            <CategoryIsEmpty
              categories={categories}
              slug={slug}
              description={t('category.empty')}
              isCategory
              size={'sm'}
            />
          </When>
          <When condition={isSubcategory}>
            <CategoryIsEmpty
              categories={categories}
              slug={slug}
              description={t('subcategory.empty')}
              size={'sm'}
            />
          </When>
          <When condition={isAds}>
            <AdsIsEmpty className={styles.adsIsEmpty} size={'sm'} auth={auth} user={user} />
          </When>
          <When condition={isShop}>
            <ShopIsEmpty className={styles.shopIsEmpty} userShop={userShop} />
          </When>
          <When condition={isSearch}>
            <SearchIsEmpty
              description={t('search.empty')}
              size={'sm'}
            />
          </When>
          <Otherwise>
            <div className={cx(styles.root, className)}>
              <If condition={emptyDescription}>
                <div className={styles.description}>{emptyDescription}</div>
              </If>
              <If condition={emptyImage}>
                <div className={styles.image}>
                  <img src={`${Settings.assetHost}/assets/catbox.png`} />
                </div>
              </If>
              {(emptyLink && emptyLinkText) &&
                <div className={cx(styles.controls, styles.controls_alignLeft)}>
                  <Button href={emptyLink} className={styles.button}>{emptyLinkText}</Button>
                </div>
              }
            </div>
          </Otherwise>
        </Choose>
      </If>
    )
  }
}

AdsList.displayName = 'Modules/Mobile/AdsList';

export default AdsList;
