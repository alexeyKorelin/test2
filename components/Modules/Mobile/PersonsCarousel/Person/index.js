import cx from 'classnames';
import styles from './index.sass';
import { retina } from 'utils/utils';

const Person = ({i, className, title, image, description, bage, ...props}) => (
  <div className={cx(styles.root, className)}>
    <style jsx>{`
      .person_${i} {
        background-image: url(${image.file}.${image.type});
      }

      @media ${retina}{
        .person_${i} {
          background-image: url(${image.file}@2x.${image.type});
        }
      }
    `}</style>
    <div className={cx(styles.imageContainer, `person_${i}`)} />
    <div className={styles.title}>{title}</div>
    <div className={styles.description} dangerouslySetInnerHTML={{__html: description }} />
  </div>
)

export default Person;
