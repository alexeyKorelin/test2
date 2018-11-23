import cx from 'classnames';
import styles from './index.sass';
import Icon from 'components/Base/Icon';

const StepsCrumbsSm = ({className, step, stepText, status, setStep, t, dummyCondition}) => (
  <div className={cx(styles.root, className)}>
    <div className={styles.digits}>
      <div className={cx(
        styles.a,
        {
          [styles.a_active]: step === 1,
          [styles.a_checked]: step > 1
        }
      )}>
        <If condition={step > 1}>
          <Icon icon={'checkbox'} height={6} />
        </If>
        <If condition={step === 1}>
          1
        </If>
      </div>
      <div className={cx(
        styles.a,
        {
          [styles.a_active]: step === 2,
          [styles.a_checked]: step > 2,
        }
      )}>
        <If condition={step > 2}>
          <Icon icon={'checkbox'} height={6} />
        </If>
        <If condition={step <= 2}>
          2
        </If>
      </div>
      <div className={cx(
        styles.a,
        {
          [styles.a_active]: step === 3
        })}>3</div>
    </div>
    <Choose>
      <When condition={dummyCondition}>
        <a href='/new_ad' className={styles.link}>
          <Icon className={styles.leftIcon} icon={'dark-arrow-left'} width={12} />
          <div className={styles.text}>{stepText}</div>
        </a>
      </When>
      <When condition={step == 3}>
        <div onClick={() => setStep(2)} className={styles.link}>
          <Icon className={styles.leftIcon} icon={'dark-arrow-left'} width={12} />
          <div className={styles.text}>{stepText}</div>
        </div>
      </When>
      <Otherwise>
        <div className={styles.text}>{stepText}</div>
      </Otherwise>
    </Choose>
  </div>
)

StepsCrumbsSm.displayName = 'Modules/AdForm/$$/StepsCrumbsSm';

export default StepsCrumbsSm;
