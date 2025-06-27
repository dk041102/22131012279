const { nanoid } = require('nanoid');

function generateShortCode(length = 6) {
  return nanoid(length); // Generates alphanumeric code
}

module.exports = generateShortCode;