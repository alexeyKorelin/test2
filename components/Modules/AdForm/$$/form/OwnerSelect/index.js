import React, {Component} from 'react';
import RadioButton from 'components/Base/RadioButton';
import styles from './index.sass';
import cx from 'classnames'
import { inject, observer } from 'mobx-react';

@inject('auth')
@observer
class OwnerSelect extends Component {

  setUser = (e) => {
    const {form} = this.props;
    const {value} = e.target;
    
    form.$('owner_id').set(value)
    form.$('owner_type').set('User')
  }

  setShop = (e) => {
    const {form} = this.props;
    const {value} = e.target;

    form.$('owner_id').set(value)
    form.$('owner_type').set('Shop')
  }

  render () {
    const {form, t, auth: { user } } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.info}>
          <span className={cx(styles.title_required)}>
            {t('createAd.fields.owner')} *
          </span>
        </div>
        <div className={styles.control}>
          <RadioButton
            className={styles.label}
            label={`пользователя ${user.username}`}
            value=''
            checked={form.$('owner_type').value == 'User' ? true : false}
            onChange={this.setUser}
          />
          <For each='shop' of={user.shops}>
            <RadioButton
              key={shop.id}
              className={styles.label}
              label={`магазина «${shop.name}»`}
              value={shop.id}
              checked={form.$('owner_type').value == 'Shop' ? form.$('owner_id').value == shop.id : false}
              onChange={this.setShop}
            />
          </For>
        </div>
      </div>
    )
  }
}

export default OwnerSelect;