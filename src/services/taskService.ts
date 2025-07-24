import { v4 as uuidv4 } from 'uuid';
import {
  Task,
  TaskStatus,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskQuery,
  TasksResponse,
} from '../models/Task';

class TaskService {
  private tasks: Task[] = [];

  /**
   * Create a new task
   */
  createTask(taskData: CreateTaskRequest): Task {
    const now = new Date();
    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      status: taskData.status || TaskStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  /**
   * Get all tasks with pagination and filtering
   */
  getAllTasks(query: TaskQuery): TasksResponse {
    let filteredTasks = [...this.tasks];

    // Filter by status
    if (query.status) {
      filteredTasks = filteredTasks.filter(task => task.status === query.status);
    }

    // Search by title or description
    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredTasks = filteredTasks.filter(
        task =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by creation date (newest first)
    filteredTasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    const total = filteredTasks.length;
    const totalPages = Math.ceil(total / limit);

    return {
      tasks: paginatedTasks,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Get task by ID
   */
  getTaskById(id: string): Task | null {
    return this.tasks.find(task => task.id === id) || null;
  }

  /**
   * Update task by ID
   */
  updateTask(id: string, updateData: UpdateTaskRequest): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return null;
    }

    const task = this.tasks[taskIndex];

    // Additional safety check for TypeScript
    if (!task) {
      return null;
    }

    // Create the updated task with all required properties
    const updatedTask: Task = {
      id: task.id,
      title: updateData.title !== undefined ? updateData.title.trim() : task.title,
      description:
        updateData.description !== undefined ? updateData.description.trim() : task.description,
      status: updateData.status !== undefined ? updateData.status : task.status,
      createdAt: task.createdAt,
      updatedAt: new Date(),
    };

    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  /**
   * Delete task by ID
   */
  deleteTask(id: string): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return false;
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }

  /**
   * Get tasks count by status (useful for dashboard)
   */
  getTaskStats() {
    const stats = {
      total: this.tasks.length,
      pending: this.tasks.filter(t => t.status === TaskStatus.PENDING).length,
      inProgress: this.tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      completed: this.tasks.filter(t => t.status === TaskStatus.COMPLETED).length,
    };
    return stats;
  }
}

export default new TaskService();
