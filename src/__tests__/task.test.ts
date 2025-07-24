import request from 'supertest';
import app from '../app';
import { TaskStatus } from '../models/Task';

describe('Task Management API', () => {
  let taskId: string;

  // Test task creation
  describe('POST /api/v1/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'This is a test task',
        status: TaskStatus.PENDING,
      };

      const response = await request(app)
        .post('/api/v1/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(taskData.title);
      expect(response.body.data.description).toBe(taskData.description);
      expect(response.body.data.status).toBe(taskData.status);
      expect(response.body.data.id).toBeDefined();

      taskId = response.body.data.id;
    });

    it('should return validation error for invalid task data', async () => {
      const invalidData = {
        title: '', // Empty title should fail validation
        description: 'Valid description',
      };

      const response = await request(app)
        .post('/api/v1/tasks')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation error');
    });
  });

  // Test getting all tasks
  describe('GET /api/v1/tasks', () => {
    it('should get all tasks with pagination', async () => {
      const response = await request(app)
        .get('/api/v1/tasks')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.tasks).toBeDefined();
      expect(response.body.data.pagination).toBeDefined();
      expect(Array.isArray(response.body.data.tasks)).toBe(true);
    });

    it('should filter tasks by status', async () => {
      const response = await request(app)
        .get('/api/v1/tasks?status=PENDING')
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.tasks.forEach((task: any) => {
        expect(task.status).toBe(TaskStatus.PENDING);
      });
    });
  });

  // Test getting single task
  describe('GET /api/v1/tasks/:id', () => {
    it('should get a task by ID', async () => {
      const response = await request(app)
        .get(`/api/v1/tasks/${taskId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(taskId);
    });

    it('should return 404 for non-existent task', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';
      const response = await request(app)
        .get(`/api/v1/tasks/${nonExistentId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Task not found');
    });
  });

  // Test updating task
  describe('PUT /api/v1/tasks/:id', () => {
    it('should update a task', async () => {
      const updateData = {
        title: 'Updated Test Task',
        status: TaskStatus.COMPLETED,
      };

      const response = await request(app)
        .put(`/api/v1/tasks/${taskId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.status).toBe(updateData.status);
    });
  });

  // Test deleting task
  describe('DELETE /api/v1/tasks/:id', () => {
    it('should delete a task', async () => {
      const response = await request(app)
        .delete(`/api/v1/tasks/${taskId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Task deleted successfully');
    });

    it('should return 404 when trying to delete non-existent task', async () => {
      const response = await request(app)
        .delete(`/api/v1/tasks/${taskId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Task not found');
    });
  });

  // Test health endpoint
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('running smoothly');
    });
  });
});
