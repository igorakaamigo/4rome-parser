import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import { setText } from 'redux/actions/parserActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isBusy: PropTypes.bool.isRequired,
  urlCount: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  urls: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired
};

const defaultProps = {
  title: 'URL',
  placeholder: 'Введите URL, по одному в строке',
  isBusy: false,
  urlCount: 0,
  rowCount: 20,
  urls: [],
  text: ''
};

class UrlList extends Component {
  handleChange(event) {
    this.props.dispatch(setText(event.target.value));
  }

  handleBlur() {
    this.props.dispatch(setText(this.props.urls.join('\n')));
  }

  render() {
    return (
      <FormGroup>
        <ControlLabel>{this.props.title} ({this.props.urlCount})</ControlLabel>
        <FormControl
          componentClass='textarea'
          rows={this.props.rowCount}
          placeholder={this.props.placeholder}
          disabled={this.props.isBusy}
          onChange={this.handleChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          value={this.props.text}
        />
      </FormGroup>
    );
  }
}

UrlList.propTypes = propTypes;
UrlList.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    isBusy: state.parser.busy,
    urls: state.parser.urls,
    urlCount: state.parser.urlCount,
    text: state.parser.urlText
  };
}

export default connect(mapStateToProps)(UrlList);
