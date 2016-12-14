import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import { startProcessing, stopProcessing } from 'redux/actions/parserActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  idleTitle: PropTypes.string.isRequired,
  busyTitle: PropTypes.string.isRequired,
  idleStyle: PropTypes.string.isRequired,
  busyStyle: PropTypes.string.isRequired,
  isBusy: PropTypes.bool.isRequired
};

const defaultProps = {
  idleTitle: 'Запустить',
  busyTitle: 'Остановить',
  idleStyle: 'primary',
  busyStyle: 'danger',
  isBusy: false
};

class StartStopButton extends Component {
  handleClick() {
    if (this.props.isBusy) {
      this.props.dispatch(stopProcessing());
    } else {
      this.props.dispatch(startProcessing());
    }
  }

  render() {
    const style = this.props.isBusy ? this.props.busyStyle : this.props.idleStyle;
    const title = this.props.isBusy ? this.props.busyTitle : this.props.idleTitle;

    return (
      <Button bsStyle={style} onClick={this.handleClick.bind(this)}>{title}</Button>
    );
  }
}

StartStopButton.propTypes = propTypes;
StartStopButton.defaultProps = defaultProps;

function mapStateToProps(state) {
  return { isBusy: state.parser.busy };
}

export default connect(mapStateToProps)(StartStopButton);
