export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  status?: TaskStatus;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TaskQuery {
  page?: number;
  limit?: number;
  status?: TaskStatus;
  search?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: PaginationInfo;
}
