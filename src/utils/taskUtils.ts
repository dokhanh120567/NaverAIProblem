import type { Task, Analytics } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const calculateProcrastinationScore = (task: Task): number => {
  if (!task.dueDate || !task.createdAt) return 0;
  
  const dueDate = new Date(task.dueDate);
  const createdAt = new Date(task.createdAt);
  const now = new Date();
  
  const totalTime = dueDate.getTime() - createdAt.getTime();
  const timeUsed = now.getTime() - createdAt.getTime();
  
  if (totalTime <= 0) return 100;
  
  const timeRatio = timeUsed / totalTime;
  const daysUntilDue = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  
  // Higher score if task is overdue or very close to deadline
  if (daysUntilDue < 0) return 100;
  if (daysUntilDue < 1) return 90;
  if (daysUntilDue < 3) return 70;
  if (timeRatio > 0.8) return 60;
  
  return Math.min(timeRatio * 50, 50);
};

export const getTaskPriority = (task: Task): number => {
  const procrastinationScore = calculateProcrastinationScore(task);
  const dueDate = new Date(task.dueDate);
  const now = new Date();
  const daysUntilDue = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  
  let priority = 0;
  
  // Base priority from category
  switch (task.category) {
    case 'exam': priority += 40; break;
    case 'project': priority += 30; break;
    case 'assignment': priority += 20; break;
    case 'work': priority += 15; break;
    case 'personal': priority += 10; break;
  }
  
  // Urgency based on deadline
  if (daysUntilDue < 0) priority += 50; // Overdue
  else if (daysUntilDue < 1) priority += 40; // Due today
  else if (daysUntilDue < 3) priority += 30; // Due in 3 days
  else if (daysUntilDue < 7) priority += 20; // Due in a week
  
  // Procrastination factor
  priority += procrastinationScore * 0.3;
  
  return Math.min(priority, 100);
};

export const calculateAnalytics = (tasks: Task[]): Analytics => {
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const totalTasks = tasks.length;
  
  const averageCompletionTime = completedTasks.length > 0 
    ? completedTasks.reduce((sum, task) => sum + (task.actualTime || task.estimatedTime), 0) / completedTasks.length
    : 0;
  
  // Calculate procrastination trend (last 7 days)
  const procrastinationTrend = Array(7).fill(0).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    const dayTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      return taskDate.toDateString() === date.toDateString();
    });
    return dayTasks.length > 0 
      ? dayTasks.reduce((sum, task) => sum + calculateProcrastinationScore(task), 0) / dayTasks.length
      : 0;
  }).reverse();
  
  // Productivity by hour (simplified)
  const productivityByHour = Array(24).fill(0);
  completedTasks.forEach(task => {
    if (task.completedAt) {
      const hour = new Date(task.completedAt).getHours();
      productivityByHour[hour] += 1;
    }
  });
  
  // Category breakdown
  const categoryBreakdown = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalTasks,
    completedTasks: completedTasks.length,
    averageCompletionTime,
    procrastinationTrend,
    productivityByHour,
    categoryBreakdown
  };
};

export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

export const getDaysUntilDue = (dueDate: string): number => {
  const due = new Date(dueDate);
  const now = new Date();
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};
