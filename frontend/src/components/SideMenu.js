// src/components/SideMenu.js

import React, { useState } from 'react';
import './SideMenu.css';

const SideMenu = ({
    traits,
    onFilterChange,
    onBackgroundColorChange,
    searchQuery,
    setSearchQuery,
    suggestedTraits,
    onTraitSelect,
    onReset,
    isDarkMode,
    onClose
}) => {
    const [selectedTrait, setSelectedTrait] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleTraitClick = (trait) => {
        setSelectedTrait(trait);
    };

    const handleValueSelect = (trait, value) => {
        const newFilters = { ...selectedFilters };
        if (newFilters[trait] === value) {
            delete newFilters[trait];
        } else {
            newFilters[trait] = value;
        }
        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
        setSelectedTrait(null);
    };

    const handleColorChange = (color) => {
        onBackgroundColorChange(color);
    };

    const handleResetClick = () => {
        setSelectedFilters({});
        setSelectedTrait(null);
        onReset();
    };

    return (
        <div className={`side-menu ${isDarkMode ? 'dark-mode' : ''}`}>
            <button className="close-button" onClick={onClose}>&times;</button>

            <input
                type="text"
                placeholder="Search traits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            {suggestedTraits.length > 0 && (
                <ul className="suggestions-list">
                    {suggestedTraits.map((trait, index) => (
                        <li key={index} onClick={() => onTraitSelect(trait)}>
                            {trait}
                        </li>
                    ))}
                </ul>
            )}

            <div className="color-picker">
                <div className="color-options">
                    <div
                        className="color-option"
                        style={{ backgroundColor: '#FFA500' }}
                        onClick={() => handleColorChange('#FFA500')}
                    ></div>
                    <div
                        className="color-option transparent-option"
                        onClick={() => handleColorChange('transparent')}
                    ></div>
                    <input
                        type="color"
                        className="color-option color-input"
                        onChange={(e) => handleColorChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="filter-section">
                <h3>Filter by Traits</h3>
                <div className="breadcrumb">
                    <span className="breadcrumb-item" onClick={() => setSelectedTrait(null)}>All Traits</span>
                    {selectedTrait && (
                        <>
                            <span className="breadcrumb-separator">&gt;</span>
                            <span className="breadcrumb-item">{selectedTrait}</span>
                        </>
                    )}
                </div>
                {!selectedTrait ? (
                    <ul className="trait-list">
                        {Object.keys(traits).map((trait) => (
                            <li key={trait} onClick={() => handleTraitClick(trait)}>
                                {trait}
                                {selectedFilters[trait] && <span className="selected-indicator">•</span>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul className="value-list">
                        {traits[selectedTrait].map((value) => (
                            <li
                                key={value}
                                onClick={() => handleValueSelect(selectedTrait, value)}
                            >
                                {value}
                                {selectedFilters[selectedTrait] === value && <span className="selected-indicator">•</span>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button onClick={handleResetClick} className="reset-button">
                Clear Filters
            </button>
        </div>
    );
};

export default SideMenu;