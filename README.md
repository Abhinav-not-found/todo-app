# Todo App

A full-stack Todo application built with React, TypeScript, Node.js, Express, and MongoDB. The project is structured as a separate frontend and backend application, with the production frontend build served directly by the Express server.

## Features

- Create, update, and delete tasks
- Mark tasks as completed
- Pin and unpin tasks
- Search tasks
- Edit task details
- Responsive and modern UI
- Light and dark mode
- REST API architecture
- MongoDB persistence
- Type-safe frontend and backend code
- Production-ready Docker setup
- Frontend served by the backend in production
- AI-assisted task improvement workflow

## Tech Stack

### Client

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Axios
- Lucide Icons

### Server

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

### DevOps

- Docker
- Docker Compose
- npm

## Project Structure

```text
todo-app/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── ...
│
├── .gitignore
└── README.md
```

## Architecture

The application is divided into two independent applications during development:

```text
                ┌──────────────────┐
                │      Client      │
                │  React + Vite    │
                └────────┬─────────┘
                         │
                         │ HTTP / REST API
                         ▼
                ┌──────────────────┐
                │      Server      │
                │ Node + Express   │
                └────────┬─────────┘
                         │
                         │ Mongoose
                         ▼
                ┌──────────────────┐
                │     MongoDB      │
                └──────────────────┘
```

During production, the architecture changes slightly:

```text
                    Browser
                       │
                       ▼
              ┌─────────────────┐
              │ Express Server   │
              │                 │
              │ /api/* → API    │
              │ /*     → React  │
              └───────┬─────────┘
                      │
                      ▼
                  MongoDB
```

The Vite production build is generated from `client/` and placed inside:

```text
server/public/
```

Express then serves those static files alongside the API.

> `server/public/` is generated during the build process and is intentionally excluded from Git.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm
- MongoDB

Verify your installations:

```bash
node --version
npm --version
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd todo-app
```

Install client dependencies:

```bash
cd client
npm install
```

Install server dependencies:

```bash
cd ../server
npm install
```

## Environment Variables

Create an environment file inside the server:

```text
server/.env
```

Example:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/todo-app
```

Do not commit your `.env` file.

You can provide a `.env.example` file containing the required variable names without exposing secrets.

## Running the Application

The client and server run independently during development.

### Start the Server

```bash
cd server
npm run dev
```

The API will be available at:

```text
http://localhost:8000
```

### Start the Client

Open another terminal:

```bash
cd client
npm run dev
```

Vite will provide the local development URL, typically:

```text
http://localhost:5173
```

The client communicates with the Express API through HTTP requests.

## Production Build

The production setup builds the React application and serves it through Express.

### 1. Build the Client

From the client directory:

```bash
cd client
npm run build
```

This generates the Vite production output in:

```text
client/dist/
```

### 2. Copy the Build to the Server

The generated frontend files are placed into:

```text
server/public/
```

The final server structure becomes:

```text
server/
├── src/
├── public/
│   ├── index.html
│   ├── assets/
│   └── ...
├── package.json
└── Dockerfile
```

### 3. Start the Server

```bash
cd server
npm start
```

Express serves both:

- REST API endpoints
- React frontend

This allows the entire application to run from a single server.

## Docker

The project also includes Docker support for running the backend and production application in a container.

Build the image:

```bash
docker build -t todo-app ./server
```

Run the container:

```bash
docker run -p 8000:8000 todo-app
```

The application can then be accessed at:

```text
http://localhost:8000
```

### Docker Build Flow

The intended production flow is:

```text
client source
     │
     │ npm run build
     ▼
client/dist
     │
     │ copy generated files
     ▼
server/public
     │
     │ Docker build
     ▼
Docker image
     │
     ▼
Express server
     │
     ├── API
     └── React application
```

## API

The backend exposes REST endpoints for managing tasks.

Typical operations include:

| Method | Purpose |
|---|---|
| `GET` | Retrieve tasks |
| `POST` | Create a task |
| `PUT` | Update a task |
| `DELETE` | Delete a task |

The exact API routes are defined inside the server application.

Example request:

```http
GET /api/tasks
```

Create a task:

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Learn Node.js",
  "description": "Study Express middleware and error handling"
}
```

## AI Task Improvement

The application includes an AI-assisted task improvement workflow.

Instead of immediately modifying a task, the user can request an improved version of its title and description.

The flow is:

```text
User
 │
 │ Click "Improve with AI"
 ▼
Client
 │
 │ title + description
 ▼
Server
 │
 │ AI request
 ▼
AI Model
 │
 │ improved title + description
 ▼
Server
 │
 ▼
Client
 │
 │ User reviews suggestion
 ▼
Approve
 │
 ▼
Database
```

The important part of this workflow is that the AI-generated content is **not saved immediately**.

The user first reviews the generated result and explicitly approves it. Only then is the task updated in the database.

## Data Model

A task contains information such as:

```text
Task
├── title
├── description
├── completed
├── pinned
├── createdAt
└── updatedAt
```

MongoDB stores the persistent task data, while Mongoose provides schema definitions and database interaction from the Node.js server.

## Development Workflow

A typical development workflow is:

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

Make changes to the client or server independently and test them locally.

For a production build:

```bash
client → build → server/public → Docker → deployment
```

## Scripts

### Client

Common scripts include:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Server

Common scripts include:

```bash
npm run dev
npm run build
npm start
```

The exact available scripts can be found in each application's `package.json`.

## Code Organization

The client follows a feature-oriented structure.

For example:

```text
src/
├── components/
├── features/
│   └── task/
│       ├── components/
│       ├── task.api.ts
│       ├── task.hook.ts
│       └── task.type.ts
├── lib/
├── App.tsx
└── main.tsx
```

Task-specific API functions, hooks, types, and UI components are grouped together instead of placing all files into large global folders.

This keeps feature code easier to locate and extend as the application grows.

## Error Handling

The server handles API errors and returns appropriate HTTP responses.

The client checks API responses and provides feedback to the user when an operation fails.

This keeps database and server-side errors away from the client while providing useful user-facing feedback.

## Security Considerations

The project keeps sensitive configuration outside the repository.

Ignored files include:

```text
.env
.env.*
node_modules/
dist/
server/public/
```

Generated frontend files are also excluded from Git because they are produced as part of the build process.

## Future Improvements

Potential improvements include:

- User authentication
- Multiple todo lists
- Task priorities
- Due dates and reminders
- Task categories and labels
- Drag-and-drop task organization
- AI task generation
- AI task summarization
- Improved caching
- Automated testing
- CI/CD deployment
- API documentation
- Rate limiting
- Request validation
- Better observability and logging

## License

This project is currently intended for personal and educational use.

---

Built as a full-stack project to explore modern React development, REST APIs, MongoDB, Docker, and AI-assisted application features.