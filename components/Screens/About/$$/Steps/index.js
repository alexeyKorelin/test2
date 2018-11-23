import { Component } from 'react'
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import Settings from 'config';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Steps extends Component {
  render() {
    const { locales: { t }} = this.props
    const { props } = this
    return (
      <div className={cx(styles.root, props.className)}>
        <h2 className={styles.h2}>{ t('about.works.title') }</h2>
        <Row className={styles.steps}>
          <Col className={styles.step} size={4}>
            <div className={styles.imageContainer}>
              <img
                src={`${Settings.assetHost}/uploads/advs/about-step-1.png`}
                title={ t('about.works.w_title_0') }
              />
            </div>
            <div className={styles.title}>{ t('about.works.w_title_0') }</div>
            <div className={styles.description}>
              <button className={styles.auth} onClick={props.auth}>{ t('about.works.auth') }</button>
              { ' ' }
              <span dangerouslySetInnerHTML={{ __html: t('about.works.w_description_0') }} />
            </div>
          </Col>
          <Col className={styles.step} size={4}>
            <div className={styles.imageContainer}>
              <img
                src={`${Settings.assetHost}/uploads/advs/about-step-2.png`}
                title={'Действия'}
              />
            </div>
            <div className={styles.title}>{ t('about.works.w_title_1') }</div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: t('about.works.w_description_1') }}
            />
          </Col>
          <Col className={styles.step} size={4}>
            <div className={styles.imageContainer}>
              <img
                src={`${Settings.assetHost}/uploads/advs/about-step-3.png`}
                title={'Успех'}
              />
            </div>
            <div className={styles.title}>{ t('about.works.w_title_2') }</div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: t('about.works.w_description_2') }}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Steps;
