import {
  PARSER_PROCESSING_STARTED,
  PARSER_PROCESSING_START_FAILED,
  PARSER_PROCESSING_STOPPED
} from 'redux/actions/parserActions';

const initialState = {
  busy: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PARSER_PROCESSING_STARTED:
      return Object.assign({}, state, { busy: true });
    case PARSER_PROCESSING_START_FAILED:
      return Object.assign({}, state, { error: action.error });
    case PARSER_PROCESSING_STOPPED:
      return Object.assign({}, state, { busy: false });
    default:
      return state;
  }
}
