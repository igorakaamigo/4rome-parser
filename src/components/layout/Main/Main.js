if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Main.prod');
} else {
  module.exports = require('./Main.dev');
}
