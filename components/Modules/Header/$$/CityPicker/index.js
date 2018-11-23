import cx from 'classnames';
import styles from './index.sass';

const CityPicker = props => (
    <button className={cx(styles.root, props.className)}>Санкт-Петербург</button>
)

CityPicker.displayName = 'Modules/Header/CityPicker';

export default CityPicker;
