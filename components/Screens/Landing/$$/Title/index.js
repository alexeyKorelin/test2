import cx from 'classnames';
import styles from './index.sass';

const Title = ({ title, subtitle, description, ...props }) => {
  return (
    <div className={cx(styles.root, props.className)}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}

export default Title;
