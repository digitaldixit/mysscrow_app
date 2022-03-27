import React, { Component } from 'react';
import { connect } from 'react-redux';
import {EE} from './emitter';
import * as actions from './modal_action';
import Modal from './modal';

class ReduxModal extends Component {
  componentDidMount() {
    EE.on('add/modal', obj => this.props.addModal(obj));
    EE.on('clear/all', this.props.clearAll);
  }

  componentWillUnmount() {
    EE.off('add/modal');
    EE.off('clear/all');
  }

  render() {
    const { modals } = this.props;
    return (
      <div className="react-redux-modal">
        <div className="rr-modals">
          {modals.map((modal, i) => {
            return (
              <Modal
                index={i}
                key={modal.id}
                removeModal={this.props.removeModal}
                {...modal}/>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modals: state.modals.modals
  }
}

export default connect(mapStateToProps, actions)(ReduxModal);
