import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import styles from './index.sass';
import AdsList from 'components/Modules/Mobile/AdsList';
import MainCarousel from 'components/Modules/MainCarousel';
import ChannelBanner from 'components/Modules/Mobile/ChannelBanner';
import { Link } from 'routes';

@inject('auth')
@inject('categories')
@inject('latestAdverts')
@inject('cards')
@inject('locales')
@observer
class MobileIndex extends Component {
  state = {
    columnsCount: 2
  }

  render() {
    const {auth, locales: { t }} = this.props;
    const {categories} = this.props.categories;
    const latestAdverts = this.props.latestAdverts;
    const {cards} = this.props.cards;
    const { columnsCount } = this.state

    return (
      <div>
        {cards && cards.length &&
          <div>
            <h2 className={styles.topHeader}>{ t('main.top') }</h2>
            <div className={styles.cardsContainer}>
              <div className={styles.cards}>
                <div className={styles.cards__inner}>
                  {cards.map((card, i) => {
                    const { advert: { coin, category, url }, avatar, description, title, price } = card
                    const stringedPrice = price.toString()
                    const priceValue = stringedPrice.slice(0, stringedPrice.indexOf('.') + 4)
                    return (
                      <Link key={i} route={url} prefetch>
                        <div className={styles.cards__card}>
                          <Link route={category.url}>
                            <div className={styles.cards__category} style={{backgroundColor: category.color}}>
                              {category.name}
                            </div>
                          </Link>
                          <div className={styles.cards__image} style={{backgroundImage: `url(${avatar})`}}></div>
                          <div className={styles.cards__price}>{priceValue} {coin.toUpperCase()}</div>
                          <div className={styles.cards__title}>{title}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        }
        <h2 className={styles.bottomHeader}>{ t('main.latest') }</h2>
        {latestAdverts.adverts.length ?
          <AdsList
            list={latestAdverts.adverts}
            finished={latestAdverts.finished}
            moreDisabled={latestAdverts.loading}
            moreAction={latestAdverts.loadMore}
            showCategory={true}
            columnsCount={columnsCount}
          /> : null}
        <ChannelBanner className={styles.channelBanner} />
      </div>
    );
  }
}

MobileIndex.displayName = 'Screens/Mobile/Index';

export default MobileIndex;
