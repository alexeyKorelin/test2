import React, {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import Icon from 'components/Base/Icon'
import Dropdown from 'components/Base/Dropdown'

@inject('locales')
@observer
class Language extends Component {
  render() {
    const {ad, userAdverts, status, className, locales} = this.props;
    const { t, languages } = locales;

    return (
      <div className={cx(styles.root, className)}>
        <span className={styles.title}>{t(`ad.language.title`)}</span>
        <Dropdown
          className={styles.dropdown}
          icon={`flag-${ad.locale}`}
          color={'dark'}
          oldIcon
          caretDown
          oldIconParams={{height: 22, width: 22}}
        >
          <For 
            each='language' 
            of={ languages.filter(language => language != ad.locale) }
          >
            <Choose>
              <When condition={userAdverts && status.slug == 'active' && ad.versions.find(version => version.locale == language) === undefined}>         
                <button key={language} onClick={() => ad.translate(language)}>
                  <Icon icon={`flag-${language}`} width={16} style={{marginBottom: '-5px', marginRight: '5px'}} />
                  <span className={styles.langName}>{ t(`ad.publicateEn`) }</span>
                </button>
              </When>
              <When 
                condition={
                  ad.versions.find(version => 
                    version.locale == language && (
                      version.status == 'active' || 
                      userAdverts
                    )
                  )
                }
              >        
                <button key={language} onClick={() => ad.goVersion(language)}>
                  <Icon icon={`flag-${language}`} width={16} style={{marginBottom: '-5px', marginRight: '5px'}} />
                  <span className={styles.langName}>{ t(`header.languages.${language}.fullname`) }</span>
                </button>
              </When>
            </Choose>
          </For>
        </Dropdown>
      </div>
    )
  }
};

Language.displayName = 'Screens/Ad/Language';

export default Language;
