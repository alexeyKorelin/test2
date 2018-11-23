import styles from './index.sass';

const PullLeft = ({children}) => <div className={styles.root}>{children}</div>;

PullLeft.displayName = 'Base/Utilities/PullLeft';

export default PullLeft;