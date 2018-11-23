import React, {Component} from 'react';
import styles from './index.sass';
import SubcategoryPicker from 'components/Modules/AdForm/SubcategoryPicker';
import StepsCrumbs from 'components/Modules/AdForm/StepsCrumbs';
import {Container} from 'components/Base/Grid';
import {Router} from 'routes';
import { inject, observer } from 'mobx-react';

@inject('categories')
@inject('advertForm')
@inject('locales')
@observer

class NewAd extends Component {
  state = {
    step: 1
  }

  render () {
    const { step } = this.state
    const { locales: {t}, categories: {categories} } = this.props;

    return (
      <Container className={styles.root}>
        <StepsCrumbs t={t} step={step}/>
        <SubcategoryPicker
          title={t('createAd.categoryTitle')}
          categories={categories}
          setCategory={this.setCategory}
        />
      </Container>
    )
  }

  setCategory = (slug) => {
    const {advertForm} = this.props;
    advertForm.create({category: slug})
      .then(advert => {
        Router.pushRoute(advert.editUrl)
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export default NewAd;
