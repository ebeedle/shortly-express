const crypto = require('crypto');

/************************************************************/
// Add any hashing utility functions below
/************************************************************/
module.exports = function(password) {
  let shasum = crypto.createHash('sha256');
    shasum.update(password);
    return shasum.digest('hex');
}
// https://nodejs.org/api/crypto.html#crypto_class_hash