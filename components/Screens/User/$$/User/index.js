import * as U from 'components/Base/Utilities';
import cx from 'classnames';
import Button from 'components/Base/Button';
import Status from 'components/Base/User/Status';
import styles from './index.sass';

const User = props => {
  const user = props.user;

  return (
    <div className={cx(styles.root, props.className, user.active ? styles.root_active : styles.root_inactive)}>
      <div className={styles.top}>
        <U.PullLeft>
          <Status active={user.active} />
        </U.PullLeft>
      </div>
      <div className={styles.imageContainer}>
        {user.avatar && <img className={styles.image} src={user.avatar} title={user.username} />}
      </div>
      <div className={styles.name}>{user.username}</div>
      {user.since && <div className={styles.date}>На сайте с {user.since}</div>}
      <div className={styles.description}>{user.description}</div>
      <Button 
        href={user.tg} 
        className={styles.button} 
        kind={'primary'} 
        block={true}
      >Связаться</Button>
    </div>
  );
};

export default User;
