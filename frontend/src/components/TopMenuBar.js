// src/components/TopMenuBar.js

import React from 'react';
import './TopMenuBar.css';
import myLogo1 from './my-logo1.png';
import myLogo2 from './my-logo2.png';

const TopMenuBar = ({ toggleFilters, isDarkMode, toggleTheme }) => {
    const returnToGame = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl');
        const posX = urlParams.get('posX');
        const posY = urlParams.get('posY');
        const direction = urlParams.get('direction');
        if (returnUrl) {
            window.location.href = `${returnUrl}?posX=${posX}&posY=${posY}&direction=${direction}`;
        } else {
            console.warn('Return URL is not available');
        }
    };

    return (
        <div className={`top-menu-bar ${isDarkMode ? 'dark-mode' : ''}`}>
            <button onClick={toggleFilters} className="menu-button">Filters</button>
            <button onClick={returnToGame} className="menu-button return-button">Back to Lab</button>
            <div className="social-links">
                <a href="https://x.com/ExOHeroesNFT" target="_blank" rel="noopener noreferrer" className="social-link">
                    <img src={myLogo1} alt="Logo 1" className="social-icon" />
                </a>
                <a href="https://discord.com/invite/Hn9fs7tcdB" target="_blank" rel="noopener noreferrer" className="social-link">
                    <img src={myLogo2} alt="Logo 2" className="social-icon" />
                </a>
            </div>
            <button onClick={toggleTheme}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
};

export default TopMenuBar;
