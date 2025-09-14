import { useState } from 'react';
import type { Task } from '../types';
import { formatTime } from '../utils/taskUtils';

interface CalendarProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

export default function Calendar({ tasks, onDeleteTask, onEditTask }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };


  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getWeekDays = () => {
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#f56565';
      case 'medium': return '#ed8936';
      case 'low': return '#48bb78';
      default: return '#e2e8f0';
    }
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = getWeekDays();

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>📅 Calendar View</h2>
        <p>Visualize your tasks and deadlines</p>
      </div>

      <div className="calendar-controls">
        <div className="view-controls">
          <button 
            className={`btn ${view === 'month' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button 
            className={`btn ${view === 'week' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={`btn ${view === 'day' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('day')}
          >
            Day
          </button>
        </div>

        <div className="date-navigation">
          <button className="btn btn-secondary" onClick={() => navigateMonth('prev')}>
            ← Previous
          </button>
          <h3>{formatDate(currentDate)}</h3>
          <button className="btn btn-secondary" onClick={() => navigateMonth('next')}>
            Next →
          </button>
        </div>
      </div>

      {view === 'month' && (
        <div className="calendar-month">
          <div className="calendar-weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-weekday">{day}</div>
            ))}
          </div>
          <div className="calendar-grid">
            {days.map((day, index) => (
              <div key={index} className="calendar-day">
                {day && (
                  <>
                    <div className="calendar-day-number">{day.getDate()}</div>
                    <div className="calendar-day-tasks">
                      {getTasksForDate(day).slice(0, 3).map(task => (
                        <div
                          key={task.id}
                          className="calendar-task"
                          style={{ borderLeftColor: getPriorityColor(task.priority) }}
                          onClick={() => onEditTask(task)}
                        >
                          <div className="calendar-task-title">{task.title}</div>
                          <div className="calendar-task-time">{formatTime(task.estimatedTime)}</div>
                        </div>
                      ))}
                      {getTasksForDate(day).length > 3 && (
                        <div className="calendar-task-more">
                          +{getTasksForDate(day).length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'week' && (
        <div className="calendar-week">
          <div className="calendar-weekdays">
            {weekDays.map(day => (
              <div key={day.toISOString()} className="calendar-weekday">
                <div className="weekday-name">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="weekday-date">{day.getDate()}</div>
              </div>
            ))}
          </div>
          <div className="calendar-week-content">
            {weekDays.map(day => (
              <div key={day.toISOString()} className="calendar-week-day">
                <div className="week-day-tasks">
                  {getTasksForDate(day).map(task => (
                    <div
                      key={task.id}
                      className="calendar-task-detailed"
                      style={{ borderLeftColor: getPriorityColor(task.priority) }}
                      onClick={() => onEditTask(task)}
                    >
                      <div className="task-title">{task.title}</div>
                      <div className="task-meta">
                        <span className="task-time">{formatTime(task.estimatedTime)}</span>
                        <span className={`task-status status-${task.status}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'day' && (
        <div className="calendar-day-view">
          <div className="day-header">
            <h3>{formatDate(currentDate)}</h3>
            <div className="day-tasks-count">
              {getTasksForDate(currentDate).length} tasks due
            </div>
          </div>
          <div className="day-tasks">
            {getTasksForDate(currentDate).length === 0 ? (
              <div className="empty-state">
                <h3>No tasks due today</h3>
                <p>Enjoy your free day!</p>
              </div>
            ) : (
              getTasksForDate(currentDate).map(task => (
                <div
                  key={task.id}
                  className="day-task-card"
                  style={{ borderLeftColor: getPriorityColor(task.priority) }}
                >
                  <div className="day-task-header">
                    <h4>{task.title}</h4>
                    <span className={`status-badge status-${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="day-task-meta">
                    <span>⏱️ {formatTime(task.estimatedTime)}</span>
                    <span>📂 {task.category}</span>
                    <span>🎯 {task.priority}</span>
                  </div>
                  {task.description && (
                    <p className="day-task-description">{task.description}</p>
                  )}
                  <div className="day-task-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => onEditTask(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
