import {
  PARSER_PROCESSING_STARTED,
  PARSER_PROCESSING_START_FAILED,
  PARSER_PROCESSING_ABORTING,
  PARSER_PROCESSING_STOPPED,
  PARSER_URL_LIST_UPDATE,
  PARSER_URL_LIST_TEXT_UPDATE,

  PARSER_PARSE_TITLE_STATUS_UPDATE,
  PARSER_PARSE_H1_STATUS_UPDATE,
  PARSER_PARSE_KEYWORDS_STATUS_UPDATE,
  PARSER_PARSE_DESCRIPTION_STATUS_UPDATE,
  PARSER_PARSE_CSS_STATUS_UPDATE,

  PARSER_CSS_ALIAS_UPDATE,
  PARSER_CSS_SELECTOR_UPDATE,

  PARSER_RESULT_CLEANUP,
  PARSER_RESULT_ADD
} from 'redux/actions/parserActions';

const initialState = {
  busy: false,
  aborting: false,
  error: null,

  urls: [],
  urlCount: 0,
  urlText: '',

  parseTitle: false,
  parseH1: false,
  parseKeywords: false,
  parseDescription: false,
  parseCSS: false,

  cssAlias: '',
  cssSelector: '',

  responses: [],
  responseCount: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PARSER_PROCESSING_STARTED:
      return Object.assign({}, state, { busy: true });
    case PARSER_PROCESSING_START_FAILED:
      return Object.assign({}, state, { error: action.error });
    case PARSER_PROCESSING_ABORTING:
      return Object.assign({}, state, { aborting: true });
    case PARSER_PROCESSING_STOPPED:
      return Object.assign({}, state, { busy: false, aborting: false });
    case PARSER_URL_LIST_UPDATE:
      return Object.assign({}, state, { urls: action.urls, urlCount: action.urls.length });
    case PARSER_URL_LIST_TEXT_UPDATE:
      return Object.assign({}, state, { urlText: action.text });
    case PARSER_PARSE_TITLE_STATUS_UPDATE:
      return Object.assign({}, state, { parseTitle: action.status });
    case PARSER_PARSE_H1_STATUS_UPDATE:
      return Object.assign({}, state, { parseH1: action.status });
    case PARSER_PARSE_KEYWORDS_STATUS_UPDATE:
      return Object.assign({}, state, { parseKeywords: action.status });
    case PARSER_PARSE_DESCRIPTION_STATUS_UPDATE:
      return Object.assign({}, state, { parseDescription: action.status });
    case PARSER_PARSE_CSS_STATUS_UPDATE:
      return Object.assign({}, state, { parseCSS: action.status });
    case PARSER_CSS_ALIAS_UPDATE:
      return Object.assign({}, state, { cssAlias: action.value });
    case PARSER_CSS_SELECTOR_UPDATE:
      return Object.assign({}, state, { cssSelector: action.value });
    case PARSER_RESULT_CLEANUP:
      return Object.assign({}, state, { responses: [], responseCount: 0 });
    case PARSER_RESULT_ADD:
      return Object.assign({}, state, {
        responses: Array.concat(state.responses, action.value),
        responseCount: state.responseCount + 1
      });
    default:
      return state;
  }
}
