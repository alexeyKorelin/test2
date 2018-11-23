import React from 'react';
import ReadmoreCollapse from 'components/Modules/ReadmoreCollapse';;
import {chunk} from 'lodash';
import styles from './index.sass';

const ReadmoreCollapseGroupList = ({list, ...props}) => (
    <div className={styles.root}>
        {list.map((group, i) => (
            <div className={styles.group} key={i}>
                <div className={styles.title}>{group.title}</div>
                {group.list.map((item, j) => (
                    <ReadmoreCollapse className={styles.item} {...item} key={j} />
                ))}
            </div>
        ))}
    </div>
);

ReadmoreCollapseGroupList.displayName = 'Modules/ReadmoreCollapseGroupList';

export default ReadmoreCollapseGroupList;
