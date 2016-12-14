import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import StartStopButton from 'components/common/StartStopButton';
import UrlList from 'components/common/UrlList';
import ParserOptions from 'components/common/ParserOptions';
import ResultTable from 'components/common/ResultTable';

import { Link } from 'react-router';

class IndexPage extends Component {
  render() {
    return (
      <div>
        <Helmet
          title='Главная страница'
        />
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Четвёртый Рим: парсер</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row className='show-grid'>
            <Col>
              <Panel>
                <Grid>
                  <Row>
                    <Col
                      lg={8}
                      md={8}
                      sm={8}
                      xs={8}
                    >
                      <UrlList/>
                    </Col>
                    <Col
                      lg={4}
                      md={4}
                      sm={4}
                      xs={4}
                    >
                      <ParserOptions/>
                      <StartStopButton/>
                      <ProgressBar
                        now={35}
                        label='10 / 1000'
                        bsStyle='danger'
                        style={{ marginRight: '35px', marginTop: '15px' }}
                      />
                    </Col>
                  </Row>
                </Grid>
              </Panel>
            </Col>
          </Row>
          <Row className='show-grid'>
            <Col>
              <ResultTable/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default IndexPage;
