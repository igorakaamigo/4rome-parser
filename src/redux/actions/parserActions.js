import { isParsing, haveUrlsToParse } from 'redux/models/parser';
import fetch from 'isomorphic-fetch';

export const PARSER_PROCESSING_STARTED = 'PARSER_PROCESSING_STARTED';
export const PARSER_PROCESSING_START_FAILED = 'PARSER_PROCESSING_START_FAILED';
export const PARSER_PROCESSING_ABORTING = 'PARSER_PROCESSING_ABORTING';
export const PARSER_PROCESSING_STOPPED = 'PARSER_PROCESSING_STOPPED';

export const PARSER_URL_LIST_UPDATE = 'PARSER_URL_LIST_UPDATE';
export const PARSER_URL_LIST_TEXT_UPDATE = 'PARSER_URL_LIST_TEXT_UPDATE';

export const PARSER_PARSE_TITLE_STATUS_UPDATE = 'PARSER_PARSE_TITLE_STATUS_UPDATE';
export const PARSER_PARSE_H1_STATUS_UPDATE = 'PARSER_PARSE_H1_STATUS_UPDATE';
export const PARSER_PARSE_KEYWORDS_STATUS_UPDATE = 'PARSER_PARSE_KEYWORDS_STATUS_UPDATE';
export const PARSER_PARSE_DESCRIPTION_STATUS_UPDATE = 'PARSER_PARSE_DESCRIPTION_STATUS_UPDATE';
export const PARSER_PARSE_CSS_STATUS_UPDATE = 'PARSER_PARSE_CSS_STATUS_UPDATE';

export const PARSER_CSS_ALIAS_UPDATE = 'PARSER_CSS_ALIAS_UPDATE';
export const PARSER_CSS_SELECTOR_UPDATE = 'PARSER_CSS_SELECTOR_UPDATE';

export const PARSER_RESULT_CLEANUP = 'PARSER_RESULT_CLEANUP';
export const PARSER_RESULT_ADD = 'PARSER_RESULT_ADD';

export const PARSER_PROCESSING_FAILURE = 'PARSER_PROCESSING_FAILURE';

export const PARSER_CLEAR_ERROR = 'PARSER_CLEAR_ERROR';

function parserProcessingStarted() {
  return { type: PARSER_PROCESSING_STARTED };
}

function parserProcessingStartFailed(error) {
  return { type: PARSER_PROCESSING_START_FAILED, error };
}

function parserProcessingAborting() {
  return { type: PARSER_PROCESSING_ABORTING };
}

function parserProcessingStopped() {
  return { type: PARSER_PROCESSING_STOPPED };
}

function parserUrlListUpdate(urls) {
  return { type: PARSER_URL_LIST_UPDATE, urls };
}

function parserUrlListTextUpdate(text) {
  return { type: PARSER_URL_LIST_TEXT_UPDATE, text };
}

function parserParseTitleStatusUpdate(status) {
  return { type: PARSER_PARSE_TITLE_STATUS_UPDATE, status };
}

function parserParseH1StatusUpdate(status) {
  return { type: PARSER_PARSE_H1_STATUS_UPDATE, status };
}

function parserParseKeywordsStatusUpdate(status) {
  return { type: PARSER_PARSE_KEYWORDS_STATUS_UPDATE, status };
}

function parserParseDescriptionStatusUpdate(status) {
  return { type: PARSER_PARSE_DESCRIPTION_STATUS_UPDATE, status };
}

function parserParseCSSStatusUpdate(status) {
  return { type: PARSER_PARSE_CSS_STATUS_UPDATE, status };
}

function parserCSSAliasUpdate(value) {
  return { type: PARSER_CSS_ALIAS_UPDATE, value };
}

function parserCSSSelectorUpdate(value) {
  return { type: PARSER_CSS_SELECTOR_UPDATE, value };
}

function parserResultCleanup() {
  return { type: PARSER_RESULT_CLEANUP };
}

function parserResultAdd(value) {
  return { type: PARSER_RESULT_ADD, value };
}

function proceedWithUrls(dispatch, getState) {
  const state = getState();
  const position = state.parser.responseCount;
  const PART_SIZE = 10;
  const part = state.parser.urls.slice(position, position + PART_SIZE);

  if (part.length > 0 && !state.parser.aborting) {
    fetch(
      '/fetch',
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          urls: part,
          title: state.parser.parseTitle,
          h1: state.parser.parseH1,
          keywords: state.parser.parseKeywords,
          description: state.parser.parseDescription,
          css: state.parser.parseCSS,
          selector: state.parser.cssSelector
        })
      })
      .then(response => response.json())
      .then((json) => {
        json.map(item => dispatch(addResponse(item)));
        proceedWithUrls(dispatch, getState);
      })
      .catch((error) => {
        dispatch(parserProcessingFailure(error.message));
      });
  } else {
    dispatch(parserProcessingStopped());
  }
}

function parserProcessingFailure(error) {
  return { type: PARSER_PROCESSING_FAILURE, error };
}

function parserClearError() {
  return { type: PARSER_CLEAR_ERROR };
}

export function startProcessing() {
  return (dispatch, getState) => {
    const state = getState();

    if (isParsing(state)) {
      dispatch(parserProcessingStartFailed('Процесс уже запущен'));
    } else if (haveUrlsToParse(state)) {
      dispatch(clearResponses());
      dispatch(parserProcessingStarted());

      proceedWithUrls(dispatch, getState);
    } else {
      dispatch(parserProcessingStartFailed('Список URL пуст'));
    }
  };
}

export function abortProcessing() {
  return (dispatch, getState) => {
    const state = getState();

    if (isParsing(state)) {
      dispatch(parserProcessingAborting());
    } else {
      dispatch(parserProcessingStartFailed('Процесс не запущен'));
    }
  };
}

export function setUrls(urls) {
  return (dispatch) => {
    dispatch(parserUrlListUpdate(urls));
  };
}

export function setText(text) {
  return (dispatch) => {
    const values = text
      .split(/[\n]/)
      .map((s) => s.replace(/(^\s+)|(\s+$)/g, ''))
      .filter((s) => s.length > 0);

    dispatch(parserUrlListUpdate(values));
    dispatch(parserUrlListTextUpdate(text));
  };
}

export function setParseTitleValue(value) {
  return (dispatch) => {
    dispatch(parserParseTitleStatusUpdate(value));
  };
}

export function setParseH1Value(value) {
  return (dispatch) => {
    dispatch(parserParseH1StatusUpdate(value));
  };
}

export function setParseKeywordsValue(value) {
  return (dispatch) => {
    dispatch(parserParseKeywordsStatusUpdate(value));
  };
}

export function setParseDescriptionValue(value) {
  return (dispatch) => {
    dispatch(parserParseDescriptionStatusUpdate(value));
  };
}

export function setParseCSSValue(value) {
  return (dispatch) => {
    dispatch(parserParseCSSStatusUpdate(value));
  };
}

export function setCSSAlias(value) {
  return (dispatch) => {
    dispatch(parserCSSAliasUpdate(value));
  };
}

export function setCSSSelector(value) {
  return (dispatch) => {
    dispatch(parserCSSSelectorUpdate(value));
  };
}

export function clearResponses() {
  return (dispatch) => {
    dispatch(parserResultCleanup());
  };
}

export function addResponse(value) {
  return (dispatch) => {
    dispatch(parserResultAdd(value));
  };
}

export function clearError() {
  return (dispatch) => {
    dispatch(parserClearError());
  };
}
