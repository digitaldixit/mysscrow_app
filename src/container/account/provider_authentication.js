
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class ProviderAuthentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticate_provider) {
        this.context.router.push('/provider_signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticate_provider) {
        this.context.router.push('/provider_signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticate_provider: state.account.authenticate_provider };
  }

  return connect(mapStateToProps)(ProviderAuthentication);
}
