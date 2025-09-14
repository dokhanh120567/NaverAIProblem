import type { Task, StudySession, Analytics as AnalyticsType } from '../types';
import { formatTime } from '../utils/taskUtils';

interface AnalyticsProps {
  tasks: Task[];
  sessions: StudySession[];
  analytics: AnalyticsType;
}

export default function Analytics({ analytics }: AnalyticsProps) {
  const completionRate = analytics.totalTasks > 0 
    ? (analytics.completedTasks / analytics.totalTasks * 100).toFixed(1)
    : '0';

  const averageProcrastination = analytics.procrastinationTrend.length > 0
    ? (analytics.procrastinationTrend.reduce((sum, score) => sum + score, 0) / analytics.procrastinationTrend.length).toFixed(1)
    : '0';

  const mostProductiveHour = analytics.productivityByHour.indexOf(Math.max(...analytics.productivityByHour));
  const mostProductiveHourFormatted = mostProductiveHour < 12 
    ? `${mostProductiveHour}:00 AM`
    : `${mostProductiveHour === 12 ? 12 : mostProductiveHour - 12}:00 PM`;

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'assignment': return '📝';
      case 'exam': return '📚';
      case 'project': return '🔨';
      case 'personal': return '👤';
      case 'work': return '💼';
      default: return '📋';
    }
  };

  const getProcrastinationLevel = (score: number) => {
    if (score < 30) return { level: 'Low', color: '#48bb78' };
    if (score < 60) return { level: 'Medium', color: '#ed8936' };
    return { level: 'High', color: '#f56565' };
  };

  const procrastinationLevel = getProcrastinationLevel(parseFloat(averageProcrastination));

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2>📈 Analytics & Insights</h2>
        <p>Understand your productivity patterns and procrastination habits</p>
      </div>

      {/* Key Metrics */}
      <div className="analytics-metrics">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <div className="metric-value">{completionRate}%</div>
            <div className="metric-label">Completion Rate</div>
            <div className="metric-description">
              {analytics.completedTasks} of {analytics.totalTasks} tasks completed
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <div className="metric-value">{formatTime(analytics.averageCompletionTime)}</div>
            <div className="metric-label">Avg. Completion Time</div>
            <div className="metric-description">
              Time spent per completed task
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚠️</div>
          <div className="metric-content">
            <div className="metric-value" style={{ color: procrastinationLevel.color }}>
              {averageProcrastination}%
            </div>
            <div className="metric-label">Procrastination Score</div>
            <div className="metric-description">
              {procrastinationLevel.level} procrastination level
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🕐</div>
          <div className="metric-content">
            <div className="metric-value">{mostProductiveHourFormatted}</div>
            <div className="metric-label">Most Productive Hour</div>
            <div className="metric-description">
              When you complete most tasks
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="analytics-charts">
        {/* Procrastination Trend */}
        <div className="chart-card">
          <h3>📉 Procrastination Trend (Last 7 Days)</h3>
          <div className="chart-container">
            <div className="trend-chart">
              {analytics.procrastinationTrend.map((score, index) => {
                const height = (score / 100) * 100;
                const date = new Date();
                date.setDate(date.getDate() - (6 - index));
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                
                return (
                  <div key={index} className="trend-bar">
                    <div 
                      className="trend-bar-fill"
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: score > 60 ? '#f56565' : score > 30 ? '#ed8936' : '#48bb78'
                      }}
                    />
                    <div className="trend-bar-label">{dayName}</div>
                    <div className="trend-bar-value">{score.toFixed(0)}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Productivity by Hour */}
        <div className="chart-card">
          <h3>🕐 Productivity by Hour</h3>
          <div className="chart-container">
            <div className="productivity-chart">
              {analytics.productivityByHour.map((count, hour) => {
                const maxCount = Math.max(...analytics.productivityByHour);
                const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                
                return (
                  <div key={hour} className="productivity-bar">
                    <div 
                      className="productivity-bar-fill"
                      style={{ height: `${height}%` }}
                    />
                    <div className="productivity-bar-label">
                      {hour < 12 ? `${hour}:00` : `${hour === 12 ? 12 : hour - 12}:00`}
                    </div>
                    <div className="productivity-bar-value">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="analytics-categories">
        <h3>📂 Task Categories</h3>
        <div className="category-breakdown">
          {Object.entries(analytics.categoryBreakdown).map(([category, count]) => {
            const percentage = analytics.totalTasks > 0 
              ? (count / analytics.totalTasks * 100).toFixed(1)
              : '0';
            
            return (
              <div key={category} className="category-item">
                <div className="category-header">
                  <span className="category-emoji">{getCategoryEmoji(category)}</span>
                  <span className="category-name">{category}</span>
                  <span className="category-count">{count} tasks</span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-bar-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="category-percentage">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      <div className="analytics-insights">
        <h3>💡 Insights & Recommendations</h3>
        <div className="insights-list">
          {parseFloat(averageProcrastination) > 60 && (
            <div className="insight-item insight-warning">
              <div className="insight-icon">⚠️</div>
              <div className="insight-content">
                <h4>High Procrastination Detected</h4>
                <p>Your procrastination score is quite high. Consider breaking large tasks into smaller chunks and setting earlier deadlines.</p>
              </div>
            </div>
          )}
          
          {parseFloat(completionRate) < 50 && (
            <div className="insight-item insight-info">
              <div className="insight-icon">📊</div>
              <div className="insight-content">
                <h4>Low Completion Rate</h4>
                <p>You're completing less than half of your tasks. Try setting more realistic deadlines and prioritizing better.</p>
              </div>
            </div>
          )}
          
          {mostProductiveHour >= 9 && mostProductiveHour <= 17 && (
            <div className="insight-item insight-success">
              <div className="insight-icon">✅</div>
              <div className="insight-content">
                <h4>Good Work Schedule</h4>
                <p>You're most productive during regular work hours. This is great for maintaining a healthy work-life balance!</p>
              </div>
            </div>
          )}
          
          {analytics.totalTasks === 0 && (
            <div className="insight-item insight-info">
              <div className="insight-icon">🚀</div>
              <div className="insight-content">
                <h4>Get Started!</h4>
                <p>Add your first task to start tracking your productivity and procrastination patterns.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
