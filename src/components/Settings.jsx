import { useState } from 'react';
import { X, Volume2, Clock, Zap } from 'lucide-react';
import { TIMER_MODES, MODE_LABELS } from '../utils/constants';
import { formatMinutes } from '../utils/formatTime';
import './Settings.css';

const Settings = ({ isOpen, onClose, settings, onSettingsChange }) => {
    const [localSettings, setLocalSettings] = useState(settings);

    const handleDurationChange = (mode, value) => {
        const newDurations = {
            ...localSettings.durations,
            [mode]: parseInt(value) * 60,
        };
        setLocalSettings({ ...localSettings, durations: newDurations });
    };

    const handleToggle = (key) => {
        setLocalSettings({ ...localSettings, [key]: !localSettings[key] });
    };

    const handleVolumeChange = (value) => {
        setLocalSettings({ ...localSettings, volume: parseFloat(value) });
    };

    const handleSave = () => {
        onSettingsChange(localSettings);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="settings-overlay" onClick={onClose}>
            <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
                <div className="settings-header">
                    <h2>Settings</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="settings-content">
                    <div className="settings-section">
                        <div className="section-header">
                            <Clock size={18} />
                            <h3>Timer Durations (minutes)</h3>
                        </div>
                        {Object.values(TIMER_MODES).map((mode) => (
                            <div key={mode} className="setting-row">
                                <label>{MODE_LABELS[mode]}</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    value={formatMinutes(localSettings.durations[mode])}
                                    onChange={(e) => handleDurationChange(mode, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="settings-section">
                        <div className="section-header">
                            <Zap size={18} />
                            <h3>Automation</h3>
                        </div>
                        <div className="setting-row">
                            <label>Auto-start Breaks</label>
                            <button
                                className={`toggle-btn ${localSettings.autoStartBreaks ? 'active' : ''}`}
                                onClick={() => handleToggle('autoStartBreaks')}
                            >
                                <span className="toggle-slider" />
                            </button>
                        </div>
                        <div className="setting-row">
                            <label>Auto-start Pomodoros</label>
                            <button
                                className={`toggle-btn ${localSettings.autoStartPomodoros ? 'active' : ''}`}
                                onClick={() => handleToggle('autoStartPomodoros')}
                            >
                                <span className="toggle-slider" />
                            </button>
                        </div>
                    </div>

                    <div className="settings-section">
                        <div className="section-header">
                            <Volume2 size={18} />
                            <h3>Sound Volume</h3>
                        </div>
                        <div className="setting-row">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={localSettings.volume}
                                onChange={(e) => handleVolumeChange(e.target.value)}
                                className="volume-slider"
                            />
                            <span className="volume-value">{Math.round(localSettings.volume * 100)}%</span>
                        </div>
                    </div>
                </div>

                <div className="settings-footer">
                    <button className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
