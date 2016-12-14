import React, { Component } from 'react';
import Helmet from 'react-helmet';

class IndexPage extends Component {
  render() {
    return (
      <div>
        <Helmet
          title='Главная страница'
        />
        <p>Это главная страница</p>
      </div>
    );
  }
}

export default IndexPage;
