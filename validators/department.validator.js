const { body } = require('express-validator');

const department_id = body('department_id').isInt({ min: 1 }).withMessage('Department ID must be a valid integer');

const title = body('title')
  .notEmpty()
  .withMessage('Title cannot be empty')
  .isString()
  .withMessage('Title must be a valid string')
  .isLength({ min: 3 })
  .withMessage('Title must be at least 3 characters long')
  .isLength({ max: 50 })
  .withMessage('Title must be at most 50 characters long');

const description = body('description').optional();

const is_active = body('is_active').isBoolean().withMessage('Active status must be a boolean value').toBoolean();

const insert = [title, description, is_active];

const update = [department_id, title, description, is_active];

module.exports = {
  department_id,
  title,
  description,
  is_active,
  insert,
  update,
};
