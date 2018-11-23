import React from 'react';
import cx from 'classnames';
import styles from './index.sass';

const RoundIndicator = ({className, value, title, ...props}) => {
  const r = 99;
  const l = Math.PI*(r*2);

  return (
    <div className={cx(styles.root, className)} {...props}>
      <svg className={styles.circle} width='220' height='220' viewBox='0 0 220 220' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle 
          r={r} 
          cx='110' 
          cy='110'
          stroke='url(#indicator-stroke-fill-2)'
          opacity='0.319293'
          strokeWidth='12'
          strokeDashoffset='0'
        />
        <circle 
          r={r} 
          cx='110' 
          cy='110'
          stroke='url(#indicator-stroke-fill-1)'
          strokeWidth='12'
          strokeLinecap='round'
          strokeDashoffset={l - value / 100 * l}
          strokeDasharray={l}
        />         
        <circle 
          r={r - 6} 
          strokeWidth='0'
          cx='110' 
          cy='110'
          fill='url(#indicator-fill)'
        />
        <defs>
          <linearGradient id='indicator-stroke-fill-1' x1='-27.3473' y1='142.745' x2='22' y2='142.745' gradientUnits='userSpaceOnUse'>
            <stop stopColor='#8D00FF'/>
            <stop offset='1' stopColor='#F37DCB'/>
          </linearGradient>
          <linearGradient id='indicator-stroke-fill-2' x1='-8.50465' y1='-99.0822' x2='-8.50465' y2='239.416' gradientUnits='userSpaceOnUse'>
            <stop stopColor='#950AFA'/>
            <stop offset='1' stopColor='#270240'/>
          </linearGradient>
          <linearGradient id='indicator-fill' x1='-199.561' y1='19.3842' x2='-199.561' y2='618.898' gradientUnits='userSpaceOnUse'>
            <stop stopColor='#8D00FF'/>
            <stop offset='1' stopColor='#F37DCB'/>
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.content}>
        <div className={styles.value}>{value} %</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  )
}

export default RoundIndicator;