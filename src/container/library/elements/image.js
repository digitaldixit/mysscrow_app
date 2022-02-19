import React, { Component } from 'react';

class Image extends Component {

  render() {
    const { input, disabled, type, meta } = this.props;
    //console.log("input>>>>>>>>", input.value.dataUrl);

    return (
      <div className="fileUpload btn btn-outline-default p-0">
        {
          input.value.dataUrl
          ?
          <img src={input.value.dataUrl ? input.value.dataUrl : input.value} className="" width='100' height='100' />
          :
          <span><i className="fa fa-camera"></i></span>
        }

        <input type="file"
          name="image"
          className="m-l-20"
          onChange={(e)=> {
            var files = e.target.files;
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onload = function (e) {
              var picFile = e.target;
              files.dataUrl = picFile.result;
              input.onChange(files);
            }
            reader.readAsDataURL(file);
          }}
        />
      </div>
    )
  }
}

export default Image;
/*<Field name="image" component={ image =>{
  var showImage = null;
  if(image.input.value && image.input.value !== ''){
    showImage = (
      <div className="pro-image">
        <img onError={this.addDefaultSrc} src={image.input.value.dataUrl?image.input.value.dataUrl:image.input.value} className='m-l-10' width='100' height='100' />
          <div className="fileUpload btn btn-outline-default">
            <span>Upload Profile Image</span>
            <input type="file"
             name="image"
             className="ml-2"
             onChange={(e)=> {
              var files = e.target.files;
              let reader = new FileReader();
              let file = e.target.files[0];
              reader.onload = function (e) {
                var picFile = e.target;
                files.dataUrl = picFile.result;
                image.input.onChange(files);
              }
            reader.readAsDataURL(file);
          }}/>
      </div>
    </div>
    )
  }
  return (
    <div>
    {
      showImage !== null
      ?
      showImage
      :
      <div className="fileUpload btn btn-outline-default">
        <span>Upload Profile Image</span>
        <input type="file"
         name="image"
         className="m-l-20"
         onChange={(e)=> {
          var files = e.target.files;
          let reader = new FileReader();
          let file = e.target.files[0];
          reader.onload = function (e) {
            var picFile = e.target;
            files.dataUrl = picFile.result;
            image.input.onChange(files);
          }
        reader.readAsDataURL(file);
      }}/> </div>}

  </div>)}
} />*/
