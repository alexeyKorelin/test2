import React, { Component } from 'react';
import {observer} from 'mobx-react';
import API from 'utils/api'
import * as S from './$$';
import {imageAcceptFormats} from 'utils/const'

@observer
class FilesUpload extends Component {

  state = {
    inputId: 'js-upload-input',
    uploads: [],
    loading: false
  }

  render() {
    const {className, form, t, size, description, count} = this.props;
    const {loading, inputId} = this.state;
    const field = form.$('images');
    const images = field.value;
    const label = field.label || this.props.label;
    const errorMessage = !field.isValid && field.error;
    const required = field.extra.required;

    return(
      <Choose>
        <When condition={size == 'sm'}>
          <S.FileUploadSm 
            className={className}
            inputId={inputId}
            field={field} 
            label={label} 
            description={description} 
            count={count} 
            required={required}
            errorMessage={errorMessage} 
            loading={loading} 
            images={images}
            openUploadDialog={this.openUploadDialog}
            onFilesChange={this.onFilesChange}
            deleteImage={this.deleteImage}
            formats={imageAcceptFormats}
            t={t}
          />
        </When>
        <Otherwise>
          <S.FileUploadDefault 
            className={className}
            inputId={inputId}
            field={field} 
            label={label} 
            description={description} 
            count={count} 
            required={required}
            errorMessage={errorMessage} 
            loading={loading} 
            images={images}
            openUploadDialog={this.openUploadDialog}
            onFilesChange={this.onFilesChange}
            deleteImage={this.deleteImage}
            formats={imageAcceptFormats}
            t={t}
          />
        </Otherwise>
      </Choose>
    )
  }

  openUploadDialog = () => {
    const elem = document.getElementById(this.state.inputId);
    if (elem) elem.click();
  }

  onFilesChange = (e) => {
    let {uploads} = this.state;
    const {form, imagesLoadingToggle} = this.props;
    const field = form.$('images');
    
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (field.value && field.value.length >= 5) continue;
      if (file.size > 10000000) continue;
      const fd = new FormData();
      fd.append('file', file);
      let fileKey = file.size + file.name + Date.now();
      uploads.push({fileKey: fileKey, loaded: false});
      imagesLoadingToggle(true);
      this.setState({uploads: uploads, loading: true});
      API.adverts.uploadImage(form.$('uid').value, fd)
        .then(image => {
          let loading = true;
          uploads = this.state.uploads;
          uploads[uploads.findIndex(upload => upload.fileKey == fileKey)] = {fileKey: fileKey, loaded: true};
          if (uploads.find(upload => !upload.loaded) === undefined) {
            imagesLoadingToggle(false);
            loading = false;
          };
          field.set(field.value.concat(image));
          field.validate({showErrors: true});
          this.setState({uploads: uploads, loading: loading});
        })
    }
  }

  deleteImage = (imageId) => {
    const {form} = this.props;
    const field = form.$('images');
    API.adverts.deleteImage(form.$('uid').value, imageId)
      .then(res => {
        const newValue = field.value.filter(i => i.id != imageId);
        field.set(newValue);
        field.validate({showErrors: true})
      })
  }
};

export default FilesUpload;
