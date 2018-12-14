import Joi from 'joi';

import { validate, validateEmail, validateLoginUser } from '../utils/validate';
import * as userService from '../services/userService';

const SCHEMA = {
  username: Joi.string()
    .label('Name')
    .max(90)
    .required(),
  password: Joi.string()
    .label('Password')
    .max(90)
    .required(),
  email: Joi.string()
    .label('Email')
    .max(90)
    .required()
};

const LOGIN_SCHEMA = {
  password: Joi.string()
    .label('Password')
    .max(90)
    .required(),
  email: Joi.string()
    .label('Email')
    .max(90)
    .required()
};

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userLoginValidator(req, res, next) {
  console.log(req.body);
  return validateLoginUser(req.body, LOGIN_SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findUser(req, res, next) {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findUser, userValidator, userLoginValidator };
