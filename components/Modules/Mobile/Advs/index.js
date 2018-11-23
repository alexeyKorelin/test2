import { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { TabControls, TabControl, Tabs, Tab } from 'components/Base/Tabs';
import { CardsCarousel } from 'components/Modules/Mobile/CardsCarousel';
import { advantages as data } from 'utils/mock';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Advs extends Component {
  state = {
    activeTab: '1'
  }

  render() {
    const { locales: { t }} = this.props
    const buyerAdvsList = data.mobile.buyer.map((item, i) => (
      <Adv key={i} src={item.src} title={t(`landing.advantages.buyer_title_${i}`)} description={t(`landing.advantages.buyer_description_${i}`)} soon={item.soon} soonString={ item.soon ? t(`landing.advantages.buyer_soon_${i}`) : null } />
    ));
    const sellerAdvsList = data.mobile.seller.map((item, i) => (
      <Adv key={i} src={item.src} title={t(`landing.advantages.seller_title_${i}`)} description={t(`landing.advantages.seller_description_${i}`)} soon={item.soon} soonString={ item.soom ? t(`landing.advantages.seller_soon_${i}`) : null } />
    ));
    const buyerAdvantages = <CardsCarousel list={buyerAdvsList} />;
    const sellerAdvantages = <CardsCarousel list={sellerAdvsList} />;

    return (
      <div className={cx(styles.root, this.props.className)}>
        <TabControls className={styles.tabControls}>
          <TabControl
            className={cx(styles.tabControl, styles.tabControl_buyer)}
            active={this.state.activeTab === '1'}
            onClick={() => this.toggle('1')}
          >
            { t('landing.advantages.forBuyer') }
          </TabControl>
          <TabControl
            className={cx(styles.tabControl, styles.tabControl_seller)}
            active={this.state.activeTab === '2'}
            onClick={() => this.toggle('2')}
          >
            { t('landing.advantages.forSeller') }
          </TabControl>
        </TabControls>
        <Tabs className={styles.tabs}>
          <Tab active={this.state.activeTab === '1'}>{buyerAdvantages}</Tab>
          <Tab active={this.state.activeTab === '2'}>{sellerAdvantages}</Tab>
        </Tabs>
      </div>
    )
  }

  toggle = (activeTab) => {
    if (activeTab !== this.state.activeTab) {
      this.setState({activeTab: activeTab});
    }
  }
}

const Adv = ({src, title, description, soon, soonString }) => (
  <div className={styles.adv}>
    <div className={styles.imageContainer}>
      <img className={styles.image} src={src} title={title} />
    </div>
    {soon && <div className={styles.bage}>{ soonString }</div>}
    <div className={styles.title}>{title}</div>
    <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
  </div>
)

export default Advs;
