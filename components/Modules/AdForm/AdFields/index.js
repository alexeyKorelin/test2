import React, {Component} from 'react';
import { Row, Col } from 'components/Base/Grid';
import Select from 'components/Modules/AdForm/$$/form/Select';
import SelectMobile from 'components/Modules/Mobile/AdForm/Select';
import LanguageSelect from 'components/Modules/AdForm/$$/form/LanguageSelect';
import OwnerSelect from 'components/Modules/AdForm/$$/form/OwnerSelect';
import TextInput from 'components/Modules/AdForm/$$/form/TextInput';
import NumberInput from 'components/Modules/AdForm/$$/form/NumberInput';
import GeoInput from 'components/Modules/AdForm/$$/form/GeoInput';
import Textarea from 'components/Modules/AdForm/$$/form/Textarea';
import FilesUpload from 'components/Modules/AdForm/$$/form/FilesUpload';
import SwitchField from 'components/Modules/AdForm/$$/form/SwitchField';
import Button from 'components/Base/Button';
import styles from './index.sass';
import cx from 'classnames'
import { inject, observer } from 'mobx-react';

@inject('device')
@observer
class SettingsForm extends Component {
  state = {
    imagesLoading: false
  }

  render () {
    const { imagesLoading } = this.state;
    const { form, t, advert, device: { isMobileDevice, size } } = this.props;
    const isMob = isMobileDevice
    const columnsSettings = {
      'mobile': 12,
      'tablet': 6,
      'desktop': 8
    }
    const columns = columnsSettings[size]

    let customFields = [],
      listCustomFields = [],
      checkboxCustomFields = [],
      numericFields = [], geoField;

    form.$('meta').fields.forEach(field => {
      if (field.name != 'description') {
        if (field.extra.type == 'checkbox') {
          checkboxCustomFields.push(field);
        }
        if (field.extra.type == 'list') {
          listCustomFields.push(field);
        }
        if (field.extra.type == 'number' || field.extra.type == 'numeric' || field.extra.type === 'floating') {
          numericFields.push(field);
        }
        if (field.extra.type == 'city' || field.extra.type == 'address') {
          geoField = field;
        }
      }
    });

    return (
      <div className={styles.form}>
        <div className={cx(styles.form__top, isMob ? styles.form__top_mobile : '')}>
          <If condition={!isMob}>
            <LanguageSelect field={form.$('locale')} advert={advert} className={cx(styles.language, isMob ? styles.language_mobile : '')} />
          </If>
          <Row>
            <Col>
              <OwnerSelect form={form} t={t} />
            </Col>
          </Row>
          <Row>
            <Col size={columns}>
              <TextInput
                field={form.$('name')}
                label={form.$('name').label}
                count={70}
                description={isMob ? '' : t('createAd.fields.name.max', { max: 70 })} />
            </Col>
          </Row>
          <Row>
            {listCustomFields.map((field, i) => {
              return (
                <Col size={isMob ? columns : 4} key={i}>
                  <Choose>
                    <When condition={isMob}>
                      <SelectMobile key={i} field={field} />
                    </When>
                    <Otherwise>
                      <Select key={i} field={field} />
                    </Otherwise>
                  </Choose>
                </Col>
              )
            })}
            {numericFields.map((field, i) => {
              return (
                <Col size={isMob ? columns : 4} key={i}>
                  <NumberInput
                    key={i}
                    field={field}
                    label={`${t('createAd.fields.indicate')} ${field.label}`}
                  />
                </Col>
              )
            })}
            <Col size={12}>
              {checkboxCustomFields.map((field, i) => {
                return (
                  <Col size={isMob ? columns : 4} key={i}>
                    <SwitchField
                      field={field}
                      labelClassName={styles.switch_label}
                    />
                  </Col>
                )
              })}
            </Col>
            <Col size={12}>
              <Textarea
                field={form.$('description')}
                label={form.$('description').label}
                count={1000}
                description={t('createAd.fields.description.max', { max: 1000 })}
              />
            </Col>
            { geoField && <Col size={12}>
                <GeoInput
                  field={geoField}
                  placeholder={t('createAd.fields.geo.placeholder')}
                />
              </Col>
            }
          </Row>
          <FilesUpload
            size={isMob ? 'sm' : ''}
            form={form}
            imagesLoadingToggle={this.imagesLoadingToggle}
            label={t('createAd.fields.images.label')}
            required={true}
            t={t} />
        </div>
        <div className={styles.form__bottom}>
          <If condition={!isMob}>
            <div className={styles.notes}>
              <div className={styles.notes__note}>
                <b className={styles.notes__b}>*</b> {t('createAd.fields.required')}
              </div>
            </div>
          </If>
          <Button
            disabled={imagesLoading}
            className={cx(styles.nextButton, isMob ? styles.nextButton_mobile : '')}
            color={'transparent'}
            onClick={this.submitHandler}
          >
            {t('createAd.buttons.goToPrice')}
          </Button>
        </div>
      </div>
    )
  }

  imagesLoadingToggle = (loading) => {
    this.setState({imagesLoading: loading});
  }

  submitHandler = () => {
    const {imagesLoading} = this.state;
    const {nextStep, form} = this.props;
    form.validate({showErrors: true});
    console.log(form.errors());
    if (form.isValid && !imagesLoading) {
      nextStep();
    } else {
      const staticNames = ['name', 'description']
      const erroredNames = staticNames.filter(name => {
        return form.$(name).hasError
      })
      scrollTo(false, erroredNames[0])
      document.querySelector(`[name="${erroredNames[0]}"]`).focus()
    }
  }
}

export default SettingsForm;
