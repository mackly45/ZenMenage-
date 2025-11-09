# ZenMénage API Documentation

## Authentication

### Register a new user

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "jwt_token",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member",
      "family": "family_id"
    }
  }
}
```

### Login user

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "jwt_token",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member",
      "family": "family_id"
    }
  }
}
```

### Get current user

**GET** `/api/auth/me`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member",
      "family": {
        "_id": "family_id",
        "name": "Family Name",
        "members": ["user_ids"]
      }
    }
  }
}
```

## Tasks

### Get all tasks

**GET** `/api/tasks`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Query Parameters:**

- `status` (optional): Filter by status (todo, in-progress, completed)
- `room` (optional): Filter by room

**Response:**

```json
{
  "success": true,
  "count": 5,
  "data": {
    "tasks": [
      {
        "_id": "task_id",
        "title": "Task Title",
        "description": "Task Description",
        "room": "Room Name",
        "assignedTo": {
          "_id": "user_id",
          "name": "User Name"
        },
        "priority": "high",
        "status": "todo",
        "dueDate": "2023-12-31T00:00:00.000Z",
        "completedAt": null,
        "createdBy": {
          "_id": "user_id",
          "name": "User Name"
        },
        "createdAt": "2023-12-01T00:00:00.000Z",
        "updatedAt": "2023-12-01T00:00:00.000Z"
      }
    ]
  }
}
```

### Create a new task

**POST** `/api/tasks`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Request Body:**

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "room": "Room Name",
  "assignedTo": "user_id",
  "priority": "medium",
  "dueDate": "2023-12-31"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "task": {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description",
      "room": "Room Name",
      "assignedTo": {
        "_id": "user_id",
        "name": "User Name"
      },
      "priority": "medium",
      "status": "todo",
      "dueDate": "2023-12-31T00:00:00.000Z",
      "completedAt": null,
      "createdBy": {
        "_id": "user_id",
        "name": "User Name"
      },
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  }
}
```

### Get a single task

**GET** `/api/tasks/:id`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Response:**

```json
{
  "success": true,
  "data": {
    "task": {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description",
      "room": "Room Name",
      "assignedTo": {
        "_id": "user_id",
        "name": "User Name"
      },
      "priority": "medium",
      "status": "todo",
      "dueDate": "2023-12-31T00:00:00.000Z",
      "completedAt": null,
      "createdBy": {
        "_id": "user_id",
        "name": "User Name"
      },
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  }
}
```

### Update a task

**PUT** `/api/tasks/:id`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Request Body:**

```json
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "room": "Updated Room Name",
  "assignedTo": "user_id",
  "priority": "high",
  "status": "in-progress",
  "dueDate": "2023-12-31"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "task": {
      "_id": "task_id",
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "room": "Updated Room Name",
      "assignedTo": {
        "_id": "user_id",
        "name": "User Name"
      },
      "priority": "high",
      "status": "in-progress",
      "dueDate": "2023-12-31T00:00:00.000Z",
      "completedAt": null,
      "createdBy": {
        "_id": "user_id",
        "name": "User Name"
      },
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  }
}
```

### Delete a task

**DELETE** `/api/tasks/:id`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Response:**

```json
{
  "success": true,
  "data": {}
}
```

### Toggle task completion

**PUT** `/api/tasks/:id/toggle`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Response:**

```json
{
  "success": true,
  "data": {
    "task": {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description",
      "room": "Room Name",
      "assignedTo": {
        "_id": "user_id",
        "name": "User Name"
      },
      "priority": "medium",
      "status": "completed",
      "dueDate": "2023-12-31T00:00:00.000Z",
      "completedAt": "2023-12-01T00:00:00.000Z",
      "createdBy": {
        "_id": "user_id",
        "name": "User Name"
      },
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  }
}
```

## Family

### Get family details

**GET** `/api/family`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Response:**

```json
{
  "success": true,
  "data": {
    "family": {
      "_id": "family_id",
      "name": "Family Name",
      "members": [
        {
          "_id": "user_id",
          "name": "User Name",
          "email": "user@example.com",
          "avatar": ""
        }
      ],
      "createdBy": "user_id",
      "inviteCode": "ABC123",
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  }
}
```

### Update family details

**PUT** `/api/family/update`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Request Body:**

```json
{
  "name": "Updated Family Name"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "family": {
      "_id": "family_id",
      "name": "Updated Family Name",
      "members": ["user_ids"],
      "createdBy": "user_id",
      "inviteCode": "ABC123",
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  }
}
```

### Get invite code

**GET** `/api/family/invite`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Response:**

```json
{
  "success": true,
  "data": {
    "inviteCode": "ABC123"
  }
}
```

### Join family with invite code

**POST** `/api/family/join`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Request Body:**

```json
{
  "inviteCode": "ABC123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "family": {
      "_id": "family_id",
      "name": "Family Name",
      "members": ["user_ids"],
      "createdBy": "user_id",
      "inviteCode": "ABC123",
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    },
    "user": {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "member",
      "family": "family_id"
    }
  }
}
```

### Remove member from family

**POST** `/api/family/remove-member`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Request Body:**

```json
{
  "memberId": "user_id_to_remove"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "family": {
      "_id": "family_id",
      "name": "Family Name",
      "members": ["remaining_user_ids"],
      "createdBy": "user_id",
      "inviteCode": "ABC123",
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  }
}
```

## Statistics

### Get dashboard statistics

**GET** `/api/stats/dashboard`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Response:**

```json
{
  "success": true,
  "data": {
    "today": {
      "total": 5,
      "completed": 2,
      "percentage": 40
    },
    "week": {
      "total": 20,
      "completed": 15,
      "percentage": 75
    },
    "overall": {
      "total": 50,
      "completed": 40,
      "percentage": 80
    },
    "byRoom": [
      {
        "_id": "Room Name",
        "count": 10,
        "completed": 8
      }
    ],
    "byPriority": [
      {
        "_id": "high",
        "count": 5
      }
    ]
  }
}
```

### Get weekly statistics

**GET** `/api/stats/weekly`

**Headers:**

```sh
Authorization: Bearer jwt_token
```

**Response:**

```json
{
  "success": true,
  "data": {
    "dates": ["2023-12-01", "2023-12-02", "2023-12-03", "2023-12-04", "2023-12-05", "2023-12-06", "2023-12-07"],
    "createdTasks": [2, 3, 1, 4, 2, 3, 2],
    "completedTasks": [1, 2, 1, 3, 1, 2, 2]
  }
}
```