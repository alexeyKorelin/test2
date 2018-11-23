import cx from 'classnames';
import styles from './index.sass';
import {inject, observer} from 'mobx-react';
import Dropdown from '../Dropdown';
import {tToArray} from 'utils/utils';

const Documents = inject('locales')(observer(({className, children, locales: {t}, position, kind, ...props}) =>
  <Dropdown className={cx(styles.root, className)} position={position} kind={kind} label={t(`ico.documents.title`)}>
    <ul className={cx(styles.ul, styles[`ul_${position || 'left'}`])}>
      <For each='item' index='i' of={tToArray(t('ico.documents.items', {returnObjects: true}))}>
        <li key={i} className={styles.li}>
          <a className={styles.link} href={item.href} target='_blank'>{item.title}</a>
        </li>
      </For>      
    </ul>
  </Dropdown>
))

export default Documents;
