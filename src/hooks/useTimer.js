import { useState, useEffect, useCallback, useRef } from 'react';
import { TIMER_MODES, DEFAULT_DURATIONS, LONG_BREAK_INTERVAL } from '../utils/constants';

export const useTimer = (settings, onComplete) => {
    const [mode, setMode] = useState(TIMER_MODES.FOCUS);
    const [timeLeft, setTimeLeft] = useState(settings.durations[TIMER_MODES.FOCUS]);
    const [isRunning, setIsRunning] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const intervalRef = useRef(null);

    const totalTime = settings.durations[mode];
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    useEffect(() => {
        setTimeLeft(settings.durations[mode]);
    }, [mode, settings.durations]);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleSessionComplete();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeLeft]);

    const handleSessionComplete = () => {
        setIsRunning(false);
        onComplete?.();

        if (mode === TIMER_MODES.FOCUS) {
            const newCompletedSessions = completedSessions + 1;
            setCompletedSessions(newCompletedSessions);

            if (newCompletedSessions % LONG_BREAK_INTERVAL === 0) {
                if (settings.autoStartBreaks) {
                    setMode(TIMER_MODES.LONG_BREAK);
                    setTimeout(() => setIsRunning(true), 500);
                } else {
                    setMode(TIMER_MODES.LONG_BREAK);
                }
            } else {
                if (settings.autoStartBreaks) {
                    setMode(TIMER_MODES.SHORT_BREAK);
                    setTimeout(() => setIsRunning(true), 500);
                } else {
                    setMode(TIMER_MODES.SHORT_BREAK);
                }
            }
        } else {
            if (settings.autoStartPomodoros) {
                setMode(TIMER_MODES.FOCUS);
                setTimeout(() => setIsRunning(true), 500);
            } else {
                setMode(TIMER_MODES.FOCUS);
            }
        }
    };

    const start = useCallback(() => {
        setIsRunning(true);
    }, []);

    const pause = useCallback(() => {
        setIsRunning(false);
    }, []);

    const reset = useCallback(() => {
        setIsRunning(false);
        setTimeLeft(settings.durations[mode]);
    }, [mode, settings.durations]);

    const skip = useCallback(() => {
        setIsRunning(false);
        if (mode === TIMER_MODES.FOCUS) {
            const newCompletedSessions = completedSessions + 1;
            setCompletedSessions(newCompletedSessions);
            if (newCompletedSessions % LONG_BREAK_INTERVAL === 0) {
                setMode(TIMER_MODES.LONG_BREAK);
            } else {
                setMode(TIMER_MODES.SHORT_BREAK);
            }
        } else {
            setMode(TIMER_MODES.FOCUS);
        }
    }, [mode, completedSessions]);

    const changeMode = useCallback((newMode) => {
        setIsRunning(false);
        setMode(newMode);
    }, []);

    return {
        mode,
        timeLeft,
        isRunning,
        progress,
        completedSessions,
        start,
        pause,
        reset,
        skip,
        changeMode,
    };
};
