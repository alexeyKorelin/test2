import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import { about as data } from 'utils/mock';
import { inject, observer } from 'mobx-react';

const Advs = inject("locales")(
  observer( props => {
    const { advs } = data.pc;
    const {t} = props.locales;

    return (
      <Row className={cx(styles.root, props.className)}>
        {advs.map((adv, i) => (
          <Col key={i} size={6}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <img className={styles.image} src={adv.src} title={t(`landing.about.pc.advs_title_${i}`)} />
              </div>
              <div className={styles.title}>{t(`landing.about.pc.advs_title_${i}`)}</div>
              <div className={styles.description}>{t(`landing.about.pc.advs_description_${i}`)}</div>
            </div>
          </Col>
        ))}
      </Row>
    )
  })
);

export default Advs;
