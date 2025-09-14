import { useState } from 'react';
import type { Task, StudySession } from '../types';
import { getTaskPriority, formatTime, getDaysUntilDue, calculateProcrastinationScore } from '../utils/taskUtils';

interface DashboardProps {
  tasks: Task[];
  sessions: StudySession[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onAddSession: (session: Omit<StudySession, 'id'>) => void;
}

export default function Dashboard({ 
  tasks, 
  onUpdateTask, 
  onDeleteTask, 
  onEditTask,
  onAddSession 
}: DashboardProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'createdAt'>('priority');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      const matchesFilter = filter === 'all' || task.status === filter;
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return getTaskPriority(b) - getTaskPriority(a);
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    onUpdateTask(taskId, { status: newStatus });
  };

  const handleStartSession = (task: Task) => {
    const now = new Date().toISOString();
    onAddSession({
      taskId: task.id,
      startTime: now,
      productivity: 5
    });
    onUpdateTask(task.id, { status: 'in-progress' });
  };

  const getPriorityClass = (priority: Task['priority']) => {
    return `priority-${priority}`;
  };

  const getStatusClass = (status: Task['status']) => {
    return `status-${status.replace('-', '-')}`;
  };

  const getTaskCardClass = (priority: Task['priority']) => {
    return `task-card ${priority}-priority`;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Smart Dashboard</h2>
        <p>Your procrastination-aware task management hub</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{tasks.length}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasks.filter(t => t.status === 'completed').length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasks.filter(t => t.status === 'in-progress').length}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasks.filter(t => getDaysUntilDue(t.dueDate) < 0).length}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>

      {/* Controls */}
      <div className="dashboard-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="form-select"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="form-select"
          >
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="createdAt">Sort by Created</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>Create your first task to get started!</p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const daysUntilDue = getDaysUntilDue(task.dueDate);
            const procrastinationScore = calculateProcrastinationScore(task);
            const priority = getTaskPriority(task);
            
            return (
              <div key={task.id} className={getTaskCardClass(task.priority)}>
                <div className="task-header">
                  <div>
                    <h3 className="task-title">{task.title}</h3>
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}
                  </div>
                  <div className="task-priority">
                    <span className={`priority-indicator ${getPriorityClass(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="task-meta">
                  <div className="task-meta-item">
                    <span>📅</span>
                    <span>
                      {daysUntilDue < 0 
                        ? `Overdue by ${Math.abs(daysUntilDue)} days`
                        : daysUntilDue === 0 
                        ? 'Due today'
                        : `Due in ${daysUntilDue} days`
                      }
                    </span>
                  </div>
                  <div className="task-meta-item">
                    <span>⏱️</span>
                    <span>{formatTime(task.estimatedTime)}</span>
                  </div>
                  <div className="task-meta-item">
                    <span>📂</span>
                    <span>{task.category}</span>
                  </div>
                  <div className="task-meta-item">
                    <span>🎯</span>
                    <span>Priority: {priority.toFixed(0)}</span>
                  </div>
                  {procrastinationScore > 50 && (
                    <div className="task-meta-item">
                      <span>⚠️</span>
                      <span>Procrastination: {procrastinationScore.toFixed(0)}%</span>
                    </div>
                  )}
                </div>

                <div className="task-status">
                  <span className={`status-badge ${getStatusClass(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                </div>

                <div className="task-actions">
                  {task.status === 'pending' && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleStartSession(task)}
                    >
                      ▶️ Start
                    </button>
                  )}
                  
                  {task.status === 'in-progress' && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleStatusChange(task.id, 'completed')}
                    >
                      ✅ Complete
                    </button>
                  )}
                  
                  <button
                    className="btn btn-secondary"
                    onClick={() => onEditTask(task)}
                  >
                    ✏️ Edit
                  </button>
                  
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
