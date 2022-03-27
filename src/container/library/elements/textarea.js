import React, { Component } from 'react';

class textarea extends Component {


  render() {
    const { input, icon, label, is_label, type, meta } = this.props;
    var inputLabel = '';
    if(is_label) {
      inputLabel = <label>{label}</label>;
    }
    return (
      <div>
        {inputLabel}
        <textarea {...input} placeholder={!is_label ? label : null } className="form-control" rows="5" />
        {meta.touched && ((meta.error && <span className="error">{meta.error}</span>) || (meta.warning && <span className="error">{meta.warning}</span>))}
      </div>
    )
  }
}

export default textarea;
