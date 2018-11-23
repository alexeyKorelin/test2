import React from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {Link} from 'routes';

const Button = ({className, href, external, kind, color, block, prefetch, ...props}) => href ? (
  external ? (
    <a 
      href={href}
      className={cx(
        styles.root, 
        className, 
        kind ? styles[kind] : styles.primary, 
        styles[color], 
        {[styles.block]: block}
      )}
      {...props} 
    />
  ) : (
    <Link route={href} prefetch={prefetch}>
      <a 
        className={cx(
          styles.root, 
          className, 
          kind ? styles[kind] : styles.primary, 
          styles[color], 
          {[styles.block]: block}
        )}
        {...props} 
      />
    </Link>    
  )
) : (
  <button 
    className={cx(
      styles.root, 
      className, 
      kind ? styles[kind] : styles.primary, 
      styles[color], 
      {[styles.block]: block}
    )} 
    {...props} 
  />
);

Button.displayName = 'Base/Button';

export default Button;
