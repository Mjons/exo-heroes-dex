// src/components/SideMenu.js

import React, { useState, useCallback, useEffect } from 'react';
import './SideMenu.css';
import { throttle } from '../services/throttle';

const SideMenu = ({
    traits,
    onFilterChange,
    onBackgroundColorChange,
    searchQuery,
    setSearchQuery,
    onReset,
    isDarkMode,
    onClose,
    selectedFilters,
    bgColor
}) => {
    const [selectedTrait, setSelectedTrait] = useState(null);
    const [localFilters, setLocalFilters] = useState(selectedFilters);
    const [suggestedTraits, setSuggestedTraits] = useState([]);

    useEffect(() => {
        setLocalFilters(selectedFilters);
        // If a single trait is selected, expand its accordion
        const traits = Object.keys(selectedFilters);
        if (traits.length === 1) {
            setSelectedTrait(traits[0]);
        } else {
            setSelectedTrait(null);
        }
    }, [selectedFilters]);

    const handleTraitClick = (trait) => {
        setSelectedTrait(trait === selectedTrait ? null : trait);
    };

    const handleValueSelect = (trait, value) => {
        const newFilters = { ...localFilters };
        if (newFilters[trait] === value) {
            delete newFilters[trait];
        } else {
            newFilters[trait] = value;
        }
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleColorChange = (color) => {
        throttledBgColorChange(color);
    };

    const throttledBgColorChange = useCallback(
        throttle((color) => {
            onBackgroundColorChange(color);
        }, 100),
        [onBackgroundColorChange]
    );

    const handleResetClick = () => {
        setLocalFilters({});
        setSelectedTrait(null);
        setSearchQuery('');
        onReset();
    };

    const handleSearchSelect = (trait) => {
        const [traitName, traitValue] = trait.split(': ');
        handleValueSelect(traitName, traitValue);
        setSelectedTrait(traitName);
        setSearchQuery('');
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        if (query) {
            const suggestions = Object.entries(traits).flatMap(([trait, values]) =>
                values.filter(value =>
                    value.toLowerCase().includes(query.toLowerCase())
                ).map(value => `${trait}: ${value}`)
            );
            setSuggestedTraits(suggestions);
        } else {
            setSuggestedTraits([]);
        }
    };

    const selectedTraitsCount = Object.keys(localFilters).length;

    return (
        <div className={`side-menu ${isDarkMode ? 'dark-mode' : ''}`}>
            <button className="close-button" onClick={onClose}>&times;</button>

            <div className="color-picker">
                <div className="color-options">
                    <div
                        className={`color-option ${bgColor === '#FFA500' ? 'selected' : ''}`}
                        style={{ backgroundColor: '#FFA500' }}
                        onClick={() => handleColorChange('#FFA500')}
                    ></div>
                    <div
                        className={`color-option transparent-option ${bgColor === 'transparent' ? 'selected' : ''}`}
                        onClick={() => handleColorChange('transparent')}
                    ></div>
                    <input
                        type="color"
                        className="color-option color-input"
                        value={bgColor !== 'transparent' ? bgColor : '#000000'}
                        onChange={(e) => handleColorChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="filter-section">
                <h3>Filter by Traits ({selectedTraitsCount})</h3>
                <input
                    type="text"
                    placeholder="Search traits..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="search-bar"
                />
                {suggestedTraits.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestedTraits.map((trait, index) => (
                            <li key={index} onClick={() => handleSearchSelect(trait)}>
                                {trait}
                            </li>
                        ))}
                    </ul>
                )}
                <ul className="trait-list">
                    {Object.keys(traits).map((trait) => (
                        <li key={trait}>
                            <div onClick={() => handleTraitClick(trait)} className="trait-header">
                                {trait}
                                {localFilters[trait] && <span className="selected-indicator">•</span>}
                            </div>
                            {selectedTrait === trait && (
                                <ul className="value-list">
                                    {traits[trait].map((value) => (
                                        <li
                                            key={value}
                                            onClick={() => handleValueSelect(trait, value)}
                                            className={localFilters[trait] === value ? 'selected' : ''}
                                        >
                                            {value}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={handleResetClick} className="reset-button">
                Clear Filters
            </button>
        </div>
    );
};

export default SideMenu;