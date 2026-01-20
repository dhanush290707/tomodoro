import { X, Target, Clock, Flame, TrendingUp } from 'lucide-react';
import './Statistics.css';

const Statistics = ({ isOpen, onClose, stats }) => {
    if (!isOpen) return null;

    const formatHoursMinutes = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    return (
        <div className="stats-overlay" onClick={onClose}>
            <div className="stats-modal" onClick={(e) => e.stopPropagation()}>
                <div className="stats-header">
                    <h2>Statistics</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="stats-content">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                                <Target size={24} color="var(--primary)" />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.todaySessions}</span>
                                <span className="stat-label">Today's Sessions</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                                <Clock size={24} color="var(--success)" />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">{formatHoursMinutes(stats.todayMinutes)}</span>
                                <span className="stat-label">Focus Time</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                                <Flame size={24} color="var(--warning)" />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.streak} days</span>
                                <span className="stat-label">Current Streak</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                                <TrendingUp size={24} color="var(--primary)" />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.totalSessions}</span>
                                <span className="stat-label">Total Sessions</span>
                            </div>
                        </div>
                    </div>

                    <div className="weekly-overview">
                        <h3>This Week</h3>
                        <div className="weekly-chart">
                            {stats.weeklyData.map((day, index) => (
                                <div key={index} className="day-bar-container">
                                    <div
                                        className="day-bar"
                                        style={{
                                            height: `${Math.max(4, (day.sessions / Math.max(...stats.weeklyData.map(d => d.sessions), 1)) * 100)}%`,
                                            opacity: day.sessions > 0 ? 1 : 0.3
                                        }}
                                    />
                                    <span className="day-label">{day.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
