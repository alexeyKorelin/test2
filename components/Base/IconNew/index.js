import React from 'react'
import cx from 'classnames'
import styles from './index.sass';

export default ({i, size, style, className, ...props}) => {
  const _style = {...style}
  if(size) {
    _style.fontSize = size
  }
  return (
    <i
      className={cx(styles[`icon-${i}`], className)}
      style={_style}
      {...props}
    />
  )
}