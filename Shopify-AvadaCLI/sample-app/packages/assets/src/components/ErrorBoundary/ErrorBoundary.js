/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import NotFound from '@assets/pages/NotFound/NotFound';
import * as PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {eventId: null};
    const {history} = this.props;

    history.listen(() => {
      if (this.state.hasError) {
        this.setState({hasError: false});
      }
    });
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <NotFound />;
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(ErrorBoundary);
