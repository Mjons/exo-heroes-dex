// src/components/MainView.js

import React, { useState } from 'react';
import { getFullImageUrl } from '../services/api';
import './MainView.css';

const MainView = ({ nfts, onNFTClick, bgColor, noMatchingTraits, isDarkMode, searchQuery }) => {
    const [zoomLevel, setZoomLevel] = useState(2); // Default zoom level (middle)

    const handleZoomIn = () => {
        setZoomLevel((prev) => Math.min(prev + 1, 4));
    };

    const handleZoomOut = () => {
        setZoomLevel((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className={`main-view ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="zoom-controls">
                <button onClick={handleZoomOut} disabled={zoomLevel === 0}>
                    ▼
                </button>
                <span>Zoom</span>
                <button onClick={handleZoomIn} disabled={zoomLevel === 4}>
                    ▲
                </button>
            </div>
            <div className="nft-grid-container">
                <div className={`nft-grid zoom-level-${zoomLevel}`}>
                    {nfts.map((nft) => (
                        <div
                            key={nft.id}
                            className="nft-item"
                            onClick={() => onNFTClick(nft)}
                            style={{ backgroundColor: bgColor }}
                        >
                            <div className="image-container">
                                <img src={getFullImageUrl(nft.imageUrl)} alt={nft.name} />
                            </div>
                            <div className="nft-info">
                                <h3>{nft.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {noMatchingTraits && (
                <div className="no-traits-message">
                    No matching traits found for "{searchQuery}"
                </div>
            )}
        </div>
    );
};

export default MainView;