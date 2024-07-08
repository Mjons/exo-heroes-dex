// src/components/TopMenuBar.js

import React from 'react';
import './TopMenuBar.css';

const TopMenuBar = ({ toggleFilters, isDarkMode, toggleTheme }) => {
    return (
        <div className={`top-menu-bar ${isDarkMode ? 'dark-mode' : ''}`}>
            <button onClick={toggleFilters}>Filters</button>
            <div className="social-links">
                <a href="https://x.com/ExOHeroesNFT" target="_blank" rel="noopener noreferrer" className="social-link">
                    <img src="/twitter-icon.png" alt="Twitter" className="social-icon" />
                </a>
                <a href="https://discord.gg/Hn9fs7tcdB" target="_blank" rel="noopener noreferrer" className="social-link">
                    <img src="/discord-icon.png" alt="Discord" className="social-icon" />
                </a>
            </div>
            <button onClick={toggleTheme}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
};

export default TopMenuBar;