import cx from 'classnames';
import styles from './index.sass';
import * as S from './$$';

const SubcategoryPicker = props => (
  <div className={cx(styles.root, props.className)}>
    <S.Categories
      title={props.title}
      list={props.categories}
      setCategory={props.setCategory}
    />
  </div>
);

export default SubcategoryPicker;
