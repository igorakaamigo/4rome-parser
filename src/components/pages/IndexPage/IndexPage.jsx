import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Table from 'react-bootstrap/lib/Table';

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
                      <FormGroup>
                        <ControlLabel>URL (32)</ControlLabel>
                        <FormControl componentClass='textarea' rows={20} placeholder='Введите URL, по одному в строке'/>
                      </FormGroup>
                    </Col>
                    <Col
                      lg={4}
                      md={4}
                      sm={4}
                      xs={4}
                    >
                      <FormGroup>
                        <ControlLabel>Опции</ControlLabel>
                        <Checkbox>Title</Checkbox>
                        <Checkbox>H1</Checkbox>
                        <Checkbox>Keywords</Checkbox>
                        <Checkbox>Description</Checkbox>
                      </FormGroup>
                      <FormGroup style={{ paddingRight: '35px' }}>
                        <InputGroup>
                          <InputGroup.Addon>
                            <input type='checkbox' aria-label='...'/>
                          </InputGroup.Addon>
                          <FormControl type='text' placeholder='Алиас'/>
                          <FormControl type='text' placeholder='p#identifier>a.classname:first'/>
                        </InputGroup>
                      </FormGroup>
                      <ProgressBar now={10} style={{ marginRight: '35px' }}/>
                      <Button bsStyle='primary'>Поехали!</Button>
                    </Col>
                  </Row>
                </Grid>
              </Panel>
            </Col>
          </Row>
          <Row className='show-grid'>
            <Col>
              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <td>#</td>
                  <th>Ссылка</th>
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
