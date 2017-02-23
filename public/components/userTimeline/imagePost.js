import React from 'react';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      description: ''
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  _handleInputChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with the ->>>> this.state.file
    console.log('handle uploading-', this.state.file);
    console.log('description is - ', this.state.description);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={(e)=>this._handleImageChange(e)}
          />
          <label>
            Description:
            <input
              type="text"
              value={this.state.description}
              onChange={this._handleInputChange}
            />
          </label>
          <button
            className="submitButton"
            type="submit"
            onClick={(e)=>this._handleSubmit(e)}>Post Status
          </button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
