import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';

const Line = ({className, gray}) => (
  <svg className={cx(styles.root, className)} width='3' viewBox='0 0 3 200' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M1.25 1V200' stroke={gray ? '#DCDCDC' : 'url(#ico-line-gradient-1)'} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' strokeDasharray='2 5' />
    <defs>
      <linearGradient id='ico-line-gradient-1' x1='1.119' y1='71.385' x2='1.119' y2='-31.092' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#8D00FF' />
        <stop offset='1' stopColor='#F37DCB' />
      </linearGradient>
    </defs>
  </svg>
)

export default Line;
