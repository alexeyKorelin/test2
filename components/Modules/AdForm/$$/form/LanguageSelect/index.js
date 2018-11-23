import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.sass'
import Icon from 'components/Base/Icon'
import Dropdown from 'components/Base/Dropdown'

@inject('locales')
@observer
class LanguageSelect extends Component {

  render() {
    const oldIconParams = {
      height: 22,
      width: 22,
    }
    const { locales: { t }, className, field, advert } = this.props
    const { values } = field.extra;
    
    return (
      <div ref={this.setDropdownRef} className={className} onClick={this.toggle}>
        <If condition={advert.versions.length > 1}>
          <div className={styles.disabledLocaleChoose}>
            {t('createAd.fields.locale')}
            <Icon icon={`flag-${field.value}`} {...oldIconParams} />
          </div>
        </If>
        <If condition={!advert.versions.find(v => v.locale != advert.locale) || !advert.versions.find(v => v.locale == advert.locale)}>
          <Dropdown
            icon={`flag-${field.value}`}
            label={t('createAd.fields.locale')}
            color={'dark'}
            oldIcon
            caretDown
            oldIconParams={oldIconParams}
          >
            <div className={styles.languages}>
              <For each='value' of={values}>
                <div key={value} className={styles.flagRow} onClick={this.changeLanguage(value)}>
                  <Icon icon={`flag-${value}`} height={22} width={22} />
                  <div className={styles.langName}>{ t(`header.languages.${value}.fullname`) }</div>
                </div>
              </For>
            </div>
          </Dropdown>
        </If>
      </div>
    )
  }

  changeLanguage = (lang) => () => {
    this.props.locales.changeLanguage(lang);
    this.props.field.set(lang);
  }
}

export default LanguageSelect