import React, { Component, PropTypes } from 'react';
import MainCommon from './Main.common';

const propTypes = {
  children: PropTypes.node
};

class MainProd extends Component {
  render() {
    return (
      <MainCommon>
        {this.props.children}
      </MainCommon>
    );
  }
}

MainProd.propTypes = propTypes;

export default MainProd;
