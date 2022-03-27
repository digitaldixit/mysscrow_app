import React, {Component} from 'react';

class Modal extends Component {

  handleOnOutsideClick(e) {
    if ((this.props.options.closeOnOutsideClick && !this.isChildOf(e.target, this.refs.modalContent)) || false) {
      this.props.removeModal(this.props.id);
    }
  }

  isChildOf(child, parent) {
    if (child.parentNode === parent) {
      return true;
    } else if (child.parentNode === null) {
      return false;
    } else {
      return this.isChildOf(child.parentNode, parent);
    }
  }

  render() {
    var modalClass = 'medium';
    if(this.props.options.size !== undefined && this.props.options.size){
      modalClass = this.props.options.size;
    }
    var zindex = '999'+this.props.index;
    return (
      <div className="rrm-holder" style={{zIndex: zindex}}>
        <div className="scroll" onClick={this.handleOnOutsideClick.bind(this)}>

          <div ref="modalContent" className={'rrm-content m-'+modalClass}>
            {this.props.options.hideTitleBar ? null :
                <div className="rrm-title">
                  <h2>{this.props.options.title}</h2>
                  <div className="rr-title-actions">
                    {this.props.options.hideCloseButton ? null :
                        <button
                            type="button"
                            className="rr-close rrm-icon-cancel"
                            onClick={this.props.removeModal.bind(this, this.props.id)}>X</button>
                    }
                  </div>
                </div>
            }

            <div className="rrm-body">
              <this.props.component {...this.props.options} removeModal={() => this.props.removeModal(this.props.id)}/>
            </div>
          </div>

        </div>

        <div className="rrm-shadow" />
      </div>
    );
  }
}

export default Modal;
