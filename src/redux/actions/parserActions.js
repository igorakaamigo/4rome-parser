import { isParsing, haveUrlsToParse } from 'redux/models/parser';

export const PARSER_PROCESSING_STARTED = 'PARSER_PROCESSING_STARTED';
export const PARSER_PROCESSING_START_FAILED = 'PARSER_PROCESSING_START_FAILED';
export const PARSER_PROCESSING_STOPPED = 'PARSER_PROCESSING_STOPPED';

function parserProcessingStarted() {
  return { type: PARSER_PROCESSING_STARTED };
}

function parserProcessingStartFailed(error) {
  return { type: PARSER_PROCESSING_START_FAILED, error };
}

function parserProcessingStopped() {
  return { type: PARSER_PROCESSING_STOPPED };
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
