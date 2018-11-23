import styles from './index.sass';

const Container = props => (
  <div className={styles.root}>
    {props.children}
  </div>
);

Container.displayName = 'Modules/Mobile/Container';

export default Container;
