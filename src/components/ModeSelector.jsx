import { TIMER_MODES, MODE_LABELS, MODE_COLORS } from '../utils/constants';
import './ModeSelector.css';

const ModeSelector = ({ currentMode, onModeChange }) => {
    return (
        <div className="mode-selector">
            {Object.values(TIMER_MODES).map((mode) => (
                <button
                    key={mode}
                    className={`mode-btn ${currentMode === mode ? 'active' : ''}`}
                    onClick={() => onModeChange(mode)}
                    style={currentMode === mode ? {
                        backgroundColor: `${MODE_COLORS[mode]}20`,
                        color: MODE_COLORS[mode],
                        borderColor: MODE_COLORS[mode]
                    } : {}}
                >
                    {MODE_LABELS[mode]}
                </button>
            ))}
        </div>
    );
};

export default ModeSelector;
