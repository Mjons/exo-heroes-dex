// src/components/SideMenu.js

import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import './SideMenu.css';

const SideMenu = ({ traits, onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const { isDarkMode } = useTheme();

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
        </div>
    );
};

export default SideMenu;