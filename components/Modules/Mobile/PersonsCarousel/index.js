import { Component } from 'react'
import cx from 'classnames';
import styles from './index.sass';
import Person from './Person';
import { CardsCarousel } from 'components/Modules/Mobile/CardsCarousel';
import { persons } from 'utils/mock';
import { inject, observer } from 'mobx-react'

@inject('locales')
@observer
class PersonsCarousel extends Component {
  render() {
    const { locales: { t }, className } = this.props
    const personsList = persons.map((person, i) => (
      <Person
        key={i}
        i={i}
        {...person}
        description={ t(`landing.person.advs_description_${i}`) }
        title={ t(`landing.person.advs_title_${i}`) }
      />
    ));

    return (
      <CardsCarousel className={cx(styles.root, className)} list={personsList} />
    )
  }
}

export default PersonsCarousel;
