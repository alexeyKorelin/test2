import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import { TabControls, TabControl, Tabs, Tab } from 'components/Base/Tabs';
import { advantages as data } from 'utils/mock';
import { inject, observer } from 'mobx-react';

@inject('locales')
@observer
class Advs extends Component {
  state = {
    activeTab: '1'
  }

  render() {
    const { locales: {t} } = this.props
    const buyerAdvantages = <AdvsList list={data.pc.buyer} trKey={'buyer'} t={t} />;
    const sellerAdvantages = <AdvsList list={data.pc.seller} trKey={'seller'} t={t} />;

    return (
      <div className={cx(styles.root, this.props.className)}>
        <TabControls>
          <TabControl
            className={styles.tabControl_buyer}
            active={this.state.activeTab === '1'}
            onClick={() => this.toggle('1')}
          >
            { t('landing.advantages.forBuyer') }
          </TabControl>
          <TabControl
            className={styles.tabControl_seller}
            active={this.state.activeTab === '2'}
            onClick={() => this.toggle('2')}
          >
            { t('landing.advantages.forSeller') }
          </TabControl>
        </TabControls>
        <Tabs>
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

const AdvsList = inject('locales')(observer(({list, trKey, locales: {t}}) => {
  return (
    <Row>
      {list.map((item, i) => (
        <Adv
          key={i}
          src={item.src}
          title={t(`landing.advantages.${trKey}_title_${i}`)}
          description={t(`landing.advantages.${trKey}_description_${i}`)}
          soon={item.soon}
          soonString={item.soon && t(`landing.advantages.${trKey}_soon_${i}`)}/>
      ))}
    </Row>
  )
}))

const Adv = ({src, title, description, soon, soonString}) => (
  <Col size={3} className={styles.col}>
    <div className={styles.adv}>
      <div className={styles.imageContainer}>
        <img src={src} title={title} />
      </div>
      {soon && <div className={styles.bage}>{soonString}</div>}
      <div className={styles.title}>{title}</div>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  </Col>
)

export default Advs;
