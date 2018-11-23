import { Component } from 'react'
import * as S from './$$';
import ChannelBanner from 'components/Modules/Mobile/ChannelBanner';
import ReadmoreCollapse from 'components/Modules/ReadmoreCollapse';
import styles from './index.sass';
import { aboutPage as data } from 'utils/mock';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class MobileAbout extends Component {
  render() {
    const { locales: { t }} = this.props
    return (
      <div>
        <h1 className={styles.h1}>{ t('about.startText.service') }</h1>
        <ReadmoreCollapse
          size={'sm'}
          className={styles.what}
          title={ t('about.startText.mobile.title') }
          description={ t('about.startText.mobile.description') }
        />
        <S.Persons className={styles.persons} />
        <S.Advantages className={styles.advantages} />
        <S.Works />
        <ChannelBanner className={styles.channelBanner} />
      </div>
    );
  }
}

MobileAbout.displayName = 'Screens/Mobile/About';

export default MobileAbout;
