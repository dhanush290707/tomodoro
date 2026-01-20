import { useState, useRef, useCallback, useEffect } from 'react';

// Ambient sound URLs (free, royalty-free sources)
const AMBIENT_SOUNDS = {
    rain: {
        name: 'Rain',
        emoji: '🌧️',
        // Using procedural audio
        type: 'procedural',
    },
    forest: {
        name: 'Forest',
        emoji: '🌲',
        type: 'procedural',
    },
    ocean: {
        name: 'Ocean',
        emoji: '🌊',
        type: 'procedural',
    },
    whitenoise: {
        name: 'White Noise',
        emoji: '📻',
        type: 'procedural',
    },
    brownnoise: {
        name: 'Brown Noise',
        emoji: '🟤',
        type: 'procedural',
    },
};

export const useAmbientSound = (volume = 0.3) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSound, setCurrentSound] = useState('rain');
    const audioContextRef = useRef(null);
    const sourceNodeRef = useRef(null);
    const gainNodeRef = useRef(null);
    const noiseBufferRef = useRef(null);

    // Create noise buffer based on type
    const createNoiseBuffer = useCallback((type) => {
        if (!audioContextRef.current) return null;

        const ctx = audioContextRef.current;
        const bufferSize = ctx.sampleRate * 2; // 2 seconds buffer
        const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

        for (let channel = 0; channel < 2; channel++) {
            const data = buffer.getChannelData(channel);

            if (type === 'whitenoise') {
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }
            } else if (type === 'brownnoise') {
                let lastOut = 0;
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    data[i] = (lastOut + (0.02 * white)) / 1.02;
                    lastOut = data[i];
                    data[i] *= 3.5; // Amplify
                }
            } else if (type === 'rain') {
                // Rain-like sound (filtered noise with occasional drops)
                let lastOut = 0;
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    // Low-pass filter effect
                    data[i] = (lastOut + (0.1 * white)) / 1.1;
                    lastOut = data[i];
                    // Add occasional "drops"
                    if (Math.random() < 0.001) {
                        data[i] += (Math.random() - 0.5) * 0.5;
                    }
                    data[i] *= 2;
                }
            } else if (type === 'ocean') {
                // Ocean-like sound (modulated noise)
                for (let i = 0; i < bufferSize; i++) {
                    const t = i / ctx.sampleRate;
                    const modulation = Math.sin(t * 0.2) * 0.5 + 0.5;
                    const noise = Math.random() * 2 - 1;
                    data[i] = noise * modulation * 0.3;
                }
            } else if (type === 'forest') {
                // Forest-like ambient (soft noise with chirps)
                let lastOut = 0;
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    data[i] = (lastOut + (0.05 * white)) / 1.05;
                    lastOut = data[i];
                    // Bird chirp-like sounds
                    if (Math.random() < 0.0002) {
                        const chirpLength = Math.min(500, bufferSize - i);
                        for (let j = 0; j < chirpLength && i + j < bufferSize; j++) {
                            const freq = 2000 + Math.random() * 2000;
                            data[i + j] += Math.sin(j * freq / ctx.sampleRate * Math.PI * 2) *
                                Math.exp(-j / 100) * 0.1;
                        }
                    }
                    data[i] *= 1.5;
                }
            }
        }

        return buffer;
    }, []);

    const startSound = useCallback((soundType) => {
        try {
            // Create audio context if needed
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            const ctx = audioContextRef.current;

            // Resume context if suspended
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            // Stop any existing sound
            if (sourceNodeRef.current) {
                sourceNodeRef.current.stop();
                sourceNodeRef.current.disconnect();
            }

            // Create gain node
            gainNodeRef.current = ctx.createGain();
            gainNodeRef.current.gain.value = volume;
            gainNodeRef.current.connect(ctx.destination);

            // Create and play noise buffer
            noiseBufferRef.current = createNoiseBuffer(soundType);
            sourceNodeRef.current = ctx.createBufferSource();
            sourceNodeRef.current.buffer = noiseBufferRef.current;
            sourceNodeRef.current.loop = true;
            sourceNodeRef.current.connect(gainNodeRef.current);
            sourceNodeRef.current.start();

            setIsPlaying(true);
            setCurrentSound(soundType);
        } catch (error) {
            console.error('Error starting ambient sound:', error);
        }
    }, [volume, createNoiseBuffer]);

    const stopSound = useCallback(() => {
        try {
            if (sourceNodeRef.current) {
                sourceNodeRef.current.stop();
                sourceNodeRef.current.disconnect();
                sourceNodeRef.current = null;
            }
            setIsPlaying(false);
        } catch (error) {
            console.error('Error stopping ambient sound:', error);
        }
    }, []);

    const toggleSound = useCallback(() => {
        if (isPlaying) {
            stopSound();
        } else {
            startSound(currentSound);
        }
    }, [isPlaying, currentSound, startSound, stopSound]);

    const changeSound = useCallback((soundType) => {
        if (isPlaying) {
            stopSound();
            setTimeout(() => startSound(soundType), 100);
        } else {
            setCurrentSound(soundType);
        }
    }, [isPlaying, startSound, stopSound]);

    const setVolume = useCallback((newVolume) => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = newVolume;
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (sourceNodeRef.current) {
                sourceNodeRef.current.stop();
                sourceNodeRef.current.disconnect();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    return {
        isPlaying,
        currentSound,
        sounds: AMBIENT_SOUNDS,
        toggleSound,
        changeSound,
        startSound,
        stopSound,
        setVolume,
    };
};
