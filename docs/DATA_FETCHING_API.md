# App Data Initialization & API Integration

## Overview
After user authentication, the app automatically fetches all required data (teams, projects, tasks) and syncs it to Redux store. This provides real-time access to user's workspace data across the application.

## Client-Side Architecture

### 1. **Authentication Flow** (`useAuth` hook)
```
User Login/Signup
  ↓
AuthContext validates credentials
  ↓
Sets `isAuthenticated = true`
```

### 2. **Data Initialization** (`useInitializeAppData` hook)
Located in: [client/src/hooks/useInitializeAppData.js](../client/src/hooks/useInitializeAppData.js)

```
isAuthenticated = true
  ↓
useInitializeAppData hook triggered (in AppInitializer component)
  ↓
Parallel API requests:
  - GET /api/teams
  - GET /api/projects
  - GET /api/tasks
  ↓
Redux Dispatch:
  - dispatch(setTeams(response.teams))
  - dispatch(setProjects(response.projects))
  - dispatch(setTasks(response.tasks))
  ↓
Store updated with user's workspace data
  ↓
Components can access data via useSelector
```

### 3. **Redux Store State**
```
store/
├── users: { currentUserId, currentTeamId, teamIds, ... }
├── teams: { teams: {}, teamIds: [], ... }
├── projects: { projects: {}, projectIds: [], ... }
├── tasks: { tasks: {}, taskIds: [], ... }
├── settings: { userSettings: {}, ... }
└── theme: { mode: 'light/dark' }
```

### 4. **Component Usage**
```javascript
import { useSelector } from 'react-redux';

function Dashboard() {
  const teams = useSelector(state => state.teams.teamIds.map(id => state.teams.teams[id]));
  const projects = useSelector(state => state.projects.projectIds);
  const tasks = useSelector(state => state.tasks.taskIds);
  
  return (
    // Render teams, projects, tasks
  );
}
```

## Server-Side API

### New Endpoints

#### **Teams** (`POST /api/auth/authenticate` → `/api/teams`)
```
GET /api/teams
  └─ Returns: { teams: [...] }
  └─ Auth: Required (Bearer token)
  └─ Returns all teams where user is member

GET /api/teams/:teamId
  └─ Returns: { team: {...} }
  └─ Auth: Required
  
POST /api/teams
  └─ Body: { name, description }
  └─ Auth: Required
  └─ Creates new team

DELETE /api/teams/:teamId
  └─ Auth: Required (team owner only)
```

#### **Projects** (`/api/projects`)
```
GET /api/projects
  └─ Returns: { projects: [...] }
  └─ Auth: Required
  └─ Returns all projects in user's teams

GET /api/projects/:projectId
  └─ Returns: { project: {...} }
  └─ Auth: Required

POST /api/projects
  └─ Body: { name, description, teamId, status }
  └─ Auth: Required
  
DELETE /api/projects/:projectId
  └─ Auth: Required (project creator only)
```

#### **Tasks** (`/api/tasks`)
```
GET /api/tasks
  └─ Returns: { tasks: [...] }
  └─ Auth: Required
  └─ Returns all tasks in user's projects

GET /api/tasks/project/:projectId
  └─ Returns: { tasks: [...] }
  └─ Auth: Required

POST /api/tasks
  └─ Body: { title, description, projectId, assigneeId, priority, dueDate }
  └─ Auth: Required
  
PUT /api/tasks/:taskId
  └─ Body: { title, description, status, priority, assigneeId, dueDate }
  └─ Auth: Required

DELETE /api/tasks/:taskId
  └─ Auth: Required (task creator only)
```

## Data Flow Example

### Scenario: User logs in and views dashboard

```
1. Login Form submitted
   ├─ api.post('/auth/login', { email, password })
   └─ AuthContext sets: isAuthenticated = true

2. AppInitializer detects authentication
   └─ useInitializeAppData hook triggers

3. Parallel API calls made:
   ├─ api.get('/api/teams')
   ├─ api.get('/api/projects')
   └─ api.get('/api/tasks')

4. Responses received:
   ├─ Teams data: [{ id: 'team_1', name: 'Frontend', members: [...] }, ...]
   ├─ Projects data: [{ id: 'proj_1', name: 'Dashboard', teamId: 'team_1', ... }, ...]
   └─ Tasks data: [{ id: 'task_1', title: 'Implement Auth', projectId: 'proj_1', ... }, ...]

5. Redux store updated:
   ├─ dispatch(setTeams([...]))
   ├─ dispatch(setProjects([...]))
   └─ dispatch(setTasks([...]))

6. Dashboard component renders:
   └─ useSelector pulls data from Redux store
   └─ Displays teams, projects, and tasks

7. User interacts (creates task, updates project, etc.)
   └─ API call made to update backend
   └─ Redux store updated optimistically or after response
```

## Error Handling

### Client-Side
```javascript
// In useInitializeAppData
try {
  const [teamsRes, projectsRes, tasksRes] = await Promise.all([...])
  // Dispatch actions...
} catch (error) {
  // Graceful fallback - app continues with cached/fallback data
  dispatch(setTasksError(error.response?.data?.message))
}
```

### Server-Side
```javascript
// All endpoints include:
- Authentication middleware check
- Team/Project access validation
- Error handling with appropriate status codes:
  - 401: Not authenticated
  - 403: Access denied
  - 404: Resource not found
  - 400: Invalid request
```

## Performance Optimizations

1. **Parallel Requests**: All data fetched simultaneously with `Promise.all()`
2. **Normalized Redux State**: Entities stored by ID for O(1) lookups
3. **Selective Include**: Only necessary fields returned from API
4. **Auth Middleware**: Shared across routes for consistent validation
5. **Error Recovery**: App remains functional even if one endpoint fails

## Testing Checklist

- [ ] User can login
- [ ] Teams load after authentication
- [ ] Projects load for each team
- [ ] Tasks load for each project
- [ ] Real-time updates work (create/update/delete)
- [ ] Access control enforced (can't access other team's data)
- [ ] Error states handled gracefully
- [ ] Logout clears Redux store
