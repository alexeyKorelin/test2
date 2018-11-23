import cx from 'classnames';
import styles from './index.sass';

export const TabControls = ({children, className, ...props}) => (
  <div className={cx(styles.tabControls, className)} {...props}>{children}</div>
)

export const TabControl = ({children, className, activeClassName, active, onClick, ...props}) => (
  <button 
    className={cx(
      styles.tabControl,
      className,
      {[styles.tabControl_active]: active},
      {[activeClassName]: active}
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
)

export const Tabs = ({children, className, ...props}) => (
  <div className={cx(styles.tabs, className)} {...props}>{children}</div>
)

export const Tab = ({children, className, active, innerHtml, ...props}) => innerHtml ? (
  <div
    className={cx(
      styles.tab,
      className,
      {[styles.tab_active]: active}
    )}
    dangerouslySetInnerHTML={{ __html: innerHtml }}
    {...props}
  />
) : (
  <div
    className={cx(
      styles.tab,
      className,
      {[styles.tab_active]: active}
    )}
    {...props}
  >
    {children}
  </div>  
)