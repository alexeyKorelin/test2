import React, {Component} from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import styles from './index.sass';
import BigStepsCrumbs from 'components/Modules/AdForm/BigStepsCrumbs';
import StepsCrumbs from 'components/Modules/AdForm/StepsCrumbs';
import LanguageSelect from 'components/Modules/AdForm/$$/form/LanguageSelect';
import AdPrices from 'components/Modules/AdForm/AdPrices';
import AdFields from 'components/Modules/AdForm/AdFields';
import SuccessPopup from 'components/Modules/AdForm/SuccessPopup';
import DraftPopup from 'components/Modules/AdForm/DraftPopup';
import validatorjs from 'validatorjs';
import { buildFormFields, prepareApiData} from './$$/form';
import MobxReactForm from 'mobx-react-form';
import { observe } from 'mobx';
import API from 'utils/api';
import {locationQuery} from 'utils';

@inject('categories')
@inject('auth')
@inject('locales')
@inject('device')
@observer
class AdForm extends Component {

  constructor(props) {
    super(props);
    this.form = this.buildForm(props);
    this.state = {
      step: props.step || 2,
      status: null,
      title: props.advert.name,
      isOpen: false,
      error: null
    };
    observe(this.form.$('name'), '$value', (change) => {this.setState({title: change.newValue})});
    observe(this.form.$('locale'), '$value', this.updateForm);
  }

  render() {
    const { advert, locales: {t}, device: { isMobileDevice, size } } = this.props;
    const { form } = this;
    const { step, title, status } = this.state;
    const formProps = {
      nextStep: this.nextStep,
      submit: this.submit,
      saved: advert.name,
      fields: advert.fields,
      form,
      t
    };

    return (
      <div className={styles.root}>
        <Choose>
          <When condition={isMobileDevice}>
            <div className={styles.header}>
              <StepsCrumbs setStep={this.setStep} step={step} t={t} status={advert.status} size={'sm'} />
              <If condition={step == 2}>
                <div className={cx(styles.langContainer, { [styles.langContainer_tablet]: size === 'tablet' })}>
                  <LanguageSelect field={form.$('locale')} advert={advert} />
                </div>
              </If>
            </div>
          </When>
          <Otherwise>
            <BigStepsCrumbs setStep={this.setStep} advert={advert} step={step} title={title} t={t} />
          </Otherwise>
        </Choose>
        {step == 2 && <AdFields {...formProps} advert={advert} />}
        {step == 3 && <AdPrices {...formProps} />}
        <SuccessPopup status={status} advert={advert} t={t} size={ isMobileDevice ? 'sm-fullsize' : null }/>
        <DraftPopup isOpen={this.state.isOpen} onClose={this.toggle} error={this.state.error} />
      </div>
    );
  }

  componentDidMount () {
    const query = locationQuery();
    if (query.step == 'prices') this.setStep(3);
  }

  updateForm = (change) => {
    const { advert, locales } = this.props;
    advert.applyMetaChanges(this.form.$('meta').values());
    advert.applyChanges(this.form.values());
    this.form = this.buildForm({advert: advert, locales: locales});
    this.forceUpdate();
    observe(this.form.$('name'), '$value', (change) => {this.setState({title: change.newValue})});
    observe(this.form.$('locale'), '$value', this.updateForm);
  }

  nextStep = () => {
    this.setState({step: this.state.step + 1});
  }

  buildForm = (props) => {
    const formFields = buildFormFields(props.advert, props.locales || []);
    const plugins = { dvr: validatorjs };
    const options = { validateOnInit: false };
    return new MobxReactForm({ fields: formFields }, { plugins, options });
  }

  submit = () => {
    const { advert, auth: {user} } = this.props;
    const { form } = this;
    const body = prepareApiData(form);
    API.adverts.update(advert.uid, body)
      .then(advert => {
        this.setState({status: advert.status});
        user.updateAdvert(advert);
      })
      .catch(res => {
        if (res.errors && res.errors.content) {
          this.setState({isOpen: true, error: res.errors.content[0]})
        }
      })
  }

  setStep = (step) => {
    this.setState({step: step});
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
}

AdForm.displayName = 'Modules/AdForm';

export default AdForm;
