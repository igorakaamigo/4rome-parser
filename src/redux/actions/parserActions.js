import { isParsing, haveUrlsToParse } from 'redux/models/parser';

export const PARSER_PROCESSING_STARTED = 'PARSER_PROCESSING_STARTED';
export const PARSER_PROCESSING_START_FAILED = 'PARSER_PROCESSING_START_FAILED';
export const PARSER_PROCESSING_STOPPED = 'PARSER_PROCESSING_STOPPED';

export const PARSER_URL_LIST_UPDATE = 'PARSER_URL_LIST_UPDATE';
export const PARSER_URL_LIST_TEXT_UPDATE = 'PARSER_URL_LIST_TEXT_UPDATE';

function parserProcessingStarted() {
  return { type: PARSER_PROCESSING_STARTED };
}

function parserProcessingStartFailed(error) {
  return { type: PARSER_PROCESSING_START_FAILED, error };
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

export function startProcessing() {
  return (dispatch, getState) => {
    const state = getState();

    if (isParsing(state)) {
      dispatch(parserProcessingStartFailed('Процесс уже запущен'));
    } else if (haveUrlsToParse(state)) {
      dispatch(parserProcessingStarted());
    } else {
      dispatch(parserProcessingStartFailed('Список URL пуст'));
    }
  };
}

export function stopProcessing() {
  return (dispatch, getState) => {
    const state = getState();

    if (isParsing(state)) {
      dispatch(parserProcessingStopped());
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
