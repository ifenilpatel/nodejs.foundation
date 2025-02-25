var CryptoJS = require('crypto-js');

function encrypt(text) {
  var ciphertext = CryptoJS.AES.encrypt(text, process.env.ENCRYPTION_SECRET_KEY).toString();
  return ciphertext;
}

function decrypt(ciphertext) {
  var bytes = CryptoJS.AES.decrypt(ciphertext, process.env.ENCRYPTION_SECRET_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

// Encrypt text for use in a URL
function encryptForURL(text) {
  var ciphertext = CryptoJS.AES.encrypt(text, process.env.ENCRYPTION_SECRET_KEY).toString();
  // Encode to URL-safe Base64
  var urlSafeCiphertext = encodeURIComponent(ciphertext);
  return urlSafeCiphertext;
}

// Decrypt text from a URL-safe format
function decryptFromURL(urlSafeCiphertext) {
  // Decode from URL-safe Base64
  var ciphertext = decodeURIComponent(urlSafeCiphertext);
  var bytes = CryptoJS.AES.decrypt(ciphertext, process.env.ENCRYPTION_SECRET_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

module.exports = {
  encrypt,
  decrypt,
  encryptForURL,
  decryptFromURL,
};
