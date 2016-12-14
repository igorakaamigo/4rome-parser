import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
  showTitle: PropTypes.bool.isRequired,
  showH1: PropTypes.bool.isRequired,
  showKeywords: PropTypes.bool.isRequired,
  showDescription: PropTypes.bool.isRequired,
  showCSS: PropTypes.bool.isRequired,
  cssAlias: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};

const defaultProps = {
  isBusy: false,
  showTitle: false,
  showH1: false,
  showKeywords: false,
  showDescription: false,
  showCSS: false,
  cssAlias: '',
  items: []
};

class ResultTable extends Component {
  render() {
    return (
      <div>
        <Button disabled={this.props.isBusy} bsStyle='primary'>Экспорт таблицы в CSV</Button>
        <p>&nbsp;</p>
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
              {this.props.showTitle && (
                <th>Title</th>
              )}
              {this.props.showH1 && (
                <th>H1</th>
              )}
              {this.props.showKeywords && (
                <th>Keywords</th>
              )}
              {this.props.showDescription && (
                <th>Description</th>
              )}
              {this.props.showCSS && (
                <th>{this.props.cssAlias}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.url}</td>
                <td>{item.status}</td>
                {this.props.showTitle && (
                  <td>{item.title}</td>
                )}
                {this.props.showH1 && (
                  <td>{item.h1}</td>
                )}
                {this.props.showKeywords && (
                  <td>{item.keywords}</td>
                )}
                {this.props.showDescription && (
                  <td>{item.description}</td>
                )}
                {this.props.showCSS && (
                  <td>{item.css}</td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

ResultTable.propTypes = propTypes;
ResultTable.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    isBusy: state.parser.busy,
    showTitle: state.parser.parseTitle,
    showH1: state.parser.parseH1,
    showKeywords: state.parser.parseKeywords,
    showDescription: state.parser.parseDescription,
    showCSS: state.parser.parseCSS,
    cssAlias: state.parser.cssAlias,
    items: state.parser.responses
  };
}

export default connect(mapStateToProps)(ResultTable);
