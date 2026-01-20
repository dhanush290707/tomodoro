import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import Timer from './components/Timer';
import Controls from './components/Controls';
import TaskList from './components/TaskList';
import Quote from './components/Quote';
import Settings from './components/Settings';
import Statistics from './components/Statistics';
import AmbientSound from './components/AmbientSound';
import { useTimer } from './hooks/useTimer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useSound } from './hooks/useSound';
import { useAmbientSound } from './hooks/useAmbientSound';
import { TIMER_MODES, DEFAULT_DURATIONS } from './utils/constants';
import './App.css';

const getDefaultWeeklyData = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days.map(label => ({ label, sessions: 0 }));
};

const getTodayKey = () => new Date().toDateString();

function App() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('pomodoro-dark-mode', true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const [settings, setSettings] = useLocalStorage('pomodoro-settings', {
    durations: DEFAULT_DURATIONS,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    volume: 0.5,
  });

  const [tasks, setTasks] = useLocalStorage('pomodoro-tasks', []);

  const [stats, setStats] = useLocalStorage('pomodoro-stats', {
    todayKey: getTodayKey(),
    todaySessions: 0,
    todayMinutes: 0,
    totalSessions: 0,
    streak: 0,
    lastSessionDate: null,
    weeklyData: getDefaultWeeklyData(),
  });

  const { playNotification } = useSound(settings.volume);

  const [ambientVolume, setAmbientVolume] = useLocalStorage('pomodoro-ambient-volume', 0.3);
  const ambientSound = useAmbientSound(ambientVolume);

  const handleAmbientVolumeChange = useCallback((newVolume) => {
    setAmbientVolume(newVolume);
    ambientSound.setVolume(newVolume);
  }, [setAmbientVolume, ambientSound]);

  const handleSessionComplete = useCallback(() => {
    playNotification();

    // Update statistics
    const today = getTodayKey();
    const dayOfWeek = new Date().getDay();

    setStats(prev => {
      let newStats = { ...prev };

      // Reset daily stats if it's a new day
      if (prev.todayKey !== today) {
        newStats.todayKey = today;
        newStats.todaySessions = 0;
        newStats.todayMinutes = 0;

        // Update streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (prev.lastSessionDate === yesterday.toDateString()) {
          newStats.streak = prev.streak + 1;
        } else if (prev.lastSessionDate !== today) {
          newStats.streak = 1;
        }

        // Reset weekly data if new week
        if (dayOfWeek === 0) {
          newStats.weeklyData = getDefaultWeeklyData();
        }
      }

      // Update session counts
      newStats.todaySessions += 1;
      newStats.todayMinutes += Math.round(settings.durations[TIMER_MODES.FOCUS] / 60);
      newStats.totalSessions += 1;
      newStats.lastSessionDate = today;

      // Update weekly chart
      const weeklyData = [...newStats.weeklyData];
      weeklyData[dayOfWeek].sessions += 1;
      newStats.weeklyData = weeklyData;

      return newStats;
    });
  }, [playNotification, setStats, settings.durations]);

  const timer = useTimer(settings, handleSessionComplete);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          timer.isRunning ? timer.pause() : timer.start();
          break;
        case 'KeyR':
          if (!e.ctrlKey && !e.metaKey) {
            timer.reset();
          }
          break;
        case 'KeyS':
          if (!e.ctrlKey && !e.metaKey) {
            timer.skip();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [timer]);

  // Update document title
  useEffect(() => {
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    document.title = timer.isRunning
      ? `${formatTime(timer.timeLeft)} - Pomodoro Timer`
      : 'Pomodoro Timer';
  }, [timer.timeLeft, timer.isRunning]);

  return (
    <div className="app">
      <div className="app-container">
        <Header
          isDarkMode={isDarkMode}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenStats={() => setIsStatsOpen(true)}
        />

        <div className="main-content">
          <ModeSelector
            currentMode={timer.mode}
            onModeChange={timer.changeMode}
          />

          <Timer
            mode={timer.mode}
            timeLeft={timer.timeLeft}
            progress={timer.progress}
            completedSessions={timer.completedSessions}
          />

          <Controls
            isRunning={timer.isRunning}
            onStart={timer.start}
            onPause={timer.pause}
            onReset={timer.reset}
            onSkip={timer.skip}
            mode={timer.mode}
          />

          <p className="keyboard-hint">
            <kbd>Space</kbd> to play/pause · <kbd>R</kbd> to reset · <kbd>S</kbd> to skip
          </p>

          <Quote />
        </div>

        <TaskList tasks={tasks} setTasks={setTasks} />

        <AmbientSound
          isPlaying={ambientSound.isPlaying}
          currentSound={ambientSound.currentSound}
          sounds={ambientSound.sounds}
          onToggle={ambientSound.toggleSound}
          onChangeSound={ambientSound.changeSound}
          volume={ambientVolume}
          onVolumeChange={handleAmbientVolumeChange}
        />
      </div>

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />

      <Statistics
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
      />
    </div>
  );
}

export default App;
