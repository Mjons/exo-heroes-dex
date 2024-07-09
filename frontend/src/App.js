// src/App.js

import React, { useState, useEffect, useCallback } from 'react';
import MainView from './components/MainView';
import SideMenu from './components/SideMenu';
import ImageModal from './components/ImageModal';
import TopMenuBar from './components/TopMenuBar';
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
    const [bgColor, setBgColor] = useState('#FFA500'); // Default to orange
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestedTraits, setSuggestedTraits] = useState([]);
    const [noMatchingTraits, setNoMatchingTraits] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(2); // Default zoom level (middle)

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

        // Check screen width to determine initial filter state
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        setShowFilters(mediaQuery.matches);

        const handleResize = () => {
            setShowFilters(window.innerWidth >= 768);
        };

        mediaQuery.addListener(handleResize);
        return () => mediaQuery.removeListener(handleResize);
    }, []);

    const handleNFTClick = useCallback((nft) => {
        setSelectedNFT(nft);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedNFT(null);
    }, []);

    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    const handleBackgroundColorChange = useCallback((color) => {
        setBgColor(color);
    }, []);

    const handleSearchChange = useCallback((query) => {
        setSearchQuery(query);
        if (query) {
            const newSuggestedTraits = Object.keys(traits).reduce((acc, trait) => {
                const matchingValues = traits[trait].filter(value =>
                    value.toLowerCase().includes(query.toLowerCase())
                );
                return acc.concat(matchingValues.map(value => `${trait}: ${value}`));
            }, []);
            setSuggestedTraits(newSuggestedTraits);
            setNoMatchingTraits(newSuggestedTraits.length === 0);
        } else {
            setSuggestedTraits([]);
            setNoMatchingTraits(false);
        }
    }, [traits]);

    const handleTraitSelect = useCallback((trait) => {
        const [traitName, traitValue] = trait.split(': ');
        setFilters(prevFilters => ({ ...prevFilters, [traitName]: traitValue }));
        setSearchQuery('');
        setSuggestedTraits([]);
        setNoMatchingTraits(false);
    }, []);

    const handleReset = useCallback(() => {
        setFilters({});
        setSearchQuery('');
        setSuggestedTraits([]);
        setNoMatchingTraits(false);
    }, []);

    const toggleFilters = useCallback(() => {
        setShowFilters(prev => !prev);
    }, []);

    const handleZoomIn = useCallback(() => {
        setZoomLevel((prev) => Math.min(prev + 1, 4));
    }, []);

    const handleZoomOut = useCallback(() => {
        setZoomLevel((prev) => Math.max(prev - 1, 0));
    }, []);

    const filteredNFTs = nfts.filter((nft) => {
        return Object.entries(filters).every(([filterType, filterValue]) => {
            return nft.traits[filterType] === filterValue;
        });
    });

    useEffect(() => {
        if (!searchQuery.trim()) {
            setNoMatchingTraits(false);
        } else {
            setNoMatchingTraits(filteredNFTs.length === 0);
        }
    }, [filteredNFTs, searchQuery]);

    const handleTraitClickFromModal = (trait, value) => {
        setFilters({ [trait]: value });  // This replaces all filters with just the clicked trait
        setSelectedNFT(null);  // Close the modal
    };

    const handlePrev = () => {
        if (!selectedNFT) return;
        const currentIndex = filteredNFTs.findIndex(nft => nft.id === selectedNFT.id);
        if (currentIndex > 0) {
            setSelectedNFT(filteredNFTs[currentIndex - 1]);
        }
    };

    const handleNext = () => {
        if (!selectedNFT) return;
        const currentIndex = filteredNFTs.findIndex(nft => nft.id === selectedNFT.id);
        if (currentIndex < filteredNFTs.length - 1) {
            setSelectedNFT(filteredNFTs[currentIndex + 1]);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
            <TopMenuBar
                toggleFilters={toggleFilters}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                zoomLevel={zoomLevel}
            />
            <div className="content-area">
                {showFilters && (
                    <SideMenu
                        traits={traits}
                        onFilterChange={handleFilterChange}
                        onBackgroundColorChange={handleBackgroundColorChange}
                        searchQuery={searchQuery}
                        setSearchQuery={handleSearchChange}
                        suggestedTraits={suggestedTraits}
                        onTraitSelect={handleTraitSelect}
                        onReset={handleReset}
                        isDarkMode={isDarkMode}
                        onClose={() => setShowFilters(false)}
                        bgColor={bgColor}
                        selectedFilters={filters}
                    />
                )}
                <div className="main-content">
                    <div className="grid-container">
                        <MainView
                            nfts={filteredNFTs}
                            onNFTClick={handleNFTClick}
                            bgColor={bgColor}
                            noMatchingTraits={noMatchingTraits}
                            isDarkMode={isDarkMode}
                            searchQuery={searchQuery}
                            zoomLevel={zoomLevel}
                            onZoomIn={handleZoomIn}
                            onZoomOut={handleZoomOut}
                        />
                    </div>
                </div>
            </div>
            {selectedNFT && (
                <ImageModal
                    nft={selectedNFT}
                    onClose={handleCloseModal}
                    isDarkMode={isDarkMode}
                    bgColor={bgColor}
                    onBgColorChange={handleBackgroundColorChange}
                    onTraitClick={handleTraitClickFromModal}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
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