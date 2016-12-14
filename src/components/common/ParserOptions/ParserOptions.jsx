import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import {
  setParseTitleValue,
  setParseH1Value,
  setParseKeywordsValue,
  setParseDescriptionValue,
  setParseCSSValue,
  setCSSAlias,
  setCSSSelector
} from 'redux/actions/parserActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  parseTitle: PropTypes.bool.isRequired,
  parseH1: PropTypes.bool.isRequired,
  parseKeywords: PropTypes.bool.isRequired,
  parseDescription: PropTypes.bool.isRequired,
  parseCSS: PropTypes.bool.isRequired,
  cssAlias: PropTypes.string.isRequired,
  cssSelector: PropTypes.string.isRequired,
  isBusy: PropTypes.bool.isRequired
};

const defaultProps = {
  isBusy: false,
  parseTitle: false,
  parseH1: false,
  parseKeywords: false,
  parseDescription: false,
  parseCSS: false,
  cssAlias: '',
  cssSelector: ''
};

class ParserOptions extends Component {
  handleParseTitle(event) {
    this.props.dispatch(setParseTitleValue(event.target.checked));
  }

  handleParseH1(event) {
    this.props.dispatch(setParseH1Value(event.target.checked));
  }

  handleParseKeywords(event) {
    this.props.dispatch(setParseKeywordsValue(event.target.checked));
  }

  handleParseDescription(event) {
    this.props.dispatch(setParseDescriptionValue(event.target.checked));
  }

  handleParseCSS(event) {
    this.props.dispatch(setParseCSSValue(event.target.checked));
  }

  handleCSSAlias(event) {
    this.props.dispatch(setCSSAlias(event.target.value));
  }

  handleCSSSelector(event) {
    this.props.dispatch(setCSSSelector(event.target.value));
  }

  render() {
    return (
      <div>
        <FormGroup>
          <ControlLabel>Опции</ControlLabel>
          <Checkbox
            onChange={this.handleParseTitle.bind(this)}
            checked={this.props.parseTitle}
            disabled={this.props.isBusy}
          >
            Title
          </Checkbox>
          <Checkbox
            onChange={this.handleParseH1.bind(this)}
            checked={this.props.parseH1}
            disabled={this.props.isBusy}
          >
            H1
          </Checkbox>
          <Checkbox
            onChange={this.handleParseKeywords.bind(this)}
            checked={this.props.parseKeywords}
            disabled={this.props.isBusy}
          >
            Keywords
          </Checkbox>
          <Checkbox
            onChange={this.handleParseDescription.bind(this)}
            checked={this.props.parseDescription}
            disabled={this.props.isBusy}
          >
            Description
          </Checkbox>
        </FormGroup>
        <FormGroup style={{ paddingRight: '35px' }}>
          <InputGroup>
            <InputGroup.Addon>
              <input
                onChange={this.handleParseCSS.bind(this)}
                checked={this.props.parseCSS}
                disabled={this.props.isBusy}
                type='checkbox'
                aria-label='...'
              />
            </InputGroup.Addon>
            <FormControl
              onChange={this.handleCSSAlias.bind(this)}
              disabled={this.props.isBusy || !this.props.parseCSS}
              type='text'
              placeholder='Алиас'
              value={this.props.cssAlias}
            />
            <FormControl
              onChange={this.handleCSSSelector.bind(this)}
              disabled={this.props.isBusy || !this.props.parseCSS}
              type='text'
              placeholder='p#identifier>a.classname:first'
              value={this.props.cssSelector}
            />
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}

ParserOptions.propTypes = propTypes;
ParserOptions.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    parseTitle: state.parser.parseTitle,
    parseH1: state.parser.parseH1,
    parseKeywords: state.parser.parseKeywords,
    parseDescription: state.parser.parseDescription,
    parseCSS: state.parser.parseCSS,
    cssAlias: state.parser.cssAlias,
    cssSelector: state.parser.cssSelector,
    isBusy: state.parser.busy
  };
}

export default connect(mapStateToProps)(ParserOptions);
