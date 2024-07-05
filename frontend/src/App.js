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

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const nftData = await fetchNFTs();
                const traitData = await fetchTraits();

                // Log the fetched data to verify its structure
                console.log('NFT Data:', nftData);
                console.log('Trait Data:', traitData);

                if (Array.isArray(nftData)) {
                    setNfts(nftData);
                } else {
                    console.error('Expected nftData to be an array but got', typeof nftData);
                    setError('Unexpected data format from server.');
                }

                setTraits(traitData);
                setError(null);
            } catch (err) {
                console.error('Error loading data:', err);
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

    const filteredNFTs = Array.isArray(nfts) ? nfts.filter((nft) => {
        return Object.entries(filters).every(([trait, value]) => {
            return nft.traits[trait] === value;
        });
    }) : [];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
            <button onClick={toggleTheme} className="theme-toggle">
                {isDarkMode ? '☀️' : '🌙'}
            </button>
            <SideMenu traits={traits} onFilterChange={handleFilterChange} />
            <MainView nfts={filteredNFTs} onNFTClick={handleNFTClick} />
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
