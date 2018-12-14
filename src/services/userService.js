import Boom from 'boom';
import User from '../models/user';
import { validateEmail } from '../utils/validate';

const cryptoHelper = require('../helpers/crypto');
const jwt = require('jsonwebtoken');

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get single user by email or username.
 *
 * @param {Object} data
 * @returns {Boolean}
 */
export async function getUserByEmailOrUsername(data) {
  const user = await new User(data).fetch();
  if (user) {
    return user;
  }
  return false;
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param   {Object}  userData
 * @returns {object}
 */
export async function loginUser(userData) {
  const email = validateEmail(userData.email);
  let user = '';
  if (email) {
    user = await new User({ email: email }).fetch();
  } else {
    user = await new User({ username: userData.email }).fetch();
  }

  if (user) {
    const password = await cryptoHelper.compareString(userData.password, user.attributes.password);
    if (password) {
      const token = jwt.sign({ email: userData.email, id: user.attributes.id }, process.env.SECRET, {
        expiresIn: '1h'
      });
      return { message: 'logged in successfully', token: token };
    }
    throw Boom.unauthorized('Invalid Password');
  }
  throw Boom.unauthorized('Invalid username/email.');
}

/**
 * Login  user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export async function createUser(user) {
  const password = await cryptoHelper.hashString(user.password);

  const getEmail = await this.getUserByEmailOrUsername({ email: user.email });
  const getUsername = await this.getUserByEmailOrUsername({ username: user.username });

  if (getEmail) {
    throw Boom.conflict('Email Already exists');
  }

  if (getUsername) {
    throw Boom.conflict('Username Already exists');
  }

  return new User({ username: user.username, password: password, email: user.email }).save();
}

/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save({ name: user.name });
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
