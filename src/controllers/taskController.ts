import { Request, Response } from 'express';
import taskService from '../services/taskService';
import { CreateTaskRequest, UpdateTaskRequest, TaskQuery } from '../models/Task';
import { asyncHandler } from '../middleware/errorHandler';

/**
 * @desc    Create a new task
 * @route   POST /api/v1/tasks
 * @access  Public
 */
export const createTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const taskData: CreateTaskRequest = req.body;
  const task = taskService.createTask(taskData);
  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});

/**
 * @desc    Get all tasks with pagination and filtering
 * @route   GET /api/v1/tasks
 * @access  Public
 */
export const getAllTasks = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const query: TaskQuery = req.query;
  const result = taskService.getAllTasks(query);
  res.status(200).json({
    success: true,
    message: 'Tasks retrieved successfully',
    data: result,
  });
});

/**
 * @desc    Get single task by ID
 * @route   GET /api/v1/tasks/:id
 * @access  Public
 */
export const getTaskById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Type guard to ensure id is defined
  if (!id) {
    res.status(400).json({
      success: false,
      message: 'Task ID is required',
    });
    return;
  }

  const task = taskService.getTaskById(id);
  if (!task) {
    res.status(404).json({
      success: false,
      message: 'Task not found',
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Task retrieved successfully',
    data: task,
  });
});

/**
 * @desc    Update task by ID
 * @route   PUT /api/v1/tasks/:id
 * @access  Public
 */
export const updateTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updateData: UpdateTaskRequest = req.body;

  // Type guard to ensure id is defined
  if (!id) {
    res.status(400).json({
      success: false,
      message: 'Task ID is required',
    });
    return;
  }

  const task = taskService.updateTask(id, updateData);
  if (!task) {
    res.status(404).json({
      success: false,
      message: 'Task not found',
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
});

/**
 * @desc    Delete task by ID
 * @route   DELETE /api/v1/tasks/:id
 * @access  Public
 */
export const deleteTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Type guard to ensure id is defined
  if (!id) {
    res.status(400).json({
      success: false,
      message: 'Task ID is required',
    });
    return;
  }

  const deleted = taskService.deleteTask(id);
  if (!deleted) {
    res.status(404).json({
      success: false,
      message: 'Task not found',
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
});

/**
 * @desc    Get task statistics
 * @route   GET /api/v1/tasks/stats
 * @access  Public
 */
export const getTaskStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const stats = taskService.getTaskStats();
  res.status(200).json({
    success: true,
    message: 'Task statistics retrieved successfully',
    data: stats,
  });
});
