import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import H2 from 'components/Screens/Ico/$$/Base/H2';
import Container from '../Container';
import Carousel from '../Carousel';
import {tToArray} from 'utils/utils';

const Functionality = inject('locales')(observer(({className, locales: {t}}) => {
  const settings = {     
    customPaging: function(i) {
      return (
        <button className={styles.page} />
      );
    },
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    arrows: false,
    dots: true
  };  

  return (
    <div id='functionality' className={cx(styles.root, className)}>
      <Container>
        <H2 className={styles.title} size='sm'>{t(`ico.functionality.title`)}</H2>
        <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.functionality.description`)}} />
      </Container>
      <Carousel className={styles.items} settings={settings}>  
        <For each='item' index='i' of={tToArray(t('ico.functionality.items', {returnObjects: true}))}>
          <div className={styles.item} key={i}>
            <div className={cx(styles.item__image, styles.image)}>
              <img 
                src={`${Settings.assetHost}/${item.image}`} 
                alt={item.title} 
                title={item.title}
                className={styles.image__img} 
              />
            </div>
            <div className={styles.item__title} dangerouslySetInnerHTML={{__html: item.title}} />
            <div className={styles.item__description} dangerouslySetInnerHTML={{__html: item.description}} />
          </div>
        </For>
      </Carousel>
    </div>
  )
}));

export default Functionality;
