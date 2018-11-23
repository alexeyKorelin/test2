import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Settings from 'config';
import H2 from 'components/Screens/Ico/$$/Base/H2';
import Container from '../Container';
import Button from 'components/Base/Button';
import {tToArray} from 'utils/utils';

const About = inject('locales')(observer(({className, locales: {t}}) =>
  <Container id='about' className={cx(styles.root, className)}>
    <H2 className={styles.title} size='sm'>{t(`ico.about.title`)}</H2>  
    <div className={styles.description} dangerouslySetInnerHTML={{__html: t(`ico.about.description`)}} />
    <ul className={styles.features}>
      <For each='item' index='i' of={tToArray(t('ico.about.features', {returnObjects: true}))}>
        <li key={i} className={styles.feature}>
          <div className={styles.feature__title} dangerouslySetInnerHTML={{__html: item.title}} />
          <div className={styles.feature__description} dangerouslySetInnerHTML={{__html: item.description}} />
        </li>
      </For>
    </ul>
    <img className={styles.mainImage} src={`${Settings.assetHost}/ico/about/main-sm.png`} />  
    <div className={styles.controls}>
      <Button 
        className={styles.controls__control}
        href='/'
        kind='icoCircled'
        color='icoGradient'
      >{t('ico.about.know')}</Button>
    </div>
  </Container>
))

export default About;
