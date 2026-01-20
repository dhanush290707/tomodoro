import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { MODE_COLORS } from '../utils/constants';
import './Controls.css';

const Controls = ({ isRunning, onStart, onPause, onReset, onSkip, mode }) => {
    return (
        <div className="controls-container">
            <button
                className="control-btn secondary"
                onClick={onReset}
                aria-label="Reset timer"
            >
                <RotateCcw size={20} />
            </button>

            <button
                className="control-btn primary"
                onClick={isRunning ? onPause : onStart}
                style={{
                    backgroundColor: MODE_COLORS[mode],
                    boxShadow: `0 8px 30px ${MODE_COLORS[mode]}40`
                }}
                aria-label={isRunning ? 'Pause timer' : 'Start timer'}
            >
                {isRunning ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '3px' }} />}
            </button>

            <button
                className="control-btn secondary"
                onClick={onSkip}
                aria-label="Skip to next session"
            >
                <SkipForward size={20} />
            </button>
        </div>
    );
};

export default Controls;
