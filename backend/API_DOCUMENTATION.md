# Maintenance Request API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication using a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**

```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 characters)",
  "phone": "string (optional)",
  "address": "string (optional)",
  "role": "string (optional, default: 'homeowner')"
}
```

**Response:** `201 Created`

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "homeowner"
  },
  "token": "jwt_token_here"
}
```

---

### Login

**POST** `/auth/login`

Authenticate and receive access token.

**Request Body:**

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "homeowner"
  },
  "token": "jwt_token_here"
}
```

---

### Get Current User

**GET** `/auth/me`

Get authenticated user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "123 Main St",
  "role": "homeowner",
  "profile_image": "path/to/image.jpg",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

### Update Profile

**PUT** `/auth/profile`

Update user profile information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "name": "string (optional)",
  "phone": "string (optional)",
  "address": "string (optional)",
  "profile_image": "string (optional)"
}
```

**Response:** `200 OK`

```json
{
  "message": "Profile updated successfully",
  "user": {
    /* updated user object */
  }
}
```

---

### Change Password

**PUT** `/auth/password`

Change user password.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required, min 6 characters)"
}
```

**Response:** `200 OK`

```json
{
  "message": "Password changed successfully"
}
```

---

## Maintenance Request Endpoints

### Create Request

**POST** `/requests`

Create a new maintenance request (homeowners only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "string (required)",
  "description": "string (required)",
  "category": "string (required: 'plumbing', 'electrical', 'carpentry', 'painting', 'other')",
  "priority": "string (optional, default: 'medium': 'low', 'medium', 'high')",
  "images": ["string (optional, array of image paths)"]
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "homeowner_id": 1,
  "title": "Leaking Faucet",
  "description": "Kitchen faucet is leaking",
  "category": "plumbing",
  "status": "pending",
  "priority": "medium",
  "images": ["path/to/image1.jpg"],
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

### Get All Requests

**GET** `/requests`

Get all maintenance requests (filtered by user role).

- Homeowners see only their requests
- Admins see all requests

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "homeowner_id": 1,
    "homeowner_name": "John Doe",
    "title": "Leaking Faucet",
    "description": "Kitchen faucet is leaking",
    "category": "plumbing",
    "status": "pending",
    "priority": "medium",
    "technician_id": null,
    "technician_name": null,
    "images": ["path/to/image1.jpg"],
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Get Request by ID

**GET** `/requests/:id`

Get a specific maintenance request.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "id": 1,
  "homeowner_id": 1,
  "homeowner_name": "John Doe",
  "title": "Leaking Faucet",
  "description": "Kitchen faucet is leaking",
  "category": "plumbing",
  "status": "pending",
  "priority": "medium",
  "technician_id": null,
  "technician_name": null,
  "images": ["path/to/image1.jpg"],
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

---

### Update Request

**PUT** `/requests/:id`

Update a maintenance request (admins only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "status": "string (optional: 'pending', 'in_progress', 'completed', 'cancelled')",
  "priority": "string (optional: 'low', 'medium', 'high')",
  "technician_id": "number (optional)"
}
```

**Response:** `200 OK`

```json
{
  "message": "Request updated successfully",
  "request": {
    /* updated request object */
  }
}
```

---

### Delete Request

**DELETE** `/requests/:id`

Delete a maintenance request.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "message": "Request deleted successfully"
}
```

---

### Get Statistics

**GET** `/requests/stats/summary`

Get request statistics (admins only).

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "total": 100,
  "pending": 20,
  "in_progress": 30,
  "completed": 45,
  "cancelled": 5
}
```

---

## Message Endpoints

### Create Message

**POST** `/messages`

Send a message in a maintenance request conversation.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "request_id": "number (required)",
  "message": "string (required)"
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "request_id": 1,
  "sender_id": 1,
  "sender_name": "John Doe",
  "message": "When can you fix this?",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

### Get Messages by Request

**GET** `/messages/request/:request_id`

Get all messages for a specific maintenance request.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "request_id": 1,
    "sender_id": 1,
    "sender_name": "John Doe",
    "sender_role": "homeowner",
    "message": "When can you fix this?",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "request_id": 1,
    "sender_id": 2,
    "sender_name": "Admin User",
    "sender_role": "admin",
    "message": "We can schedule it for tomorrow.",
    "created_at": "2024-01-01T01:00:00.000Z"
  }
]
```

---

## Notification Endpoints

### Get All Notifications

**GET** `/notifications`

Get all notifications for the current user.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "New Message",
    "message": "You have a new message on request #123",
    "type": "message",
    "request_id": 123,
    "is_read": false,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Get Unread Count

**GET** `/notifications/unread/count`

Get count of unread notifications.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "count": 5
}
```

---

### Mark as Read

**PUT** `/notifications/:id/read`

Mark a specific notification as read.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "message": "Notification marked as read"
}
```

---

### Mark All as Read

**PUT** `/notifications/read-all`

Mark all notifications as read for current user.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "message": "All notifications marked as read"
}
```

---

### Delete Notification

**DELETE** `/notifications/:id`

Delete a specific notification.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
  "message": "Notification deleted successfully"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized

```json
{
  "error": "No token provided"
}
```

or

```json
{
  "error": "Invalid token"
}
```

### 403 Forbidden

```json
{
  "error": "Access denied"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "details": "Error details (in development mode)"
}
```

---

## Data Models

### User

```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "phone": "string | null",
  "address": "string | null",
  "role": "homeowner | admin",
  "profile_image": "string | null",
  "created_at": "string (ISO 8601)"
}
```

### Request

```json
{
  "id": "number",
  "homeowner_id": "number",
  "homeowner_name": "string",
  "title": "string",
  "description": "string",
  "category": "plumbing | electrical | carpentry | painting | other",
  "status": "pending | in_progress | completed | cancelled",
  "priority": "low | medium | high",
  "technician_id": "number | null",
  "technician_name": "string | null",
  "images": "string (JSON array) | null",
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

### Message

```json
{
  "id": "number",
  "request_id": "number",
  "sender_id": "number",
  "sender_name": "string",
  "sender_role": "homeowner | admin",
  "message": "string",
  "created_at": "string (ISO 8601)"
}
```

### Notification

```json
{
  "id": "number",
  "user_id": "number",
  "title": "string",
  "message": "string",
  "type": "request | message | status_update",
  "request_id": "number | null",
  "is_read": "boolean (0 | 1)",
  "created_at": "string (ISO 8601)"
}
```

---

## Rate Limiting

Currently, there are no rate limits implemented. This may change in production.

## Versioning

Current API version: **v1**

---

## Notes

- All timestamps are in ISO 8601 format
- All dates use local timezone (not UTC)
- Images are stored as JSON arrays of file paths
- Auto-refresh is implemented with 30-second polling intervals on the client side
- Notifications are created automatically for:
  - New maintenance requests (sent to all admins)
  - New messages (sent to opposite party)
  - Status changes (sent to homeowner)
  - Technician assignments (sent to homeowner)
  - Priority changes (sent to homeowner)
