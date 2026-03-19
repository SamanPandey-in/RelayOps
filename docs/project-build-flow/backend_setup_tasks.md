# Heed Backend Setup — Executable Task Plan

## 🚨 Execution Rules (STRICT)

1. Execute ONLY one task at a time
2. After completing a task:
   - Mark it as ✅ DONE
   - Ask: "Task X completed. Proceed to next task? (yes/no)"
3. WAIT for user confirmation before continuing
4. Do NOT skip tasks
5. If error occurs:
   - Stop execution
   - Report issue clearly

---

# 🔴 Phase 0 — Blocking Fixes (DO FIRST)

## Task 0.1 — Fix Prisma datasource
- File: `server/prisma/schema.prisma`
- Add:
```

url       = env("DATABASE_URL")
directUrl = env("DIRECT_URL")

```

- Then run:
```

cd server
npx prisma generate

```

[ ] Task 0.1

---

## Task 0.2 — Fix inviteCode generation
- File: `teams.controller.js`
- Replace:
```

inviteCode: `${name.toUpperCase()}-${Date.now()}`

```

- With:
```

import { randomBytes } from 'crypto';

inviteCode: randomBytes(4).toString('hex').toUpperCase()

```

[x] Task 0.2 ✅ DONE

---

## Task 0.3 — Fix Project `key` field
- File: `projects.controller.js`

Add:
```

const { key } = req.body;

const projectKey = (key || name.trim().slice(0,4))
.toUpperCase()
.replace(/[^A-Z]/g,'');

```

Include in create:
```

key: projectKey

```

[x] Task 0.3 ✅ DONE

---

## Task 0.4 — Remove dummy Redux data
- File: `teamsSlice.js`
  - Remove dummy imports
  - Set initialState empty

- File: `projectsSlice.js`, `tasksSlice.js`
  - Remove dummy imports

[x] Task 0.4 ✅ DONE

---

# 🟡 Phase 1 — Teams API

## Task 1.1 — Add backend controllers
Implement:
- updateTeam
- addTeamMember
- removeTeamMember
- joinByInviteCode

[x] Task 1.1 ✅ DONE

---

## Task 1.2 — Add routes
- File: `teams.route.js`

Add:
```

router.patch('/:teamId', updateTeam);
router.post('/join', joinByInviteCode);
router.post('/:teamId/members', addTeamMember);
router.delete('/:teamId/members/:userId', removeTeamMember);

```

[x] Task 1.2 ✅ DONE

---

## Task 1.3 — Frontend wiring (Teams)
- Replace Redux-only calls with API:
  - CreateTeamForm → POST /teams
  - JoinTeam → POST /teams/join
  - InviteMember → POST /teams/:teamId/members
  - LeaveTeam → DELETE endpoint

[x] Task 1.3 ✅ DONE

---

# 🟡 Phase 2 — Projects API

## Task 2.1 — Add backend controllers
Implement:
- updateProject
- addProjectMember
- removeProjectMember

[x] Task 2.1 ✅ DONE

---

## Task 2.2 — Add routes
```

router.patch('/:projectId', updateProject);
router.post('/:projectId/members', addProjectMember);
router.delete('/:projectId/members/:userId', removeProjectMember);

```

[x] Task 2.2 ✅ DONE

---

## Task 2.3 — Frontend wiring (Projects)
- CreateProject → POST
- UpdateProject → PATCH
- AddMember → POST
- LeaveProject → DELETE

[x] Task 2.3 ✅ DONE

---

# 🟡 Phase 3 — Tasks API Wiring

## Task 3.1 — Add GET task by ID
- Controller: `getTaskById`
- Route:
```

router.get('/:taskId', getTaskById);

```

[x] Task 3.1 ✅ DONE

---

## Task 3.2 — Replace Redux-only logic with API
- CreateTask → POST
- UpdateTask → PUT
- DeleteTask → DELETE
- Load TaskDetails → GET /tasks/:taskId

[x] Task 3.2 ✅ DONE

---

## Task 3.3 — Fix loading bug
Ensure:
```

finally {
setLoading(false);
}

```

[x] Task 3.3 ✅ DONE

---

# 🟡 Phase 4 — User Profile

## Task 4.1 — Wire Profile UI
- Use `/api/users/me`
- PATCH updates

[x] Task 4.1 ✅ DONE

---

## Task 4.2 — Add change password
- Endpoint: `/api/auth/change-password`

[x] Task 4.2 ✅ DONE

---

# 🟡 Phase 5 — Comments System

## Task 5.1 — Create comments controller
- getComments
- createComment
- deleteComment

[x] Task 5.1 ✅ DONE

---

## Task 5.2 — Create routes
```

/api/tasks/:taskId/comments

```

[x] Task 5.2 ✅ DONE

---

## Task 5.3 — Mount routes in app.js

[x] Task 5.3 ✅ DONE

---

## Task 5.4 — Frontend integration
- Load comments
- Add comment
- Delete comment

[x] Task 5.4 ✅ DONE

---

# 🟡 Phase 6 — Cleanup

## Task 6.1 — Remove dummy data everywhere

[x] Task 6.1 ✅ DONE

---

## Task 6.2 — Fix selectors

[x] Task 6.2 ✅ DONE

---

## Task 6.3 — Add logout cleanup

[x] Task 6.3 ✅ DONE

---

# 🟡 Phase 7 — UX Improvements

## Task 7.1 — Add ErrorBoundary

[x] Task 7.1 ✅ DONE

---

## Task 7.2 — Add loading states

[x] Task 7.2 ✅ DONE

---

## Task 7.3 — Fix toast.dismiss()

[x] Task 7.3 ✅ DONE

---

## Task 7.4 — Fix date null checks

[x] Task 7.4 ✅ DONE

---

# 🟢 Phase 8 — Final Migration

## Task 8.1 — Verify environment variables

[ ] Task 8.1

---

## Task 8.2 — Run migration
```

npx prisma migrate dev --name add_missing_endpoints
npx prisma generate

```

[ ] Task 8.2

---

## Task 8.3 — Verify DB tables

[ ] Task 8.3

---

# ✅ END

After all tasks:
- Confirm all checkboxes are ✅
- System ready for production
