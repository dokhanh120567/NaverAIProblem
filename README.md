[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHSq4TPZ)
# To-Do App – Preliminary Assignment Submission
⚠️ Please complete **all sections marked with the ✍️ icon** — these are required for your submission.

👀 Please Check ASSIGNMENT.md file in this repository for assignment requirements.

## 🚀 Project Setup & Usage
**How to install and run your project:**  
- Clone the repository: `git clone [repository-url]`
- Navigate to the project directory: `cd web-track-naver-vietnam-ai-hackathon-dokhanh120567-main`
- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- Open your browser and navigate to `http://localhost:5173`

## 🔗 Deployed Web URL or APK file
**Live Demo:** [Deploy to Vercel/Netlify and add link here]


## 🎥 Demo Video
**Demo video link (≤ 2 minutes):**  
📌 **Video Upload Guideline:** when uploading your demo video to YouTube, please set the visibility to **Unlisted**.  
- "Unlisted" videos can only be viewed by users who have the link.  
- The video will not appear in search results or on your channel.  
- Share the link in your README so mentors can access it.  

**Demo Video:** [Create and upload demo video, then add YouTube link here]


## 💻 Project Introduction

### a. Overview

**Smart Student Planner** is a comprehensive time management solution designed specifically for Vietnamese university students. The application addresses the common challenge of juggling multiple academic responsibilities, part-time work, and personal commitments by providing an intelligent, procrastination-aware task management system.

The app combines traditional task management features with advanced analytics and behavioral insights to help students understand their productivity patterns, identify procrastination triggers, and optimize their study schedules for maximum efficiency.

### b. Key Features & Function Manual

**Core Features:**
- **Smart Task Management**: Create, edit, delete, and track tasks with detailed metadata including priority levels, categories, and estimated completion times
- **Three Distinct Views**: 
  - **Dashboard**: Priority-sorted task list with procrastination warnings and quick actions
  - **Calendar**: Visual timeline showing tasks by day, week, or month with deadline visualization
  - **Analytics**: Comprehensive insights into productivity patterns, procrastination trends, and performance metrics
- **Procrastination Detection**: AI-powered algorithm that calculates procrastination scores based on task creation vs. deadline proximity
- **Persistent Storage**: All data is automatically saved to localStorage with backup capabilities
- **Advanced Filtering**: Search, filter, and sort tasks by multiple criteria (status, priority, category, due date)
- **Time Tracking**: Monitor estimated vs. actual completion times for better future planning
- **Category Management**: Organize tasks by type (assignments, exams, projects, personal, work)
- **Responsive Design**: Optimized for both desktop and mobile devices

**How to Use:**
1. **Add Tasks**: Click "Add Task" to create new assignments with due dates and time estimates
2. **Manage Tasks**: Use the Dashboard to start, complete, edit, or delete tasks
3. **Plan Schedule**: Use the Calendar view to visualize deadlines and plan your week
4. **Track Progress**: Monitor your productivity patterns in the Analytics section
5. **Get Insights**: Receive personalized recommendations based on your procrastination patterns

### c. Unique Features (What's special about this app?) 

**🎯 Procrastination-Aware Intelligence:**
- Advanced algorithm that calculates procrastination scores based on task creation timing vs. deadline proximity
- Real-time warnings when procrastination levels exceed 60%
- Personalized insights and recommendations to improve productivity habits

**📊 Behavioral Analytics:**
- Comprehensive productivity tracking across different time periods
- Visual charts showing procrastination trends over the last 7 days
- Hourly productivity analysis to identify optimal work times
- Category-based task distribution analysis

**🚨 Smart Priority System:**
- Dynamic priority calculation that considers deadline urgency, task category, and procrastination history
- Visual priority indicators with color-coded task cards
- Automatic priority adjustments based on approaching deadlines

**📅 Multi-View Calendar System:**
- Month view: Overview of all tasks with visual density indicators
- Week view: Detailed daily breakdown with task previews
- Day view: Focused view for daily planning and task management

**⚡ Performance Optimizations:**
- Efficient localStorage management with automatic data persistence
- Responsive design that works seamlessly on all devices
- Fast filtering and search capabilities even with 20+ tasks
- Smooth animations and transitions for enhanced user experience

### d. Technology Stack and Implementation Methods

**Frontend Technologies:**
- **React 19.1.1**: Modern React with hooks for state management and component lifecycle
- **TypeScript**: Strong typing for better code quality and developer experience
- **Vite**: Fast build tool and development server for optimal performance
- **CSS3**: Custom styling with modern features like CSS Grid, Flexbox, and CSS Variables

**Architecture & Patterns:**
- **Component-Based Architecture**: Modular, reusable components for maintainability
- **Custom Hooks**: Encapsulated logic for data management and business rules
- **Type-Safe State Management**: TypeScript interfaces for all data structures
- **Local Storage Integration**: Persistent data storage with error handling
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

**Key Implementation Details:**
- **Procrastination Algorithm**: Custom mathematical model calculating scores based on time ratios and deadline proximity
- **Priority Calculation**: Dynamic algorithm considering multiple factors (category, deadline, procrastination history)
- **Data Persistence**: Automatic localStorage synchronization with backup and recovery mechanisms
- **Performance Optimization**: Efficient rendering with React.memo and optimized re-renders
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

