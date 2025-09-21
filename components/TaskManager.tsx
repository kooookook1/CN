import React, { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: Date;
  category: string;
}

const TaskManager: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Security Audit',
      description: 'Perform comprehensive security audit on main servers',
      priority: 'high',
      status: 'in-progress',
      dueDate: new Date(Date.now() + 86400000),
      category: 'Security'
    },
    {
      id: '2',
      title: 'Update Firewall Rules',
      description: 'Review and update firewall configurations',
      priority: 'medium',
      status: 'pending',
      dueDate: new Date(Date.now() + 172800000),
      category: 'Network'
    },
    {
      id: '3',
      title: 'Backup System',
      description: 'Complete system backup and verify integrity',
      priority: 'critical',
      status: 'pending',
      dueDate: new Date(Date.now() + 43200000),
      category: 'Maintenance'
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    category: 'General'
  });

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'var(--color-accent)';
      case 'medium': return 'var(--color-warning)';
      case 'high': return 'var(--color-secondary)';
      case 'critical': return 'var(--color-danger)';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'in-progress':
        return (
          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        ...newTask,
        status: 'pending',
        dueDate: new Date(Date.now() + 86400000)
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', priority: 'medium', category: 'General' });
      setShowAddTask(false);
    }
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-orbitron gradient-text">Task Manager</h3>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="btn btn-glass btn-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      {/* نموذج إضافة مهمة */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="card p-4 space-y-3">
              <input
                type="text"
                placeholder="Task title..."
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-2 bg-[var(--color-surface)] rounded-lg border border-[var(--color-primary)]/30 focus:border-[var(--color-primary)] outline-none"
              />
              <textarea
                placeholder="Description..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full px-4 py-2 bg-[var(--color-surface)] rounded-lg border border-[var(--color-primary)]/30 focus:border-[var(--color-primary)] outline-none resize-none"
                rows={3}
              />
              <div className="flex gap-3">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                  className="flex-1 px-4 py-2 bg-[var(--color-surface)] rounded-lg border border-[var(--color-primary)]/30 focus:border-[var(--color-primary)] outline-none"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="critical">Critical</option>
                </select>
                <input
                  type="text"
                  placeholder="Category"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="flex-1 px-4 py-2 bg-[var(--color-surface)] rounded-lg border border-[var(--color-primary)]/30 focus:border-[var(--color-primary)] outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={addTask} className="btn btn-primary btn-sm flex-1">
                  Add Task
                </button>
                <button onClick={() => setShowAddTask(false)} className="btn btn-outline btn-sm flex-1">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* قائمة المهام */}
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="card p-4 hover:bg-[var(--color-surface-hover)] transition-all"
            >
              <div className="flex items-start gap-3">
                <div 
                  className="mt-1"
                  style={{ color: getPriorityColor(task.priority) }}
                >
                  {getStatusIcon(task.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-[var(--color-text)]">{task.title}</h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">{task.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-[var(--color-text-tertiary)]">
                          {task.category}
                        </span>
                        <span className="text-xs text-[var(--color-text-tertiary)]">
                          Due: {task.dueDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                        className="text-xs px-2 py-1 bg-[var(--color-surface)] rounded border border-[var(--color-primary)]/30 outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* شريط التقدم */}
              <div className="mt-3 h-1 bg-[var(--color-surface)] rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: task.status === 'completed' ? '100%' : task.status === 'in-progress' ? '50%' : '10%',
                    backgroundColor: getPriorityColor(task.priority)
                  }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ملخص المهام */}
      <div className="mt-6 pt-4 border-t border-[var(--color-primary)]/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--color-warning)]">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-xs text-[var(--color-text-tertiary)]">Pending</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--color-primary)]">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-xs text-[var(--color-text-tertiary)]">In Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--color-accent)]">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-xs text-[var(--color-text-tertiary)]">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;