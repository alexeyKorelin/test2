import { Component } from 'react'
import cx from 'classnames';
import * as S from './$$';

const textOptions = (step = 1, t) => {
  const options = {
    1: t('createAd.crumbs.whatDoYouSell'),
    2: t('createAd.crumbs.details'),
    3: t('createAd.crumbs.cost')
  }
  return options[step]
}

class StepsCrumbs extends Component {
  render() {
    const { step, status, setStep, t, className, size } = this.props;
    const dummyCondition = status === 'dummy' && step == 2;
    const stepText = textOptions(step, t);

    return (
      <div>
        <Choose>
          <When condition={size === 'sm'}>
            <S.StepsCrumbsSm className={className} step={step} stepText={stepText} status={status} setStep={setStep} t={t} dummyCondition={dummyCondition} />
          </When>
          <Otherwise>
            <S.StepsCrumbsDefault className={className} textOptions={textOptions} t={t} />
          </Otherwise>
        </Choose>
      </div>
    )
  }
}

export default StepsCrumbs;
