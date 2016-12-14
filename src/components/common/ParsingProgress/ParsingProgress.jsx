import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  now: PropTypes.number.isRequired
};

const defaultProps = {
  isBusy: false,
  current: 0,
  total: 0,
  now: 0
};

class ParsingProgress extends Component {
  render() {
    return (
      <div>
        {this.props.isBusy && (
          <ProgressBar
            now={this.props.now}
            label={`${this.props.current} / ${this.props.total}`}
            bsStyle='danger'
            style={{ marginRight: '35px', marginTop: '15px' }}
          />
        )}
      </div>
    );
  }
}

ParsingProgress.propTypes = propTypes;
ParsingProgress.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    isBusy: state.parser.busy,
    current: state.parser.responseCount,
    total: state.parser.urlCount,
    now: state.parser.current / (state.parser.total > 0 ? state.parser.total : 1)
  };
}

export default connect(mapStateToProps)(ParsingProgress);
