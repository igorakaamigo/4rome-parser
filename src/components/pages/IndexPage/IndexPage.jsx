import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';
import { Link } from 'react-router';

class IndexPage extends Component {
  render() {
    return (
      <div>
        <Helmet
          title='Главная страница'
        />
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Четвёртый Рим: парсер</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default IndexPage;
