import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { TaskStatus } from '../models/Task';

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title cannot exceed 100 characters',
    'any.required': 'Title is required',
  }),
  description: Joi.string().min(1).max(500).required().messages({
    'string.empty': 'Description cannot be empty',
    'string.min': 'Description must be at least 1 character long',
    'string.max': 'Description cannot exceed 500 characters',
    'any.required': 'Description is required',
  }),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .optional(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100).optional().messages({
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title cannot exceed 100 characters',
  }),
  description: Joi.string().min(1).max(500).optional().messages({
    'string.empty': 'Description cannot be empty',
    'string.min': 'Description must be at least 1 character long',
    'string.max': 'Description cannot exceed 500 characters',
  }),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .optional(),
}).min(1);

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .optional(),
  search: Joi.string().max(100).optional(),
});

const uuidSchema = Joi.string().uuid().required().messages({
  'string.guid': 'Invalid task ID format',
  'any.required': 'Task ID is required',
});

export const validateCreateTask = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map(detail => detail.message),
    });
  }
  next();
  return;
};

export const validateUpdateTask = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map(detail => detail.message),
    });
  }
  next();
  return;
};

export const validateQuery = (req: Request, res: Response, next: NextFunction) => {
  const { error } = querySchema.validate(req.query);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid query parameters',
      details: error.details.map(detail => detail.message),
    });
  }
  next();
  return;
};

export const validateUUID = (req: Request, res: Response, next: NextFunction) => {
  const { error } = uuidSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID',
      details: error.details.map(detail => detail.message),
    });
  }
  next();
  return;
};
