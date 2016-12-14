export function isParsing(state) {
  return state.parser.busy || false;
}

export function haveUrlsToParse() {
  return true;
}
