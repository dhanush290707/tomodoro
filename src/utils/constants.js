export const TIMER_MODES = {
    FOCUS: 'focus',
    SHORT_BREAK: 'shortBreak',
    LONG_BREAK: 'longBreak',
};

export const DEFAULT_DURATIONS = {
    [TIMER_MODES.FOCUS]: 25 * 60,
    [TIMER_MODES.SHORT_BREAK]: 5 * 60,
    [TIMER_MODES.LONG_BREAK]: 15 * 60,
};

export const MODE_LABELS = {
    [TIMER_MODES.FOCUS]: 'Focus',
    [TIMER_MODES.SHORT_BREAK]: 'Short Break',
    [TIMER_MODES.LONG_BREAK]: 'Long Break',
};

export const MODE_COLORS = {
    [TIMER_MODES.FOCUS]: 'var(--primary)',
    [TIMER_MODES.SHORT_BREAK]: 'var(--success)',
    [TIMER_MODES.LONG_BREAK]: 'var(--warning)',
};

export const QUOTES = [
    "Stay focused, stay productive.",
    "Small steps lead to big results.",
    "One task at a time.",
    "Progress, not perfection.",
    "You've got this!",
    "Deep work leads to deep satisfaction.",
    "Focus is the new superpower.",
    "Embrace the grind.",
    "Your future self will thank you.",
    "Stay in the zone.",
];

export const LONG_BREAK_INTERVAL = 4;
