import styles from './index.sass';
import cx from 'classnames';
import Icon from 'components/Base/Icon';
import { Row, Col } from 'components/Base/Grid';
import Loader from 'components/Base/Loader';

const FileUploadDefault = ({
  className, 
  inputId,
  field, 
  label, 
  description, 
  count, 
  required, 
  errorMessage, 
  loading, 
  images,
  openUploadDialog,
  onFilesChange,
  deleteImage,
  formats,
  t
}) => (
  <div
    className={cx(
      styles.root,
      className,
      {[styles.root_error]: field.error}
    )}
  >
    {(label || description || count) &&
      <div className={styles.info}>
        {label &&
          <span
            className={cx(
              styles.title,
              {[styles.title_required]: required}
            )}
          >{label}{required && ' *'}</span>
        }
        {errorMessage &&
          <span className={cx(styles.description, styles.description_error)}>{errorMessage}</span>
        }
      </div>
    }
    <Row className={styles.control}>
      <Col size={8}>
        <div className={styles.filesArea}>
          <If condition={images.length > 0 || loading}>
            <Row className={styles.photos}>
              {images.map(image => {
                return (
                  <Col key={`image-${image.id}`} size={'1-5'} className={styles.photos__col}>
                    <div className={styles.photo}>
                      <div className={styles.photo__image} style={{backgroundImage: `url(${image.thumb})`}} />
                      <button className={styles.photo__remove} onClick={() => {deleteImage(image.id)}}>
                        <Icon className={styles.photo__removeIcon} icon={'rounded-cross'} width={9} />
                      </button>
                    </div>
                  </Col>
                )
              })}
              <If condition={loading}>
                <Col size={'1-5'} className={styles.photos__col}>
                  <div className={styles.photo}>
                    <div className={styles.photo__image}>
                      <Loader />
                    </div>
                  </div>
                </Col>
              </If>
              <If condition={(images.length < 5 && !loading) || (loading && images.length != 4)}>
                <button onClick={openUploadDialog} className={styles.plus}>
                  <Icon icon={'plus'} width={12} />
                </button>
              </If>
            </Row>
          </If>
          <If condition={(!images.length && !loading)}>
            <div className={styles.emptyMessage}>
              <span dangerouslySetInnerHTML={{ __html: t('createAd.fields.images.dragAndDrop') }} />
              <button onClick={openUploadDialog} className={styles.selectFromPc}>{t('createAd.fields.images.selectOnComputer')}</button>
            </div>
          </If>
        </div>
      </Col>
      <Col size={4} className={styles.info}>
        <If condition={images.length > 0}>
          <span className={styles.putPhoto}><span dangerouslySetInnerHTML={{ __html: t('createAd.fields.images.put')}} /> <button onClick={openUploadDialog} className={cx(styles.selectFromPc, styles.selectFromPc_small)}>{t('createAd.fields.images.selectOnComputer')}</button><br /></span>
        </If>
        <span dangerouslySetInnerHTML={{ __html: t('createAd.fields.images.info', { formats: formats }) }} />
      </Col>
      <input hidden multiple type="file" id={inputId} accept={formats} onChange={onFilesChange} />
    </Row>
  </div>
);

export default FileUploadDefault;
