function makeUrlSafe(text) {
  return encodeURIComponent(text);
}

function normalizeKey(storedKey) {
  return decodeURIComponent(storedKey);
}

module.exports = {
  normalizeKey,
  makeUrlSafe,
};