**Development Tools:**
- **ESLint**: Code quality and consistency enforcement
- **TypeScript Compiler**: Type checking and modern JavaScript features
- **Vite Dev Server**: Hot module replacement for rapid development
- **Git**: Version control and collaboration

### e. Service Architecture & Database structure (when used)

**Client-Side Architecture:**
- **Single Page Application (SPA)**: React-based SPA with client-side routing
- **Component Hierarchy**: 
  - App (Root component with state management)
  - Dashboard, Calendar, Analytics (Main view components)
  - TaskForm (Modal component for task creation/editing)
- **State Management**: React hooks (useState, useEffect) for local state
- **Data Flow**: Unidirectional data flow with props and callbacks

**Data Storage Structure:**
- **LocalStorage Schema**:
  ```typescript
  // Tasks Storage
  {
    id: string,
    title: string,
    description: string,
    dueDate: string (ISO format),
    estimatedTime: number (minutes),
    actualTime?: number (minutes),
    priority: 'low' | 'medium' | 'high',
    category: 'assignment' | 'exam' | 'project' | 'personal' | 'work',
    status: 'pending' | 'in-progress' | 'completed',
    createdAt: string (ISO format),
    completedAt?: string (ISO format),
    procrastinationScore?: number (0-100)
  }
  
  // Study Sessions Storage
  {
    id: string,
    taskId: string,
    startTime: string (ISO format),
    endTime?: string (ISO format),
    duration?: number (minutes),
    productivity: number (1-10 scale),
    notes?: string
  }
  ```

**Data Persistence Strategy:**
- **Automatic Synchronization**: Real-time localStorage updates on state changes
- **Error Handling**: Graceful fallbacks for storage failures
- **Data Validation**: Type checking and data integrity validation
- **Backup Strategy**: Multiple storage keys for different data types

**Future Scalability Considerations:**
- **API Integration Ready**: Component structure supports easy migration to backend APIs
- **Database Migration Path**: Clear data models ready for SQL/NoSQL database integration
- **Real-time Updates**: Architecture supports WebSocket integration for collaborative features
- **Offline Support**: Current localStorage approach provides full offline functionality

## 🧠 Reflection

### a. If you had more time, what would you expand?

**Enhanced AI Features:**
- **Smart Scheduling**: AI-powered automatic task scheduling based on productivity patterns and available time slots
- **Predictive Analytics**: Machine learning models to predict task completion times and procrastination risks
- **Personalized Recommendations**: AI-driven suggestions for optimal study times and task prioritization
- **Natural Language Processing**: Voice input for task creation and smart task parsing from text

**Collaborative Features:**
- **Group Projects**: Shared task boards for team assignments with real-time collaboration
- **Study Groups**: Connect with classmates for shared study sessions and accountability
- **Peer Accountability**: Optional sharing of progress with study partners
- **Professor Integration**: Direct integration with university systems for assignment imports

**Advanced Analytics:**
- **Long-term Trends**: Historical analysis spanning semesters and academic years
- **Goal Setting**: SMART goal tracking with progress visualization
- **Habit Formation**: Streak tracking and habit-building features
- **Performance Benchmarking**: Compare productivity against peers (anonymized)

**Mobile App Development:**
- **Native iOS/Android Apps**: Full-featured mobile applications with offline sync
- **Push Notifications**: Smart reminders based on procrastination patterns
- **Widget Integration**: Home screen widgets for quick task access
- **Biometric Integration**: Focus mode with distraction blocking


### b. If you integrate AI APIs more for your app, what would you do?

**Intelligent Task Management:**
- **OpenAI GPT Integration**: Natural language task creation and automatic categorization
- **Smart Task Breakdown**: AI-powered decomposition of complex projects into manageable subtasks
- **Intelligent Time Estimation**: Machine learning models trained on user's historical completion times
- **Contextual Suggestions**: AI recommendations for similar tasks based on current workload

**Advanced Behavioral Analysis:**
- **Sentiment Analysis**: Analyze task descriptions and notes to detect stress levels and motivation
- **Pattern Recognition**: Deep learning models to identify personal productivity patterns and optimal work conditions
- **Predictive Procrastination**: AI models to predict when users are likely to procrastinate and proactive interventions
- **Adaptive Scheduling**: Dynamic calendar optimization based on energy levels and task complexity

**Personalized AI Assistant:**
- **Chatbot Integration**: Conversational interface for task management and study planning
- **Voice Commands**: Speech-to-text integration for hands-free task creation and updates
- **Smart Reminders**: AI-powered notification timing based on user behavior and task urgency
- **Learning Recommendations**: Personalized study suggestions based on academic performance and learning style

**Data-Driven Insights:**
- **Academic Performance Prediction**: AI models to predict grades and suggest improvement strategies
- **Workload Optimization**: Intelligent recommendations for task distribution across time periods
- **Stress Level Monitoring**: AI analysis of task patterns to detect and prevent burnout
- **Success Pattern Recognition**: Machine learning to identify what makes users most productive and successful


## ✅ Checklist
- [x] Code runs without errors  
- [x] All required features implemented (add/edit/delete/complete tasks)  
- [x] All ✍️ sections are filled
- [x] Full CRUD operations implemented
- [x] Persistent storage with localStorage
- [x] Three different views (Dashboard, Calendar, Analytics)
- [x] Time/date handling and deadline management
- [x] Support for 20+ items with search and filtering
- [x] Unique procrastination-aware features
- [x] Responsive design for all devices
- [x] Complete documentation in README.md  
