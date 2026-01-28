// Store
export { default as store } from "./store.js";

// Theme Slice
export { toggleTheme, setTheme, loadTheme } from "./slices/themeSlice.js";
export { default as themeReducer } from "./slices/themeSlice.js";

// API Slice
export { apiSlice } from "./slices/apiSlice.js";

// Workspace Slice
export { 
  setWorkspaces, 
  setCurrentWorkspace, 
  addWorkspace, 
  updateWorkspace, 
  deleteWorkspace,
  addProject,
  addTask,
  updateTask,
  deleteTask
} from "./slices/workspaceSlice.js";
export { default as workspaceReducer } from "./slices/workspaceSlice.js";

// Settings Slice
export {
  updateUserSettings,
  updateNotifications,
  updatePrivacy,
  updatePreferences,
  resetToDefaults,
  setLoading as setSettingsLoading,
  setError as setSettingsError
} from "./slices/settingsSlice.js";
export { default as settingsReducer } from "./slices/settingsSlice.js";