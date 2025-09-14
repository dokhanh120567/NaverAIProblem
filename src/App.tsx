import { useState, useEffect } from 'react';
import './App.css';
import type { Task, StudySession } from './types';
import { storage } from './utils/storage';
import { generateId, calculateAnalytics } from './utils/taskUtils';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import Analytics from './components/Analytics';
import TaskForm from './components/TaskForm';

type View = 'dashboard' | 'calendar' | 'analytics';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadedTasks = storage.getTasks();
    const loadedSessions = storage.getSessions();
    setTasks(loadedTasks);
    setSessions(loadedSessions);
  }, []);

  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    storage.saveSessions(sessions);
  }, [sessions]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev: Task[]) => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev: Task[]) => prev.map((task: Task) => 
      task.id === id 
        ? { ...task, ...updates, ...(updates.status === 'completed' && !task.completedAt ? { completedAt: new Date().toISOString() } : {}) }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks((prev: Task[]) => prev.filter((task: Task) => task.id !== id));
  };

  const addSession = (sessionData: Omit<StudySession, 'id'>) => {
    const newSession: StudySession = {
      ...sessionData,
      id: generateId(),
    };
    setSessions((prev: StudySession[]) => [...prev, newSession]);
  };

  const analytics = calculateAnalytics(tasks);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📚 Smart Student Planner</h1>
          <nav className="nav-tabs">
            <button 
              className={`nav-tab ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`nav-tab ${currentView === 'calendar' ? 'active' : ''}`}
              onClick={() => setCurrentView('calendar')}
            >
              📅 Calendar
            </button>
            <button 
              className={`nav-tab ${currentView === 'analytics' ? 'active' : ''}`}
              onClick={() => setCurrentView('analytics')}
            >
              📈 Analytics
            </button>
          </nav>
          <button 
            className="add-task-btn"
            onClick={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
          >
            ➕ Add Task
          </button>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'dashboard' && (
          <Dashboard 
            tasks={tasks}
            sessions={sessions}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onEditTask={(task: Task) => {
              setEditingTask(task);
              setShowTaskForm(true);
            }}
            onAddSession={addSession}
          />
        )}
        {currentView === 'calendar' && (
          <Calendar 
            tasks={tasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onEditTask={(task: Task) => {
              setEditingTask(task);
              setShowTaskForm(true);
            }}
          />
        )}
        {currentView === 'analytics' && (
          <Analytics 
            tasks={tasks}
            sessions={sessions}
            analytics={analytics}
          />
        )}
      </main>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSave={(taskData) => {
            if (editingTask) {
              updateTask(editingTask.id, taskData);
            } else {
              addTask(taskData);
            }
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;