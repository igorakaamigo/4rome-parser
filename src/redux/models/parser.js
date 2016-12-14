export function isParsing(state) {
  return state.parser.busy || false;
}

export function haveUrlsToParse(state) {
  return state.parser.urlCount > 0;
}
