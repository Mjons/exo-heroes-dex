// src/components/MainView.js

import React from 'react';
import './MainView.css';
import { getFullImageUrl } from '../services/api';

const MainView = ({ nfts, onNFTClick, bgColor, isDarkMode, searchQuery, zoomLevel, onZoomIn, onZoomOut }) => {
    return (
        <div className={`main-view ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="zoom-controls">
                <button onClick={onZoomOut} disabled={zoomLevel === 0}>
                    ▼
                </button>
                <span>Zoom</span>
                <button onClick={onZoomIn} disabled={zoomLevel === 4}>
                    ▲
                </button>
            </div>
            <div className="nft-grid-container">
                <div className={`nft-grid zoom-level-${zoomLevel}`}>
                    {nfts.length > 0 ? (
                        nfts.map((nft) => (
                            <div
                                key={nft.id}
                                className={`nft-item ${isDarkMode ? 'dark-mode' : ''}`}
                                onClick={() => onNFTClick(nft)}
                                style={{ backgroundColor: bgColor }}
                            >
                                <img
                                    src={getFullImageUrl(nft.imageUrl)}
                                    alt={nft.name}
                                    className="nft-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'path/to/fallback/image.jpg';
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="no-results-message">
                            No NFTs match the selected combination of traits.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainView;