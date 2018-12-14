const bcrypt = require('bcrypt');

/**
 * This function uses bcrypt to hash string.
 * Mostly used for passwords.
 *
 * @param {String} str
 */
const hashString = async str => {
  return bcrypt.hash(str, 10);
};

const compareString = async (str, hash) => {
  return bcrypt.compare(str, hash);
};

module.exports = {
  hashString,
  compareString
};
