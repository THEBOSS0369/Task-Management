import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} from '../controllers/taskController';
import {
  validateCreateTask,
  validateUpdateTask,
  validateQuery,
  validateUUID,
} from '../middleware/validation';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - status
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the task
 *         title:
 *           type: string
 *           maxLength: 100
 *           description: Task title
 *         description:
 *           type: string
 *           maxLength: 500
 *           description: Task description
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED]
 *           description: Current status of the task
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Task creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * /api/v1/tasks/stats:
 *   get:
 *     summary: Get task statistics
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Task statistics retrieved successfully
 */
router.get('/stats', getTaskStats);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 maxLength: 500
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *                 default: PENDING
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', validateCreateTask, createTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks with pagination and filtering
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           maxLength: 100
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 */
router.get('/', validateQuery, getAllTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */
router.get('/:id', validateUUID, getTaskById);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 maxLength: 500
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put('/:id', validateUUID, validateUpdateTask, updateTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/:id', validateUUID, deleteTask);

export default router;
