import cx from 'classnames';
import { Component } from 'react'
import { Row, Col } from 'components/Base/Grid';
import IconNew from 'components/Base/IconNew';
import styles from './index.sass';
import _sortBy from 'lodash/sortBy';
import FormCollapse from 'components/Base/FormCollapse'
import { inject, observer } from 'mobx-react'

@inject('device')
@observer
class Categories extends Component {
  render() {
    const { device: { isMobileDevice }} = this.props
    const { props } = this
    return (
      <Choose>
        <When condition={isMobileDevice}>
        <div className={cx(styles.root, props.className)}>
          <Row className={styles.row}>
            {_sortBy(props.list, 'name').map((category, i) => (
              <Col key={i} className={styles.col_mobile}>
                <FormCollapse
                  key={category.name}
                  className={styles.collapse}
                  title={category.name}
                  icon={category.slug}
                >
                  {category.children && (
                    <div className={styles.subcategories_mobile}>
                      {_sortBy(category.children, 'name').map((subcategory, i) => (
                        <button key={i} className={styles.subcategory_mobile} onClick={() => {props.setCategory(subcategory.slug)}}>
                          {subcategory.name}
                        </button>
                      ))}
                    </div>
                  )}
                </FormCollapse>
              </Col>
            ))}
          </Row>
        </div>
        </When>
        <Otherwise>
          <div className={cx(styles.root, props.className)}>
            <h1 className={styles.h1}>{props.title}</h1>
            <Row className={styles.row}>
              {_sortBy(props.list, 'name').map((category, i) => (
                <Col key={i} className={styles.col}>
                  <div className={styles.flipper}>
                    <div
                      className={styles.category}
                    >
                      <IconNew i={category.slug} size={86} />
                      <div className={styles.title}>{category.name}</div>
                    </div>
                    {category.children && (
                      <div className={styles.subcategories}>
                        <div className={styles.subcategories_inner}>
                          <div className={styles.subcategories_icon}>
                            <IconNew i={category.slug} size={40} />
                            {category.name}
                          </div>
                          <If condition={category.children.length > 0}>
                            <div className={styles.subcategories__list}>
                              {_sortBy(category.children, 'name').map((subcategory, i) => (
                                <button key={i} className={styles.subcategory} onClick={() => {props.setCategory(subcategory.slug)}}>
                                  • {subcategory.name}
                                </button>
                              ))}
                            </div>
                          </If>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Otherwise>
      </Choose>
    )
  }
}

export default Categories;
