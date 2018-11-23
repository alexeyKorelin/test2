import React from 'react';
import ReadmoreCollapse from 'components/Modules/ReadmoreCollapse';
import styles from './index.sass';

const ReadmoreCollapseList = ({list, ...props}) => (
    <div className={styles.root}>
        {list.map((item, i) => <ReadmoreCollapse className={styles.item} {...item} key={i} />)}
    </div>
);

ReadmoreCollapseList.displayName = 'Modules/ReadmoreCollapseList';

export default ReadmoreCollapseList;
