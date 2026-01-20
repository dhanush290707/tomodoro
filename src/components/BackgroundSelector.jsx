import { useState } from 'react';
import { Image, X } from 'lucide-react';
import './BackgroundSelector.css';

const BACKGROUNDS = [
    {
        id: 'none',
        name: 'None',
        preview: 'transparent',
        value: 'none',
    },
    {
        id: 'gradient-sunset',
        name: 'Sunset',
        preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
        id: 'gradient-ocean',
        name: 'Ocean',
        preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
        id: 'gradient-forest',
        name: 'Forest',
        preview: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    },
    {
        id: 'gradient-night',
        name: 'Night Sky',
        preview: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
        value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
    },
    {
        id: 'gradient-aurora',
        name: 'Aurora',
        preview: 'linear-gradient(135deg, #00c6fb 0%, #005bea 50%, #a855f7 100%)',
        value: 'linear-gradient(135deg, #00c6fb 0%, #005bea 50%, #a855f7 100%)',
    },
    {
        id: 'gradient-warm',
        name: 'Warm',
        preview: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        value: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    },
    {
        id: 'gradient-cool',
        name: 'Cool',
        preview: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        value: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    },
    {
        id: 'gradient-lavender',
        name: 'Lavender',
        preview: 'linear-gradient(135deg, #c084fc 0%, #818cf8 100%)',
        value: 'linear-gradient(135deg, #c084fc 0%, #818cf8 100%)',
    },
];

const BackgroundSelector = ({ isOpen, onClose, currentBackground, onBackgroundChange }) => {
    if (!isOpen) return null;

    return (
        <div className="bg-selector-overlay" onClick={onClose}>
            <div className="bg-selector-modal" onClick={(e) => e.stopPropagation()}>
                <div className="bg-selector-header">
                    <div className="bg-selector-title">
                        <Image size={20} />
                        <h2>Background</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="bg-selector-content">
                    <div className="bg-grid">
                        {BACKGROUNDS.map((bg) => (
                            <button
                                key={bg.id}
                                className={`bg-option ${currentBackground === bg.id ? 'active' : ''}`}
                                onClick={() => {
                                    onBackgroundChange(bg.id);
                                    onClose();
                                }}
                            >
                                <div
                                    className="bg-preview"
                                    style={{
                                        background: bg.preview,
                                        border: bg.id === 'none' ? '2px dashed var(--border)' : 'none'
                                    }}
                                >
                                    {bg.id === 'none' && <span className="no-bg-text">∅</span>}
                                </div>
                                <span className="bg-name">{bg.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { BACKGROUNDS };
export default BackgroundSelector;
