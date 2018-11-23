import cx from 'classnames';
import styles from './index.sass';

const StepsCrumbsDefault = ({className, textOptions, t}) => (
  <div className={cx(styles.root, className)}>
    <span className={cx(styles.a, styles.a_active)}>{textOptions(1, t)}</span>
    <i className={styles.divider}>></i>
    <span className={styles.a}>{textOptions(2, t)}</span>
    <i className={styles.divider}>></i>
    <span className={styles.a}>{textOptions(3, t)}</span>
  </div>
)

StepsCrumbsDefault.displayName = 'Modules/AdForm/$$/StepsCrumbsDefault';

export default StepsCrumbsDefault;
