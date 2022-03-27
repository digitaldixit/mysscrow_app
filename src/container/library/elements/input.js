import React, { Component } from 'react';
//import { Field, reduxForm } from 'redux-form';

class Input extends Component {

  render() {
    //console.log("input props found>>>>>>>>>", this.props);
    const { input, icon, label, is_label, isRequired, type, meta } = this.props;
    var reqClassName = '';
    if(isRequired){
      var reqClassName = 'required';
    }

    var inputLabel = '';
    if(is_label) {
      inputLabel = <label className={"control-label "+reqClassName}>{label}</label>;
    }
 
    if(type == "checkbox"){
      return (
        <div className="checkbox">
          <label>
            <input {...input} type={type} /> {label}
          </label>
          {meta.touched && ((meta.error && <div className="error">{meta.error}</div>) || (meta.warning && <div className="error">{meta.warning}</div>))}
        </div>
      )
    }
    if(icon){
      return (
        <>
          {inputLabel}
          <div className="input-group">
            <span className="input-group-text"><i className={icon}></i></span>
            <input {...input} placeholder={label} type={type} className="form-control" />
          </div>
          {meta.touched && ((meta.error && <span className="error">{meta.error}</span>) || (meta.warning && <span className="error">{meta.warning}</span>))}
        </>
      )
    } else {
      return (
        <>
          {inputLabel}
          <input {...input} placeholder={label} type={type} className="form-control"/>
          {meta.touched && ((meta.error && <span className="error">{meta.error}</span>) || (meta.warning && <span className="error">{meta.warning}</span>))}
        </>
      )
    }
  }
}

export default Input;
