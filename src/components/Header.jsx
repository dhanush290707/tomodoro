import { useState, useCallback, useEffect } from 'react';
import { Settings, Sun, Moon, BarChart2, Maximize, Minimize, Image } from 'lucide-react';
import './Header.css';

const Header = ({ isDarkMode, onThemeToggle, onOpenSettings, onOpenStats, onOpenBackground }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <header className="header">
            <div className="header-brand">
                <span className="brand-icon">🍅</span>
                <h1 className="brand-name">Pomodoro</h1>
            </div>

            <div className="header-actions">
                <button
                    className="header-btn"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
                <button
                    className="header-btn"
                    onClick={onOpenBackground}
                    aria-label="Change background"
                >
                    <Image size={20} />
                </button>
                <button
                    className="header-btn"
                    onClick={onOpenStats}
                    aria-label="View statistics"
                >
                    <BarChart2 size={20} />
                </button>
                <button
                    className="header-btn"
                    onClick={onThemeToggle}
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                    className="header-btn"
                    onClick={onOpenSettings}
                    aria-label="Open settings"
                >
                    <Settings size={20} />
                </button>
            </div>
        </header>
    );
};

export default Header;


