import React, { Component, PropTypes } from 'react';
import MainCommon from './Main.common';
import DevTools from 'components/common/DevTools';

const propTypes = {
  children: PropTypes.node
};

class MainDev extends Component {
  render() {
    return (
      <div>
        <MainCommon>
          {this.props.children}
        </MainCommon>
        <DevTools />
      </div>
    );
  }
}

MainDev.propTypes = propTypes;

export default MainDev;
