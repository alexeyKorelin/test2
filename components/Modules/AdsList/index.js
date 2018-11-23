import cx from 'classnames';
import Settings from 'config';
import {inject, observer} from 'mobx-react';
import { Row, Col } from 'components/Base/Grid';
import AdBage from 'components/Modules/AdBage';
import Button from 'components/Base/Button';
import Icon from 'components/Base/Icon';
import Toggle from 'components/Base/Toggle';
import styles from './index.sass';
import CategoryIsEmpty from 'components/Modules/CategoryIsEmpty';
import AdsIsEmpty from 'components/Modules/AdsIsEmpty';
import SearchIsEmpty from 'components/Modules/SearchIsEmpty';
import ShopIsEmpty from 'components/Modules/ShopIsEmpty';

const AdsList = inject('locales')(observer(({
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
  isAds,
  isSearch,
  isShop,
  isIndex,
  isMyAds,
  userShop,
  loading,
  locales: {t}
}) => {
  return list.length > 0 ? (
    <Row className={cx(styles.root, className)}>
      {list.map((item, i) =>
        <Col
          key={`${i}-${item.uid}`}
          className={styles.col}
          size={columnSize ? columnSize : (columnsCount ? 12 / columnsCount : null)}
          indents={10}
        >
          <AdBage
            className={styles.adBage}
            ad={item}
            showCategory={showCategory}
            showSubcategory={showSubcategory}
            kind={adKind}
            isIndex={isIndex}
            isMyAds={isMyAds}
            userShop={userShop}
          />
        </Col>
      )}
      <Col size={12} className={styles.controls}>
        <Toggle>
          {(moreAction && !finished) &&
            <button className={styles.more} onClick={moreAction} disabled={moreDisabled}>
              <Icon className={styles.more__icon} icon='arrow-more' />
            </button>}
        </Toggle>
      </Col>
    </Row>
  ) : (
    <If condition={!touched && !loading}>
      <Choose>
        <When condition={isCategory}>
          <CategoryIsEmpty
            className={styles.isEmpty}
            categories={categories}
            slug={slug}
            description={t('category.empty')}
            isCategory
          />
        </When>
        <When condition={isSubcategory}>
          <CategoryIsEmpty
            className={styles.isEmpty}
            categories={categories}
            slug={slug}
            description={t('subcategory.empty')}
          />
        </When>
        <When condition={isAds}>
          <AdsIsEmpty className={styles.adsIsEmpty} auth={auth} user={user} />
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
}));

AdsList.displayName = 'Modules/AdsList';

export default AdsList;
