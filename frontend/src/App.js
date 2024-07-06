// src/App.js

import React, { useState, useEffect } from 'react';
import MainView from './components/MainView';
import SideMenu from './components/SideMenu';
import ImageModal from './components/ImageModal';
import { fetchNFTs, fetchTraits } from './services/api';
import { ThemeProvider, useTheme } from './ThemeContext';
import './App.css';

function AppContent() {
    const [nfts, setNfts] = useState([]);
    const [traits, setTraits] = useState({});
    const [selectedNFT, setSelectedNFT] = useState(null);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isDarkMode, toggleTheme } = useTheme();
    const [bgColor, setBgColor] = useState('#00000000');
    const [gridSize, setGridSize] = useState('small'); // New state for grid size
    const [showFilters, setShowFilters] = useState(false); // New state for showing filters

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const nftData = await fetchNFTs();
                const traitData = await fetchTraits();

                if (Array.isArray(nftData)) {
                    setNfts(nftData);
                } else {
                    setError('Unexpected data format from server.');
                }

                if (typeof traitData === 'object' && traitData !== null) {
                    setTraits(traitData);
                } else {
                    setError('Unexpected data format from server.');
                }

                setError(null);
            } catch (err) {
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleNFTClick = (nft) => {
        setSelectedNFT(nft);
    };

    const handleCloseModal = () => {
        setSelectedNFT(null);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleBackgroundColorChange = (color) => {
        setBgColor(color);
    };

    const toggleGridSize = () => {
        setGridSize((prevSize) => (prevSize === 'small' ? 'large' : 'small'));
    };

    const filteredNFTs = nfts.filter((nft) => {
        return Object.entries(filters).every(([trait, value]) => {
            return nft.traits[trait] === value;
        });
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
            <button onClick={() => setShowFilters(!showFilters)} className="filter-toggle">
                {showFilters ? 'Hide Filters' : 'Filter'}
            </button>

            {showFilters && (
                <SideMenu
                    traits={traits}
                    onFilterChange={handleFilterChange}
                    onBackgroundColorChange={handleBackgroundColorChange}
                    toggleTheme={toggleTheme} // Pass the toggleTheme function to SideMenu
                    isDarkMode={isDarkMode}   // Pass the isDarkMode state to SideMenu
                />
            )}
            <MainView nfts={filteredNFTs} onNFTClick={handleNFTClick} bgColor={bgColor} gridSize={gridSize} />
            {selectedNFT && (
                <ImageModal nft={selectedNFT} onClose={handleCloseModal} />
            )}
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
