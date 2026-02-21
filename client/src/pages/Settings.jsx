import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Bell, Lock, Settings as SettingsIcon, Check } from 'lucide-react';

import { updateUserSettings } from '../store';
import { Button } from '../components';

const Settings = () => {
  const dispatch = useDispatch();
  const [settings, setSettings] = useState({
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
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedSettings) {
      setSettings(prev => ({
        ...prev,
        ...JSON.parse(savedSettings),
        theme: savedTheme
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        theme: savedTheme
      }));
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setSettings(prev => ({
      ...prev,
      theme: newTheme
    }));

    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('theme-dark', newTheme === 'dark');
  };

  const handleNotificationChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    dispatch(updateUserSettings(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetSettings = () => {
    const defaultSettings = {
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
    };

    setSettings(defaultSettings);
    localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
  };

  return (
    <div className="space-y-5 max-w-6xl mx-auto text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1">Settings</h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">Customize your Heed experience</p>
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="p-4 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-600 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          <span className="text-emerald-800 dark:text-emerald-200 text-sm">Settings saved successfully!</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Notification Settings */}
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 dark:border-zinc-600 cursor-pointer accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Task Reminders</label>
              <input
                type="checkbox"
                checked={settings.notifications.taskReminders}
                onChange={(e) => handleNotificationChange('taskReminders', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 dark:border-zinc-600 cursor-pointer accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Project Updates</label>
              <input
                type="checkbox"
                checked={settings.notifications.projectUpdates}
                onChange={(e) => handleNotificationChange('projectUpdates', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 dark:border-zinc-600 cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded p-6">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy</h2>
          </div>

          <div className="space-y-4">
            <div className="p-3 rounded hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition">
              <label className="block text-gray-700 dark:text-gray-300 font-medium text-sm mb-2">Profile Visibility</label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-white/10 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-white/20 focus:border-transparent outline-none"
              >
                <option value="public">Public</option>
                <option value="team">Team Members Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Show Activity Status</label>
              <input
                type="checkbox"
                checked={settings.privacy.activityStatus}
                onChange={(e) => handlePrivacyChange('activityStatus', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 dark:border-white/10 cursor-pointer accent-white/20"
              />
            </div>
          </div>
        </div>

        {/* Preferences Settings */}
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Preferences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition">
              <label className="block text-gray-700 dark:text-gray-300 font-medium text-sm mb-2">Language</label>
              <select
                value={settings.preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-white/10 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-white/20 focus:border-transparent outline-none"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div className="p-3 rounded hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition">
              <label className="block text-gray-700 dark:text-gray-300 font-medium text-sm mb-2">Timezone</label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-white/10 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-white/20 focus:border-transparent outline-none"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="MST">Mountain Time (MST)</option>
                <option value="PST">Pacific Time (PST)</option>
              </select>
            </div>

            <div className="p-3 rounded hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition">
              <label className="block text-gray-700 dark:text-gray-300 font-medium text-sm mb-2">Date Format</label>
              <select
                value={settings.preferences.dateFormat}
                onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-white/10 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-white/20 focus:border-transparent outline-none"
              >
                <option value="MM/dd/yyyy">MM/dd/yyyy</option>
                <option value="dd/MM/yyyy">dd/MM/yyyy</option>
                <option value="yyyy-MM-dd">yyyy-MM-dd</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-4">
          <Button
            variant='outlined'
            color='primary'
            onClick={handleResetSettings}
          >
            Reset to Defaults
          </Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<Check size={16} />}
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
