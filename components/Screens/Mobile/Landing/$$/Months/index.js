import { Component } from 'react';
import * as S from '../';
import cx from 'classnames';
import styles from './index.sass';
import { Link } from 'routes';
import { TabControls, TabControl, Tabs, Tab } from 'components/Base/Tabs';
import Button from 'components/Base/Button';
import { quarters } from 'utils/mock';
import Settings from 'config';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Months extends Component {
  state = {
    activeTab: 0
  }

  render() {
    const { locales: { t }, className, ...props } = this.props;

    return (
      <S.Container className={cx(styles.root, className)} {...props}>
        <h2 className={styles.h2}>{ t('landing.months.title') }</h2>
        <div className={styles.description}>{ t('landing.months.description') }{/* Карта наших главных событий на 2018 год<br /> */}</div>
        <TabControls className={styles.tabControls}>
          {quarters.map((quarter, i) => (
            <TabControl
              key={i}
              className={styles.tabControl}
              activeClassName={styles.tabControl_active}
              active={this.state.activeTab === i}
              onClick={() => this.toggle(i)}
            >{ t(`landing.quarters.title_${i}`) }<span className={styles.quarterFull}>{' '}{ t('landing.quarters.quarter') }</span></TabControl>
          ))}
        </TabControls>
        <Tabs className={styles.tabs}>
          {quarters.map((quarter, i) => (
            <Tab key={i} active={this.state.activeTab === i} className={styles.tab}>
              <ul className={styles.ul}>
              {quarter.description.map((item, k) => (
                <li className={styles.li} key={k}>
                  <span className={styles.ellipse}>•</span>
                  <span dangerouslySetInnerHTML={{ __html: t(`landing.quarters.description_${i}_${k}`) }} />
                </li>
              ))}
              </ul>
            </Tab>
          ))}
        </Tabs>
        <div className={styles.controls}>
          <Button
            href={ t('landing.months.whitepaperLink') }
            color={'landingTransparent'}
            kind={'landingPrimary'}
            target={'_blank'}
            external
          >{ t('landing.months.whitepaper') }</Button>
          {/* <p className={styles.start}>Старт публичного TokenSale в августе 2018</p> */}
        </div>
      </S.Container>
    )
  }

  toggle = (activeTab) => {
    if (activeTab !== this.state.activeTab) {
      this.setState({activeTab: activeTab});
    }
  }
}

export default Months;
