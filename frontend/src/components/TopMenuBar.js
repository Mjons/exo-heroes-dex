// src/components/TopMenuBar.js

import React from 'react';
import './TopMenuBar.css';
import myLogo1 from './my-logo1.png';
import myLogo2 from './my-logo2.png';

const TopMenuBar = ({ toggleFilters, isDarkMode, toggleTheme }) => {
    return (
        <div className={`top-menu-bar ${isDarkMode ? 'dark-mode' : ''}`}>
            <button onClick={toggleFilters}>Filters</button>
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
