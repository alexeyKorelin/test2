import cx from 'classnames';
import styles from './index.sass';

const Col = ({ 
  className, 
  children, 
  size,
  xs, 
  sm, 
  md, 
  indents,
  offset,
  xsOffset,
  smOffset,
  mdOffset
}) =>
  <div 
    className={cx(
      styles.root, 
      className,
      styles[`root_indents_${indents || 10}`],
      {
        [styles[`root_xs_${xs || size}`]]: xs || size,
        [styles[`root_sm_${sm}`]]: sm,
        [styles[`root_md_${md}`]]: md,
        [styles[`root_xs_offset_${xsOffset || offset}`]]: xsOffset || offset,
        [styles[`root_sm_offset_${smOffset}`]]: smOffset,
        [styles[`root_md_offset_${mdOffset}`]]: mdOffset
      }
    )}
  >{children}</div>

Col.displayName = 'Modules/Grid/Col';

export default Col;