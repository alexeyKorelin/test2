import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import {socials, project, ico, documents} from './mock.js';
import Settings from 'config';
import {Container, Row, Col} from 'components/Base/Grid';
import {Link} from 'routes';
import {scrollTo, tToArray} from 'utils/utils';

@inject('locales')
@observer
class Footer extends Component {
  render () {
    const {className, locales: {t}} = this.props;
    
    return (  
      <Container className={cx(styles.root, className)}>
        <Row>
          <Col size='1-5'>
            <Link route='/'>
              <a>
                <img 
                  src={`${Settings.assetHost}/assets/white-logo.svg`} 
                  alt={t('ico.common.company')}
                  title={t('ico.common.company')} 
                />
              </a>
            </Link><br />
            <Link route='/'>
              <a className={cx(styles.link, styles.site)}>mentalmarket.io</a>
            </Link>
            <div className={styles.socials}>
              <For each='item' index='i' of={tToArray(t('ico.social.items', {returnObjects: true}))}>
                <a key={i} href={item.href} target='_blank' className={styles.socials__link}>
                  <img src={`${Settings.assetHost}/${item.image}`} alt={item.title} title={item.title} />
                </a>
              </For>
            </div>
          </Col>
          <Col size='1-5'>
            <div className={styles.header}>{t(`ico.footer.project.title`)}</div>
            <ul className={styles.links}>
              <For each='item' index='i' of={project}>
                <li key={i} className={styles.links__li}>
                  <a href={`#${item}`} onClick={() => scrollTo(item, false, -110)} className={styles.link}>{t(`ico.footer.project.items.${item}`)}</a>
                </li>
              </For>
            </ul>
          </Col>
          <Col size='1-5'>
            <div className={styles.header}>{t(`ico.footer.ico.title`)}</div>
            <ul className={styles.links}>
              <For each='item' index='i' of={ico}>
                <li key={i} className={styles.links__li}>
                  <a href={`#${item}`} onClick={() => scrollTo(item, false, -110)}  className={styles.link}>{t(`ico.footer.ico.items.${item}`)}</a>
                </li>
              </For>
            </ul>
          </Col>
          <Col size='1-5'>
            <div className={styles.header}>{t(`ico.documents.title`)}</div>
            <ul className={styles.links}>
              <For each='item' index='i' of={tToArray(t('ico.documents.items', {returnObjects: true}))}>
                <li key={i} className={styles.links__li}>
                  <a className={styles.link} href={item.href} target='_blank'>{item.title}</a>
                </li>
              </For>
            </ul>
          </Col>
          <Col size='1-5'>
            <div className={styles.header}>{t(`ico.resources.title`)}</div>
            <ul className={styles.links}> 
              <li className={styles.links__li}>
                <a href={t(`ico.resources.items.whitepaper.href`)} className={styles.link} target='_blank'>{t(`ico.resources.items.whitepaper.title`)}</a>
              </li>
              <li className={styles.links__li}>
                <a href={t(`ico.resources.items.onepager.href`)} className={styles.link} target='_blank'>{t(`ico.resources.items.onepager.title`)}</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Footer;
