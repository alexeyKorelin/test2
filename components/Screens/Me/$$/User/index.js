import React, {Component} from 'react';
import cx from 'classnames';
import Status from 'components/Base/User/Status';
import Textarea from 'components/Base/Form/Textarea';
import Avatar from 'components/Modules/Avatar';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import IconNew from 'components/Base/IconNew';
import Dropdown from 'components/Base/Dropdown';
import Checkbox from 'components/Base/Checkbox';
import moment from 'moment';

@inject('locales')
@observer
class User extends Component {
  state = {
    editing: false,
    description: this.props.user.description,
    hidden: this.props.user.hidden
  }

  handleEdit = e => {
    if (this.state.editing) {
      this.props.user.updateInfo({
        description: this.state.description,
        hidden: this.state.hidden
      })
    }
    this.setState({editing: !this.state.editing});
  }

  render() {
    const {user, active, locales: { t }} = this.props;
    const {editing, description, hidden} = this.state;

    return (
      <div className={cx(styles.root, this.props.className, user.active ? '' : styles.root_inactive)}>
        <Status className={styles.status} active={active} />
        <div className={styles.dropdown}>
          <If condition={!editing}>
            <Dropdown icon={'gear'} color={'dark'}>
              <a onClick={this.handleEdit}>{ t('profile.edit') }</a>
            </Dropdown>
          </If>
          <If condition={editing}>
            <button className={styles.action} onClick={this.handleEdit}>{ t('profile.save') }</button>
          </If>
        </div>
        <div className={styles.imageContainer}>
          <Avatar owner={user} size={70} />
        </div>
        <a href={user.tg} className={styles.telegram}>@{user.username}</a>
        <div className={styles.name}>{user.fullname}</div>
        <Choose>
          <When condition={!editing}>
            <div className={styles.since}>{ t('profile.registered') }: {moment(user.since).format('DD.MM.YYYY')}</div>
            <div className={styles.description}>{description}</div>
            <If condition={!hidden}>
              <div className={styles.visible}>
                <IconNew i={'eye'} size={10} />
                { t('profile.visible') }
              </div>
            </If>
            <If condition={hidden}>
              <div className={styles.visible}>
                <IconNew i={'mask'} size={10} />
                { t('profile.invisible') }
              </div>
            </If>
          </When>
          <When condition={editing}>
            <Textarea
              description={ t('profile.maxSymbols') }
              description_center
              value={description}
              kind={'user'}
              rows={2}
              count={70}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
            <Checkbox
              label={ t('profile.hideFromNonAuthed') }
              className={cx(styles.checkbox)}
              labelClassName={cx(styles.checkbox__label)}
              value={hidden}
              checked={hidden}
              onChange={(e) => this.setState({ hidden: !hidden })}
            />
          </When>
        </Choose>
      </div>
    )
  }
}

export default User;
