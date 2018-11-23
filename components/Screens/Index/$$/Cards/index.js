import cx from 'classnames';
import styles from './index.sass';
import ScrollArea from 'components/Base/ScrollArea';
import {Link} from 'routes';
import Bage from 'components/Base/Bage';

const Cards = ({className, cards}) => (
  <ScrollArea
    className={cx(styles.root, className)}
    contentClassName={styles.cards}
    scrollBarContainerClassName={styles.scrollbarContainer}
    scrollBarClassName={styles.scrollbar}
    swapWheelAxes
    smoothScrolling
    vertical={false}
    horizontal={true}
    scrollBarSize={680}
  >
    <div className={styles.cards}>
      {cards.map((card, index) => {
        const { advert: { coin, category, url }, avatar, description, title, price } = card
        const stringedPrice = price.toString()
        const priceValue = stringedPrice.slice(0, stringedPrice.indexOf('.') + 4)
        return (
          <div className={styles.cardContainer} key={index}>
            <style jsx global>{`
              .cardsCategoryBage_${category.slug} {
                background-color: ${category.color};
                border-color: ${category.color}
              }
              .${styles.cardContainer__inner}:hover .cardsCategoryBage_${category.slug} {
                color: ${category.color}
              }
            `}</style>   
            <div className={styles.cardContainer__inner}>             
              <Link route={category.url}>
                <a className={styles.category}>
                  <Bage
                    className={cx(styles.category__bage, `cardsCategoryBage_${category.slug}`)}
                    title={category.name}
                  >{category.name}</Bage>
                </a>
              </Link>
              <Link route={url}>
                <div className={styles.cardInnerContainer}>
                  <div className={styles.cardImageContainer} style={{backgroundImage: `url(${avatar})`}}>
                    <div className={styles.cardImageHover}>
                      <div className={styles.cardImagePrice}>{priceValue} {coin.toUpperCase()}</div>
                      <div className={styles.cardImageDescription}>{description}</div>
                    </div>
                  </div>
                  <p className={styles.cardTitle}>{title}</p>
                </div>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  </ScrollArea>
)

Cards.displayName = 'Screens/Ad/Cards';

export default Cards;
