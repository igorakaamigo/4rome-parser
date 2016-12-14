import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import MainCommon from './Main.common';
import DevTools from 'components/common/DevTools';

const propTypes = {
  children: PropTypes.node
};

class MainDev extends Component {
  render() {
    return (
      <div>
        <Helmet
          base={{ 'target': '_blank', 'href': '//localhost:3002/' }}
        />
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
