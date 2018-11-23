import React, {Component} from 'react';
import {Container} from 'components/Base/Grid';
import ChannelBanner from 'components/Modules/ChannelBanner';
import CategoriesLinks from 'components/Modules/CategoriesLinks';
import AdsList from 'components/Modules/AdsList';
import { inject, observer } from 'mobx-react';
import styles from './index.sass';
import * as S from './$$';

@inject('categories')
@inject('latestAdverts')
@inject('cards')
@inject('locales')
@observer

class Index extends Component {

  render() {
    const { categories: {categories}, cards: {cards}, latestAdverts, locales: {t} } = this.props;
    
    return (
      <div>
        <Container>
          <CategoriesLinks className={styles.categoriesLinks} list={categories} />
        </Container>
        <If condition={cards && cards.length > 0}>
          <Container>
            <h1 className={styles.topAdsHeader}>{t('main.top')}</h1>
          </Container>
          <S.Cards className={styles.cards} cards={cards} />
        </If>
        <Container>
          <h1>{t('main.latest')}</h1>
          <AdsList
            list={latestAdverts.adverts}
            showCategory={true}
            isIndex={true}
            finished={latestAdverts.finished}
            moreDisabled={latestAdverts.loading}
            columnSize={'1-5'}
            moreAction={() => { latestAdverts.loadMore(); }}
          />
          <ChannelBanner/>
        </Container>
      </div>
    );
  }
}

Index.displayName = 'Screens/Index';

export default Index;
