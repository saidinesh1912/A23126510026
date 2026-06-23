# Notification Management System

## Project Overview

This project is a Notification Management System developed using React.js, Node.js, Express.js, and Material UI.

The system allows users to create, view, update, delete, and manage notifications efficiently through a REST API and a responsive frontend dashboard.

---

## Features Implemented

### Backend Features

* Create Notification
* Get All Notifications
* Get Notification By ID
* Update Notification
* Delete Notification
* Mark Notification As Read
* Get Unread Notifications
* Filter Notifications By Type
* Pagination Support

### Frontend Features

* Material UI Dashboard
* Notification Cards
* Filter Notifications By Type
* Mark Notification As Read
* Delete Notifications
* Viewed / Unviewed Tracking using Local Storage
* Priority Notifications Section
* Responsive User Interface

---

# Stage 1: API Design

The following REST APIs were implemented:

### Create Notification

```http
POST /notifications
```

### Get All Notifications

```http
GET /notifications
```

### Get Notification By ID

```http
GET /notifications/:id
```

### Update Notification

```http
PATCH /notifications/:id
```

### Mark Notification As Read

```http
PATCH /notifications/:id/read
```

### Delete Notification

```http
DELETE /notifications/:id
```

### Get Unread Notifications

```http
GET /notifications/unread
```

---

# Stage 2: Data Model Design

Each notification follows the structure:

```json
{
  "id": 1,
  "type": "Placement",
  "message": "Amazon Hiring Drive",
  "timestamp": "2026-06-23T10:00:00Z",
  "isRead": false
}
```

### Fields

* id
* type
* message
* timestamp
* isRead

The data model supports notification categorization, tracking read status, and timestamp-based sorting.

---

# Stage 3: Query Optimization

The following optimizations were considered:

* Retrieval using notification ID.
* Filtering notifications by type.
* Sorting notifications using timestamps.
* Pagination support for handling larger datasets.

### Suggested Database Indexes

* id
* type
* timestamp
* isRead

These indexes can improve retrieval and filtering performance when using a database in production.

---

# Stage 4: Performance Improvements

To improve performance for a large-scale notification system, the following approaches were considered:

* Pagination to limit the number of notifications returned in a single request.
* Filtering notifications by type to reduce unnecessary data processing.
* Sorting notifications based on timestamp for efficient retrieval of recent notifications.
* Minimizing API response payloads by returning only required fields.

These optimizations help maintain responsiveness as the number of notifications grows.

---

# Stage 5: Scalability Design

To support a high volume of notifications in a production environment, the following scalable architecture was proposed:

* Queue-based notification processing for handling bulk notification requests.
* Background workers to process notifications asynchronously.
* Separation of notification creation and delivery workflows.
* Distributed deployment of services to handle increased traffic.

This design ensures the system can scale efficiently while maintaining reliability and performance.

---

# Stage 6: Priority Notification Algorithm

Notifications are prioritized according to their importance.

### Priority Levels

| Type      | Priority Weight |
| --------- | --------------- |
| Placement | 3               |
| Result    | 2               |
| Event     | 1               |

### Algorithm

Notifications are sorted using priority weights:

```javascript
const priorityWeights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};
```

Higher priority notifications appear first in the Priority Notifications section.

---

# Stage 7: Frontend Implementation

The frontend dashboard was built using React.js and Material UI.

### Implemented Features

* Notification Dashboard
* Material UI Cards
* Filter Dropdown
* Read / Unread Status Display
* Mark Notification As Read
* Delete Notification
* Viewed Status Tracking using Local Storage
* Priority Notifications Section
* Responsive Layout

---

# Tech Stack

## Frontend

* React.js
* Material UI
* Axios

## Backend

* Node.js
* Express.js
* CORS

---

# Project Structure

```text
notification/
│
├── backend/
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── package.json
│
├── README.md
└── .gitignore
```

---

# Running the Project

## Backend

```bash
cd backend
npm install
node server.js
```

Server runs on:

```text
http://localhost:3000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Conclusion

The Notification Management System demonstrates API design, data modeling, filtering, pagination, scalability considerations, priority-based notification processing, and frontend implementation using modern web technologies.

---

## Author

Sai Dinesh

B.Tech CSE

ANITS
