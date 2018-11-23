import { Component } from 'react';
import cx from 'classnames';
import Button from 'components/Base/Button';
import Icon from 'components/Base/Icon';
import styles from './index.sass';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class ChannelBanner extends Component {
  render() {
    const { locales: { t }, className } = this.props
    return (
      <div className={cx(styles.root, className)}>
        <h1 className={styles.title}>{ t('banner.title') }</h1>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: t('banner.description') }} />
        <Button
          className={styles.button}
          kind={'primary'}
          href={'tg://resolve?domain=mentalmarket'}
          target="_blank"
          external={true}
          block={true}
        >
          <span style={{marginRight: '8px'}}>{ t('banner.subscribe') }</span>
          <Icon
            className={styles.tgLogo}
            tgLogoColor={styles.tgLogoColor}
            style={{marginBottom: '-4px'}}
            icon="tg-logo"
            width={18}
          />
        </Button>
      </div>
    );
  }
}

ChannelBanner.displayName = 'Modules/Mobile/ChannelBanner';

export default ChannelBanner;
