import cx from 'classnames';
import styles from './index.sass';

const Adv = ({className, title, image, description, ...props}) => (
  <div className={cx(styles.root, className)}>
    <div className={styles.imageContainer}>
      <img className={styles.image} src={image} title={title} />
    </div>
    <div className={styles.title}>{title}</div>
    <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
  </div>  
)

export default Adv;

