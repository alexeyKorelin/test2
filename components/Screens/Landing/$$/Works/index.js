import * as S1 from '../';
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import Button from 'components/Base/Button';
import { works as data } from 'utils/mock';
import { inject, observer } from 'mobx-react';

const Works = inject('locales')(
  observer(({className, goToRegistration, locales: {t}, ...props}) => {
    const { steps } = data.pc;

    return (
      <S1.Container className={cx(styles.root, className)} id={props.id}>
        <S1.Title
          className={styles.header}
          title={t('landing.works.pc.title')}
          subtitle={t('landing.works.pc.subtitle')}
        />
        <div className={styles.steps}>
          {steps.map((step, i) =>
            step.left ? (
              <Row key={i} className={styles.step}>
                <Col className={styles.info} size={4} offset={1}>
                  <Content
                    title={t(`landing.works.pc.steps_title_${i}`)}
                    description={t(`landing.works.pc.steps_description_${i}`)}
                    left={true}
                    goToRegistration={goToRegistration}
                  />
                </Col>
                <Col size={5} offset={1}>
                  <Image src={step.src} title={t(`landing.works.pc.steps_title_${i}`)} />
                </Col>
              </Row>
            ) : (
              <Row key={i} className={styles.step}>
                <Col className={styles.rightAlign} size={6}>
                  <Image src={step.src} title={t(`landing.works.pc.steps_title_${i}`)} />
                </Col>
                <Col className={styles.info} size={4} offset={1}>
                  <Content
                    title={t(`landing.works.pc.steps_title_${i}`)}
                    description={t(`landing.works.pc.steps_description_${i}`)}
                    button={step.button}
                    goToRegistration={goToRegistration} t={t} />
                </Col>
                <Col size={1} />
              </Row>
            )
          )}
        </div>
      </S1.Container>
    )
  })
)

const Image = ({src, title}) => (
  <img src={src} title={title} />
)

const Content = inject('locales')(
  observer(({title, description, left, button, goToRegistration, locales: {t}}) => (
    <div className={cx(styles.content, {[styles.rightAlign]: left})}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
      {button &&
        <Button
          onClick={goToRegistration}
          className={styles.registrate}
          color={'transparent'}
          kind={'landingPrimary'}
        >{ t('landing.register') }</Button>
      }
    </div>
  ))
)

export default Works;
