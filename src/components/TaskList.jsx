import { useState } from 'react';
import { Plus, Check, Trash2, Circle } from 'lucide-react';
import './TaskList.css';

const TaskList = ({ tasks, setTasks }) => {
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([
                ...tasks,
                { id: Date.now(), text: newTask.trim(), completed: false },
            ]);
            setNewTask('');
        }
    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div className="task-list-container">
            <h3 className="task-list-title">Today's Focus</h3>

            <div className="task-input-wrapper">
                <input
                    type="text"
                    placeholder="What are you working on?"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="task-input"
                />
                <button
                    className="add-task-btn"
                    onClick={addTask}
                    disabled={!newTask.trim()}
                >
                    <Plus size={18} />
                </button>
            </div>

            <div className="task-list">
                {tasks.length === 0 ? (
                    <p className="empty-message">Add a task to stay focused!</p>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`task-item ${task.completed ? 'completed' : ''}`}
                        >
                            <button
                                className="task-toggle"
                                onClick={() => toggleTask(task.id)}
                            >
                                {task.completed ? (
                                    <Check size={16} className="check-icon" />
                                ) : (
                                    <Circle size={16} />
                                )}
                            </button>
                            <span className="task-text">{task.text}</span>
                            <button
                                className="task-delete"
                                onClick={() => deleteTask(task.id)}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;
