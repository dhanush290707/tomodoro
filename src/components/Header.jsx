import { Settings, Sun, Moon, BarChart2 } from 'lucide-react';
import './Header.css';

const Header = ({ isDarkMode, onThemeToggle, onOpenSettings, onOpenStats }) => {
    return (
        <header className="header">
            <div className="header-brand">
                <span className="brand-icon">🍅</span>
                <h1 className="brand-name">Pomodoro</h1>
            </div>

            <div className="header-actions">
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
