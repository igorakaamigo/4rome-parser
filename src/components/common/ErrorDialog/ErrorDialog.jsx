import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { clearError } from 'redux/actions/parserActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
};

const defaultProps = {
  title: 'Ошибка',
  text: '',
  visible: false
};

class ErrorDialog extends Component {
  handleClose() {
    this.props.dispatch(clearError());
  }

  render() {
    const handler = this.handleClose.bind(this);

    return (
      <Modal show={this.props.visible} onHide={handler}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handler}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ErrorDialog.propTypes = propTypes;
ErrorDialog.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    text: state.parser.error || '',
    visible: (state.parser.error || '').length > 0
  };
}

export default connect(mapStateToProps)(ErrorDialog);
