
import ReadmoreCollapseGroupList from 'components/Modules/ReadmoreCollapseGroupList';
import styles from './index.sass';
import {Container} from 'components/Base/Grid';
import {refPoints} from './content'; // TEMP

const Help = props => {
  return (
    <Container>
        <h1 className={styles.headerTitle}>Справка и помощь</h1>
        <ReadmoreCollapseGroupList list={refPoints} />
        <div className={styles.helpClarify}>Не нашли ответа на свой вопрос? <a className={styles.clarifyHref} href="#">Свяжитесь с нами в Telegram</a></div>
    </Container>
  );
}

export default Help;
