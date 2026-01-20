import { Volume2, VolumeX } from 'lucide-react';
import './AmbientSound.css';

const AmbientSound = ({
    isPlaying,
    currentSound,
    sounds,
    onToggle,
    onChangeSound,
    volume,
    onVolumeChange
}) => {
    return (
        <div className="ambient-sound-container">
            <div className="ambient-header">
                <h3>🎵 Ambient Sounds</h3>
                <button
                    className={`ambient-toggle ${isPlaying ? 'playing' : ''}`}
                    onClick={onToggle}
                    aria-label={isPlaying ? 'Stop ambient sound' : 'Play ambient sound'}
                >
                    {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    <span>{isPlaying ? 'Playing' : 'Paused'}</span>
                </button>
            </div>

            <div className="sound-options">
                {Object.entries(sounds).map(([key, sound]) => (
                    <button
                        key={key}
                        className={`sound-option ${currentSound === key ? 'active' : ''}`}
                        onClick={() => onChangeSound(key)}
                    >
                        <span className="sound-emoji">{sound.emoji}</span>
                        <span className="sound-name">{sound.name}</span>
                    </button>
                ))}
            </div>

            <div className="ambient-volume">
                <label>Volume</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="volume-slider"
                />
                <span className="volume-value">{Math.round(volume * 100)}%</span>
            </div>
        </div>
    );
};

export default AmbientSound;
