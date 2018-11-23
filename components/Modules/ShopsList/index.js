import React, {Component} from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import ShopsIsEmpty from 'components/Modules/ShopsIsEmpty';
import Shop from 'components/Modules/Shop';

@inject('shops')
@observer
class ShopsList extends Component {

  render() {
    const { list, className, shops } = this.props;

    return list.length > 0 ? (
      <Row className={cx(styles.root, className)}>
        {list.map((item, i) =>
          <Col
            key={i}
            size={4}
            className={styles.col}
          >
            <Shop shop={item} slice={2} />
          </Col>
        )}
      </Row>
    ) : (
      <ShopsIsEmpty className={styles.shopsIsEmpty} onClick={shops.buildShop} />
    )
  }
}

ShopsList.displayName = 'Screens/ShopsList';

export default ShopsList;