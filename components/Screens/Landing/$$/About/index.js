import * as S1 from '../';
import * as S2 from './$$';
import cx from 'classnames';
import styles from './index.sass';
import { Row, Col } from 'components/Base/Grid';

const About = props => {
  const { id } = props
  return (
    <S1.Container id={id}>
      <Row>
        <Col size={4}>
          <S2.Info className={styles.info} />
        </Col>
        <Col size={8}>
          <S2.Advs className={styles.advs} />
        </Col>
      </Row>
    </S1.Container>
  )
}

export default About;
