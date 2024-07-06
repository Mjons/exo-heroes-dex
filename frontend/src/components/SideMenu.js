// src/components/SideMenu.js

import React, { useState } from 'react';
import './SideMenu.css';

const SideMenu = ({ traits, onFilterChange, onBackgroundColorChange, toggleTheme, isDarkMode }) => {
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleFilterChange = (trait, value) => {
        const newFilters = {
            ...selectedFilters,
            [trait]: value,
        };

        if (value === '') {
            delete newFilters[trait];
        }

        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearAllFilters = () => {
        setSelectedFilters({});
        onFilterChange({});
    };

    return (
        <div className={`side-menu ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="color-picker">
                <div
                    className="color-option"
                    style={{ backgroundColor: '#FFA500' }}
                    onClick={() => onBackgroundColorChange('#FFA500')}
                ></div>
                <div
                    className="color-option transparent-option"
                    onClick={() => onBackgroundColorChange('transparent')}
                ></div>
                <input
                    type="color"
                    className="color-option"
                    onChange={(e) => onBackgroundColorChange(e.target.value)}
                />
                <div
                    className="color-option"
                    style={{ backgroundColor: '#auto' }} // Placeholder for dynamic color option
                    onClick={() => onBackgroundColorChange('dynamic')}
                ></div>
            </div>
            <h2>Filter by Traits</h2>
            {Object.entries(traits).map(([trait, values]) => (
                <div key={trait} className="trait-filter">
                    <h3>{trait}</h3>
                    <select
                        value={selectedFilters[trait] || ''}
                        onChange={(e) => handleFilterChange(trait, e.target.value)}
                        className={isDarkMode ? 'dark-mode' : ''}
                    >
                        <option value="">All</option>
                        {values.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            {Object.keys(selectedFilters).length > 0 && (
                <button
                    onClick={clearAllFilters}
                    className={`clear-filters ${isDarkMode ? 'dark-mode' : ''}`}
                >
                    Clear All Filters
                </button>
            )}
            <button onClick={toggleTheme} className="theme-toggle">
                {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </div>
    );
};

export default SideMenu;
