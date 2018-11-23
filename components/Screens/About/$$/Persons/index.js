import { Component } from 'react'
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import Settings from 'config';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class Persons extends Component {
  render() {
    const { locales: { t }} = this.props
    const { props } = this
    return (
      <div className={cx(styles.root, props.className)}>
        <h2 className={styles.h2}>{ t('about.persons.title') }</h2>
        <div className={styles.subheader}>{ t('about.persons.description') }</div>
        <Row className={styles.persons}>
          <Col size={3}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <img
                  src={`${Settings.assetHost}/landing/person-1.png`}
                  title={ t('about.persons.p_title_0') }
                />
              </div>
              <div className={styles.title}>{ t('about.persons.p_title_0') }</div>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: t('about.persons.p_description_0') }}
              />
            </div>
          </Col>
          <Col size={3}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <img
                  src={`${Settings.assetHost}/landing/person-2.png`}
                  title={ t('about.persons.p_title_1') }
                />
              </div>
              <div className={styles.title}>{ t('about.persons.p_title_1') }</div>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: t('about.persons.p_description_1') }}
              />
            </div>
          </Col>
          <Col size={3}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <img
                  src={`${Settings.assetHost}/landing/person-3.png`}
                  title={ t('about.persons.p_title_2') }
                />
              </div>
              <div className={styles.title}>{ t('about.persons.p_title_2') }</div>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: t('about.persons.p_description_2') }}
              />
            </div>
          </Col>
          <Col size={3}>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                <img
                  src={`${Settings.assetHost}/landing/person-4.png`}
                  title={ t('about.persons.p_title_3') }
                  style={{marginBottom: '-4px'}}
                />
              </div>
              <div className={styles.bage}>{ t('about.persons.p_bage_3') }</div>
              <div className={styles.title}>{ t('about.persons.p_title_3') }</div>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: t('about.persons.p_description_3') }}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Persons;
