const urlMap = new Map();

function saveUrl(code, originalUrl, expiry) {
  urlMap.set(code, { originalUrl, expiry });
}

function getUrl(code) {
  return urlMap.get(code);
}

function isExpired(expiryTime) {
  return Date.now() > expiryTime;
}

module.exports = { saveUrl, getUrl, isExpired };