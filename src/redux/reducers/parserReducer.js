import {
  PARSER_PROCESSING_STARTED,
  PARSER_PROCESSING_START_FAILED,
  PARSER_PROCESSING_STOPPED,
  PARSER_URL_LIST_UPDATE,
  PARSER_URL_LIST_TEXT_UPDATE
} from 'redux/actions/parserActions';

const initialState = {
  busy: false,
  error: null,
  urls: [],
  urlCount: 0,
  urlText: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PARSER_PROCESSING_STARTED:
      return Object.assign({}, state, { busy: true });
    case PARSER_PROCESSING_START_FAILED:
      return Object.assign({}, state, { error: action.error });
    case PARSER_PROCESSING_STOPPED:
      return Object.assign({}, state, { busy: false });
    case PARSER_URL_LIST_UPDATE:
      return Object.assign({}, state, { urls: action.urls, urlCount: action.urls.length });
    case PARSER_URL_LIST_TEXT_UPDATE:
      return Object.assign({}, state, { urlText: action.text });
    default:
      return state;
  }
}
