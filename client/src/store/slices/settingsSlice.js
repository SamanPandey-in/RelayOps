import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSettings: {
        theme: localStorage.getItem('theme') || 'light',
        notifications: {
            email: true,
            desktop: false,
            taskReminders: true,
            projectUpdates: true
        },
        privacy: {
            profileVisibility: 'team',
            activityStatus: true
        },
        preferences: {
            language: 'en',
            timezone: 'UTC',
            dateFormat: 'MM/dd/yyyy'
        }
    },
    loading: false,
    error: null
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        updateUserSettings: (state, action) => {
            state.userSettings = {
                ...state.userSettings,
                ...action.payload
            };
        },
        setTheme: (state, action) => {
            state.userSettings.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
        updateNotifications: (state, action) => {
            state.userSettings.notifications = {
                ...state.userSettings.notifications,
                ...action.payload
            };
        },
        updatePrivacy: (state, action) => {
            state.userSettings.privacy = {
                ...state.userSettings.privacy,
                ...action.payload
            };
        },
        updatePreferences: (state, action) => {
            state.userSettings.preferences = {
                ...state.userSettings.preferences,
                ...action.payload
            };
        },
        resetToDefaults: (state) => {
            state.userSettings = initialState.userSettings;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { 
    updateUserSettings, 
    setTheme, 
    updateNotifications, 
    updatePrivacy, 
    updatePreferences, 
    resetToDefaults,
    setLoading,
    setError 
} = settingsSlice.actions;

export default settingsSlice.reducer;
