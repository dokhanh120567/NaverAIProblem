import type { Task, StudySession } from '../types';

const STORAGE_KEYS = {
  TASKS: 'student-planner-tasks',
  SESSIONS: 'student-planner-sessions',
  SETTINGS: 'student-planner-settings'
};

export const storage = {
  getTasks: (): Task[] => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  },

  getSessions: (): StudySession[] => {
    try {
      const sessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  },

  saveSessions: (sessions: StudySession[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
  },

  getSettings: () => {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        workStartHour: 9,
        workEndHour: 22,
        breakDuration: 15,
        maxTasksPerDay: 8
      };
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        workStartHour: 9,
        workEndHour: 22,
        breakDuration: 15,
        maxTasksPerDay: 8
      };
    }
  },

  saveSettings: (settings: any): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }
};
