import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.sass'
import Icon from 'components/Base/Icon'
import Dropdown from 'components/Base/Dropdown'

@inject('locales')
@observer
class Language extends Component {

  render() {
    const oldIconParams = {
      height: 22,
      width: 22,
    }
    const { locales, className, whiteIcon } = this.props;
    const { t, locale, languages } = locales;

    return (
      <Dropdown
        icon={`flag-${locale}`}
        color={'dark'}
        oldIcon
        caretDown
        oldIconParams={oldIconParams}
        whiteIcon={whiteIcon}
        className={className}
      >
        <div className={styles.languages}>
          <For each='language' of={ languages }>
            <div key={language} className={styles.flagRow} onClick={this.changeLanguage(language)}>
              <Icon icon={`flag-${language}`} height={22} width={22} />
              <div className={styles.langName}>{ t(`header.languages.${language}.fullname`) }</div>
            </div>
          </For>
        </div>
      </Dropdown>
    )
  }

  changeLanguage = (lang) => () => {
    this.props.locales.changeLanguage(lang)
  }
}

export default Language
