import React from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import { toast } from 'react-toastify';
// import * as actions from 'actions';
import { connect } from 'react-redux';
import { uploadImage } from '../../actions';

class ImageUpload extends React.Component {
  constructor() {
    super();

    this.setupReader();

    this.state = {
      selectedFile: undefined,
      imageBase64: '',
      initialImageBase64: '',
      croppedImage: {},
      loading: false,
      status: 'init',
      crop: {},
      image: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  setupReader() {
    this.reader = new FileReader();

    this.reader.addEventListener('load', e => {
      const { initialImageBase64 } = this.state;

      const imageBase64 = e.target.result;

      if (initialImageBase64) {
        this.setState({ imageBase64 });
      } else {
        this.setState({ imageBase64, initialImageBase64: imageBase64 });
      }
    });
  }

  resetToDefaultState(status) {
    this.setState({
      loading: false,
      status,
      selectedFile: undefined,
      croppedImage: {},
      initialImageBase64: '',
      imageBase64: ''
    });
  }

  onChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      this.setState({
        selectedFile,
        initialImageBase64: ''
      });

      this.reader.readAsDataURL(selectedFile);
    }
  }

  onCropChange(crop) {
    this.setState({ crop });
  }

  onImageLoaded(image) {
    if (image.naturalWidth < 950 && image.naturalHeight < 720) {
      this.resetToDefaultState('init');
      toast.error('Minimum width of an image is 950px and height 720px');
      return;
    }

    this.setState({
      crop: makeAspectCrop(
        {
          x: 10,
          y: 10,
          aspect: 4 / 3,
          width: 50
        },
        image.width / image.height
      )
    });
  }

  async onCropCompleted(crop, pixelCrop) {
    const { selectedFile, initialImageBase64 } = this.state;

    if (selectedFile && (pixelCrop.height > 0 && pixelCrop.width > 0)) {
      const img = new Image();
      img.src = initialImageBase64;

      const croppedImage = await getCroppedImg(img, pixelCrop, selectedFile.name);
      this.setState({ croppedImage });

      this.reader.readAsDataURL(croppedImage);
  
    }
  }

  onError(err) {
    this.setState({ loading: false, status: 'fail' });
  }

  onSuccess() {
    const { img } = this.props;

    this.resetToDefaultState('success');
    this.setState({
      image: img
    });
  }

  async uploadImage() {
    const { croppedImage } = this.state;

 
    if (croppedImage) {
      this.setState({ loading: true, status: 'init' });
      try {
        // this.props.uploadImage(this.state.imageBase64);
        this.props.uploadImage(croppedImage);
        await this.onSuccess();
      } catch (err) {
        this.onError(err);
      }
    }
  }

  renderSpinner() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinner" />
        </div>
      );
    }
  }

  renderImageStatus() {
    const { status } = this.state;

    if (status === 'success') {
      return <div className="alert alert-success"> Image Uploaded Succesfuly! </div>;
    }

    if (status === 'fail') {
      return <div className="alert alert-danger"> Image Upload Failed! </div>;
    }
  }

  render() {
    const { selectedFile, imageBase64, crop, initialImageBase64 } = this.state;

    return (
      <div className="img-upload-container">
        <label className="img-upload btn btn-main clickable">
          <span className="upload-text "> Select an image </span>
          <input type="file" accept=".jpg, .png, .jpeg" onChange={this.onChange} />
        </label>

        {selectedFile && (
          <button
            className="btn btn-success btn-upload"
            type="button"
            disabled={!selectedFile}
            onClick={() => this.uploadImage()}
          >
            Upload Image
          </button>
        )}

        {initialImageBase64 && (
          <ReactCrop
            src={initialImageBase64}
            crop={crop}
            onChange={crop => this.onCropChange(crop)}
            onImageLoaded={image => this.onImageLoaded(image)}
            onComplete={(crop, pixelCrop) => this.onCropCompleted(crop, pixelCrop)}
          />
        )}

        {imageBase64 && (
          <div className="img-preview-container">
            <div className="img-preview" style={{ backgroundImage: 'url(' + imageBase64 + ')' }} />

            {this.renderSpinner()}
          </div>
        )}

        {this.renderImageStatus()}
      </div>
    );
  }
}

function getCroppedImg(image, pixelCrop, fileName) {
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      file.name = fileName;
      resolve(file);
    }, 'image/jpeg');
  });
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  img: state.img.data
});

export default connect(
  mapStateToProps,
  { uploadImage }
)(ImageUpload);
