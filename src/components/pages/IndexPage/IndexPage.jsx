import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Table from 'react-bootstrap/lib/Table';
import StartStopButton from 'components/common/StartStopButton';
import UrlList from 'components/common/UrlList';
import ParserOptions from 'components/common/ParserOptions';

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
              <Table
                striped
                bordered
                condensed
                hover
              >
                <thead>
                  <tr>
                    <td>#</td>
                    <th>Ссылка</th>
                    <th>Ответ сервера</th>
                    <th>Title</th>
                    <th>H1</th>
                    <th>Keywords</th>
                    <th>Description</th>
                    <th>CSS</th>
                  </tr>
                </thead>
              </Table>
              <Button bsStyle='primary'>Экспорт в CSV</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default IndexPage;
