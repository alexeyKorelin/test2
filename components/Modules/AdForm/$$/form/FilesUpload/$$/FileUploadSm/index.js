import styles from './index.sass';
import cx from 'classnames';
import Icon from 'components/Base/Icon';
import { Row, Col } from 'components/Base/Grid';
import Loader from 'components/Base/Loader';

const FileUploadSm = ({
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
      {description &&
        <span className={styles.description}>{description}</span>
      }
      {errorMessage &&
        <span className={cx(styles.description, styles.description_error)}>{errorMessage}</span>
      }
    </div>
  }

  <Row className={styles.control}>
    <Col size={12}>
      <div className={styles.filesArea}>
        <If condition={images.length > 0 || loading}>
          <Row className={styles.photos}>
            {images.map(image => {
              return (
                <Col key={`image-${image.id}`} size={'1-5'} className={styles.photos__col}>
                  <div className={styles.photo}>
                    <img src={image.thumb} className={styles.photo__image} />
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
              <Col size={'1-5'} className={styles.photos__col}>
                <button onClick={openUploadDialog} className={styles.plus}>
                  <Icon icon={'plus'} width={12} />
                </button>
              </Col>
            </If>
          </Row>
        </If>
        <If condition={(!images.length && !loading)}>
          <div className={styles.emptyMessage}>
            <button onClick={openUploadDialog} className={styles.selectFromPc}>
              <Icon icon={'plus'} width={12} />
            </button>
          </div>
        </If>
      </div>
      <input hidden multiple type="file" id={inputId} accept={formats} onChange={onFilesChange}/>
    </Col>
  </Row>
</div>
);

export default FileUploadSm;
