import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import MainCommon from './Main.common';

const propTypes = {
  children: PropTypes.node
};

class MainProd extends Component {
  render() {
    return (
      <div>
        <Helmet
          base={{ 'target': '_blank', 'href': '//localhost:3002/' }}
        />
        <MainCommon>
          {this.props.children}
        </MainCommon>
      </div>
    );
  }
}

MainProd.propTypes = propTypes;

export default MainProd;
