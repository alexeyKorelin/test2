import React, { Component } from 'react';
import * as S1 from '../';
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import ScrollArea from 'components/Base/ScrollArea';
import { Link } from 'routes';
import Icon from 'components/Base/Icon';
import Button from 'components/Base/Button';
import IconNew from 'components/Base/IconNew';
import { catalog as data } from 'utils/mock';
import { inject, observer } from 'mobx-react';

@inject('locales')
@observer
class Catalog extends Component {
  horizontalScrollbarStyle = {
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  render() {
    const { categories, locales: {t} } = this.props;

    return (
      <div className={cx(styles.root, this.props.className)}>
        <S1.Container>
          <S1.Title
            title={t('landing.catalog.pc.title')}
            description={t('landing.catalog.pc.description')}
          />
        </S1.Container>
        <S1.Section className={styles.content}>
          <ScrollArea
            className={styles.scrollArea}
            contentClassName={styles.categories}
            scrollBarContainerClassName={styles.scrollbarContainer}
            scrollBarClassName={styles.scrollbar}
            swapWheelAxes
            smoothScrolling
            vertical={false}
            horizontal={true}
            scrollBarSize={450}
          >
              {categories.map(category => {
                let children = category.children.filter((subcategory) => subcategory.name.length < 23);
                return (
                  <div key={category.slug} className={styles.categoryContainer}>
                    <Link route={category.url}>
                      <a className={styles.category}>
                        <div className={styles.imageContainer}>
                          <IconNew i={category.slug} size={44} />
                        </div>
                        <div className={styles.title}>{ category.name }</div>
                        {children.length > 0 &&
                          <ul className={styles.ul}>
                            {children.map((subcategory, index) => {
                              if (index < 3) {
                                return (
                                  <li key={subcategory.slug} className={styles.li} title={ subcategory.name }>{ subcategory.name }</li>
                                )
                              } else {
                                return null;
                              }
                            })}
                          </ul>
                        }
                        <div className={styles.controls}>
                          <button className={styles.showAll}>{ t('landing.showAll') }</button>
                        </div>
                      </a>
                    </Link>
                  </div>
                )
              })}
          </ScrollArea>
        </S1.Section>
        <S1.Container className={styles.controls}>
            <Button href={'/main'} color={'landingTransparent'} kind={'landingPrimary'} prefetch>{ t('landing.createAd') }</Button>
            <Link route={'/main'}>
              <a className={styles.toCatalog} href={'/main'}>{ t('landing.showCatalog') }</a>
            </Link>
        </S1.Container>
      </div>
    )
  }
}

export default Catalog;
