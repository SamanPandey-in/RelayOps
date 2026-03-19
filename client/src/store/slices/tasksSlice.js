import { createSlice } from "@reduxjs/toolkit";

const normalizeTask = (task = {}, fallbackProjectId = null) => {
  const { assignee: _assignee, ...taskRest } = task;
  const normalizedTask = {
    ...taskRest,
    id: task.id || `task_${Date.now()}`,
    projectId: task.projectId || fallbackProjectId,
  };

  if (!normalizedTask.assigneeId && task.assignee?.id) {
    normalizedTask.assigneeId = task.assignee.id;
  }

  return normalizedTask;
};

const normalizeTaskCollection = (tasks = []) => {
  const entities = {};
  const ids = [];

  tasks.forEach((task) => {
    if (!task?.id) return;

    entities[task.id] = task;
    ids.push(task.id);
  });

  return {
    tasks: entities,
    taskIds: ids,
  };
};

const normalizeTasksFromProjects = (projects = []) => {
  const entities = {};
  const ids = [];

  projects.forEach((project, projectIndex) => {
    const projectId = project?.id || `project_${projectIndex}`;
    const tasks = Array.isArray(project?.tasks) ? project.tasks : [];

    tasks.forEach((task, taskIndex) => {
      const normalizedTask = normalizeTask(
        {
          ...task,
          id: task.id || `task_${projectId}_${taskIndex}`,
          projectId,
        },
        projectId
      );

      entities[normalizedTask.id] = normalizedTask;
      if (!ids.includes(normalizedTask.id)) {
        ids.push(normalizedTask.id);
      }
    });
  });

  return {
    tasks: entities,
    taskIds: ids,
  };
};

const initialState = {
  tasks: {},
  taskIds: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      const normalizedTasks = normalizeTaskCollection(action.payload || []);
      state.tasks = normalizedTasks.tasks;
      state.taskIds = normalizedTasks.taskIds;
      state.error = null;
    },
    setTasksLoading: (state, action) => {
      state.loading = Boolean(action.payload);
    },
    setTasksError: (state, action) => {
      state.error = action.payload || null;
    },
    clearTasksError: (state) => {
      state.error = null;
    },

    resetState: () => initialState,
  },
});

export const { setTasks, setTasksLoading, setTasksError, clearTasksError, resetState: resetTasksState } = tasksSlice.actions;

export default tasksSlice.reducer;
