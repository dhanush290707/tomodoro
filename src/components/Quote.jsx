import { useState, useEffect } from 'react';
import { QUOTES } from '../utils/constants';
import './Quote.css';

const Quote = () => {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <div className="quote-container">
            <p className="quote-text">"{quote}"</p>
        </div>
    );
};

export default Quote;
