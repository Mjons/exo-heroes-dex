// /frontend/src/components/SideMenu.js

import React, { useState } from 'react';
import './SideMenu.css';

const SideMenu = ({ traits, onFilterChange, onBackgroundColorChange, searchQuery, setSearchQuery, suggestedTraits, onTraitSelect, onReset }) => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

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

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex === suggestedTraits.length - 1 ? 0 : prevIndex + 1
            );
        } else if (e.key === 'ArrowUp') {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex === 0 ? suggestedTraits.length - 1 : prevIndex - 1
            );
        } else if (e.key === 'Enter') {
            onTraitSelect(suggestedTraits[activeSuggestionIndex]);
        }
    };

    const handleResetClick = () => {
        setSelectedFilters({});
        setSearchQuery('');
        onReset();
    };

    return (
        <div className="side-menu">
            <input 
                type="text" 
                placeholder="Search traits..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                onKeyDown={handleKeyDown}
                className="search-bar" 
            />
            {suggestedTraits.length > 0 && (
                <ul className="suggestions-list">
                    {suggestedTraits.map((trait, index) => (
                        <li 
                            key={index} 
                            className={index === activeSuggestionIndex ? 'active' : ''}
                            onClick={() => onTraitSelect(trait)}
                        >
                            {trait}
                        </li>
                    ))}
                </ul>
            )}
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
                
            </div>
            <h2>Filter by Traits</h2>
            {Object.entries(traits).map(([trait, values]) => (
                <div key={trait} className="trait-filter">
                    <h3>{trait}</h3>
                    <select
                        value={selectedFilters[trait] || ''}
                        onChange={(e) => handleFilterChange(trait, e.target.value)}
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
            <button onClick={handleResetClick} className="reset-button">
                Clear Filters
            </button>
        </div>
    );
};

export default SideMenu;
