import { useCallback, useRef } from 'react';

export const useSound = (volume = 0.5) => {
    const audioRef = useRef(null);

    const playNotification = useCallback(() => {
        try {
            // Create a simple beep using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = volume;

            oscillator.start();

            // Play a double beep
            setTimeout(() => {
                oscillator.stop();

                setTimeout(() => {
                    const oscillator2 = audioContext.createOscillator();
                    const gainNode2 = audioContext.createGain();
                    oscillator2.connect(gainNode2);
                    gainNode2.connect(audioContext.destination);
                    oscillator2.frequency.value = 1000;
                    oscillator2.type = 'sine';
                    gainNode2.gain.value = volume;
                    oscillator2.start();
                    setTimeout(() => oscillator2.stop(), 200);
                }, 150);
            }, 200);
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }, [volume]);

    return { playNotification };
};
