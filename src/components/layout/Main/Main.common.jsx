import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import './Main.less';

const propTypes = {
  children: PropTypes.node
};

class MainCommon extends Component {
  render() {
    return (
      <div>
        <Helmet
          htmlAttributes={{ 'lang': 'en' }}
          titleTemplate='%s - 4Рим: Парсер'
          defaultTitle='4Рим: Парсер'
          meta={[
            { 'charset': 'utf-8' },
            { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0' }
          ]}
        />
        {this.props.children}
      </div>
    );
  }
}

MainCommon.propTypes = propTypes;

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MainCommon);
