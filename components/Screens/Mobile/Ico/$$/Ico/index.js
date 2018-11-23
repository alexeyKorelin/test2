import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import carouselStyles from 'slick-carousel/slick/slick.css';
import Settings from 'config';
import H2 from 'components/Screens/Ico/$$/Base/H2';
import Container from '../Container';
import Carousel from '../Carousel';
import {tToArray} from 'utils/utils';

@inject('locales')
@observer
class Ico extends Component {
  _slider = React.createRef();

  state = {
    active: 0
  }

  render () {
    const {active} = this.state;
    const {className, locales: {t}} = this.props;
    const settings = {
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      arrows: false,
      beforeChange: (current, next) => this.setState({active: next})
    }
    const items = tToArray(t('ico.ico.items', {returnObjects: true}));

    return (
      <div id='ico' className={cx(styles.root, className)}>
        <Container>
          <style dangerouslySetInnerHTML={{ __html: carouselStyles}} />
          <H2 className={styles.title} size='sm'>{t(`ico.ico.title`)}</H2>
          <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.ico.description`)}} />
          <div className={styles.pagination}>
            <For each='item' index='i' of={items}>
              <button key={i} onClick={() => this.goTo(i)} className={cx(styles.page, {[styles.page_active]: active === i})}>
                <div className={cx(styles.page__inner, styles.page__inner_1)} />
                <div className={cx(styles.page__inner, styles.page__inner_2)} />
                <div className={cx(styles.page__inner, styles.page__inner_3)} />
                <div className={cx(styles.page__inner, styles.page__inner_4)}>
                  <img 
                    src={`${Settings.assetHost}/${item.image}`} 
                    alt={item.title} 
                    title={item.title}
                    className={styles.page__img} 
                  />
                </div>
              </button>
            </For>
          </div>
        </Container>
        <Carousel setRef={this._slider} className={styles.items} settings={settings} onChange={this.onChange}>
          <For each='item' index='i' of={items}>
            <div key={i} className={styles.item}>
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
  }

  goTo = (i) => this._slider.current.slickGoTo(i);
}

export default Ico;
