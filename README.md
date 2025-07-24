## Task Management System

## Project Description

The **Task Management API** is a comprehensive, production ready REST API service designed to efficiently manage tasks in a to do application. Built with modern web technologies and best practices, this API provides a complete backend solution for task management systems with enterprise level features.
<br />

This API serves as a robust foundation for any task management application, whether it's a simple personal to do list or a complex project management system. The service is designed with scalability, security and developer experience in mind, making it suitable for both learning purposes and production deployments.

### **Design**

The project follows **clean architecture principles** and **RESTful design patterns**, ensuring maintainable, testable and scalable code. Every component is thoughtfully organized with proper separation of concerns, making it easy to understand, extend and maintain.

### **Features**

- **Complete CRUD Operations**: Create, read, update and delete tasks with full data validation
- **Advanced Querying**: Pagination, filtering by status, and text search capabilities
- **Real time Stats**: Task distribution and completion rates
- **Developer Friendly**: Comprehensive API documentation with interactive testing interface
- **Production Ready**: Includes logging, error handling, security measures and monitoring
- **Type Safe**: Full TypeScript implementation with strict type checking
- **Extensible Architecture**: Clean, modular code structure that's easy to extend


## Working Images with endpoints

### localhost/
<img width="1827" height="251" alt="main" src="https://github.com/user-attachments/assets/bead17f5-9c63-46c1-b14d-f3587b333007" />

### localhost/api-docs
<img width="1913" height="1008" alt="api docs" src="https://github.com/user-attachments/assets/fa1b6f74-397d-429d-afbf-c810f5354787" />
<img width="1792" height="968" alt="api docs 2" src="https://github.com/user-attachments/assets/db5321dd-edb7-4529-a27e-33eddf4d4936" />
<img width="1887" height="917" alt="api docs 3" src="https://github.com/user-attachments/assets/9fec8a1e-505c-4d28-8b9a-ab9301672b29" />

### localhost/health
<img width="1133" height="172" alt="healthiy" src="https://github.com/user-attachments/assets/60906a9a-736d-44a9-96da-cdcd9498b5b1" />


### 1. Local Development
```bash
# Clone the repository
git clone <repository-url>
cd task-management-api

# Install dependencies
npm install

# Start development server
npm run dev

# The API will be available at http://localhost:3000
# Documentation at http://localhost:3000/api-docs
```

### 2. Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## API Usage Examples

### Using cURL
```bash
# Create a new task
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete API documentation",
    "description": "Write comprehensive documentation for the Task Management API",
    "status": "IN_PROGRESS"
  }'

# Get all tasks with pagination
curl "http://localhost:3000/api/v1/tasks?page=1&limit=5&status=PENDING"

# Update a task
curl -X PUT http://localhost:3000/api/v1/tasks/{task-id} \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'

# Delete a task
curl -X DELETE http://localhost:3000/api/v1/tasks/{task-id}
```

### Using JavaScript/Fetch
```javascript
// Create a task
const createTask = async () => {
  const response = await fetch('http://localhost:3000/api/v1/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'New Task',
      description: 'Task description',
      status: 'PENDING'
    })
  });
  
  const result = await response.json();
  console.log(result);
};

// Get tasks with filters
const getTasks = async () => {
  const response = await fetch('http://localhost:3000/api/v1/tasks?status=PENDING&page=1&limit=10');
  const result = await response.json();
  console.log(result);
};
```

##  Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure
- Unit tests for services and utilities
- Integration tests for API endpoints
- Validation tests for input/output
- Error handling tests

## Monitoring & Logging

The API includes comprehensive logging and monitoring:

- **Request/Response logging** with Morgan
- **Error logging** with custom logger
- **Performance monitoring** for slow requests
- **Health checks** for uptime monitoring
- **API metrics** collection

## Performance Features

- **Compression** middleware for response compression
- **CORS** properly configured for security
- **Helmet** for security headers
- **Request size limits** to prevent abuse
- **Efficient in-memory storage** with O(1) operations where possible
- **Pagination** to handle large datasets

##  Security Features

- **Input validation** with Joi schemas
- **UUID validation** for route parameters
- **SQL injection protection** (when using databases)
- **XSS protection** via Helmet
- **CORS configuration** for cross-origin security
- **Rate limiting ready** (can be easily added)

This Task Management API is production ready with all the requested features and many additional enhancements for scalability, security and maintainability!
