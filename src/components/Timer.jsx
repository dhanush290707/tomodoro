import { formatTime } from '../utils/formatTime';
import { MODE_COLORS, MODE_LABELS } from '../utils/constants';
import './Timer.css';

const Timer = ({ mode, timeLeft, progress, completedSessions }) => {
    const circumference = 2 * Math.PI * 140;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="timer-container">
            <div className="timer-ring-wrapper">
                <svg className="timer-ring" viewBox="0 0 300 300">
                    <defs>
                        <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: MODE_COLORS[mode], stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: MODE_COLORS[mode], stopOpacity: 0.6 }} />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <circle
                        className="timer-ring-background"
                        cx="150"
                        cy="150"
                        r="140"
                    />
                    <circle
                        className="timer-ring-progress"
                        cx="150"
                        cy="150"
                        r="140"
                        style={{
                            stroke: `url(#timerGradient)`,
                            strokeDasharray: circumference,
                            strokeDashoffset: strokeDashoffset,
                        }}
                        filter="url(#glow)"
                    />
                </svg>
                <div className="timer-content">
                    <span className="timer-mode-label" style={{ color: MODE_COLORS[mode] }}>
                        {MODE_LABELS[mode]}
                    </span>
                    <span className="timer-display">{formatTime(timeLeft)}</span>
                    <span className="timer-sessions">Session #{completedSessions + 1}</span>
                </div>
            </div>
        </div>
    );
};

export default Timer;
