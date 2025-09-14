export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  estimatedTime: number; // in minutes
  actualTime?: number; // in minutes
  priority: 'low' | 'medium' | 'high';
  category: 'assignment' | 'exam' | 'project' | 'personal' | 'work';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  completedAt?: string;
  procrastinationScore?: number; // 0-100, higher means more procrastination
}

export interface StudySession {
  id: string;
  taskId: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in minutes
  productivity: number; // 1-10 scale
  notes?: string;
}

export interface Analytics {
  totalTasks: number;
  completedTasks: number;
  averageCompletionTime: number;
  procrastinationTrend: number[];
  productivityByHour: number[];
  categoryBreakdown: Record<string, number>;
}
