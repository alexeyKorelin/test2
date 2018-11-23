import * as S1 from '../';
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import Settings from 'config';
import { inject, observer } from 'mobx-react';

const Persons = inject('locales')(
  observer(({className, ...props}) => {
    const { locales: {t} } = props;
    return (
      <S1.Container className={cx(styles.root, className)} id={props.id}>
        <S1.Title
          title={t('landing.person.title')}
          description={t('landing.person.description')}
        />
        <Row className={styles.persons}>
          <Col size={3}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <img
                  src={`${Settings.assetHost}/landing/person-1.png`}
                  title={t('landing.person.advs_title_0')}
                />
              </div>
              <div className={styles.title}>{ t('landing.person.advs_title_0') }</div>
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.person.advs_description_0') }} />
            </div>
          </Col>
          <Col size={3}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <img
                  src={`${Settings.assetHost}/landing/person-2.png`}
                  title={t('landing.person.advs_title_1')}
                />
              </div>
              <div className={styles.title}>{ t('landing.person.advs_title_1') }</div>
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.person.advs_description_1') }} />
            </div>
          </Col>
          <Col size={3}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <img
                  src={`${Settings.assetHost}/landing/person-3.png`}
                  title={t('landing.person.advs_title_2')}
                />
              </div>
              <div className={styles.title}>{ t('landing.person.advs_title_2') }</div>
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.person.advs_description_2') }} />
            </div>
          </Col>
          <Col size={3}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <img
                  src={`${Settings.assetHost}/landing/person-4.png`}
                  title={t('landing.person.advs_title_3')}
                  style={{marginBottom: '-4px'}}
                />
              </div>
              <div className={styles.bage}>{ t('landing.person.advs_bage_3') }</div>
              <div className={styles.title}>{ t('landing.person.advs_title_3') }</div>
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('landing.person.advs_description_3') }} />
            </div>
          </Col>
        </Row>
      </S1.Container>
    )
  })
)

export default Persons;
