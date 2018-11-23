import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';
import { inject, observer } from 'mobx-react';

const Options = inject('locales')(observer(({ ad, className, size, locales: {t} }) => {
  const fieldTypes = ['list', 'number', 'floating', 'checkbox']
  const fields = ad.fields.filter(f => fieldTypes.includes(f.type) && ad.meta[f.slug])
  const col_size = size || 12
  const filteredFields = fields.filter((field) => field.type != 'checkbox');

  return fields && fields.length ? (
    <div className={cx(className)}>
      {filteredFields.map((field, index) => {
        const { name, type, slug, measure } = field;
        let value;
        if (type == 'list') {
          const key = `fields.${ad.subcategory.slug}.${slug}_values.${ad.meta[slug]}`;
          value = t(key);
        } else {
          value = `${ad.meta[slug]} ${field.measure}`;
        };

        if (value) {
          return (
            <span key={slug} className={styles.option}>
              <span className={styles.title}>{name}</span>&nbsp;
              <span className={styles.value}>{value}</span>
              {(filteredFields.length != index + 1) && <span className={styles.divider}>•</span>}
            </span>
          )
        }
      }).filter(option => !!option)}
    </div>
  ) : (
    null
  )
}))

Options.displayName = 'Modules/Ad/Options';

export default Options;
