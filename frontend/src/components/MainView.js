// src/components/MainView.js

import React from 'react';
import { getFullImageUrl } from '../services/api';
import './MainView.css';

const MainView = ({ nfts, onNFTClick, bgColor, noMatchingTraits, isDarkMode }) => {
    return (
        <div className={`main-view ${isDarkMode ? 'dark-mode' : ''}`}>
            {noMatchingTraits ? (
                <div className={`no-traits-message ${isDarkMode ? 'dark-mode' : ''}`}>
                    Trait does not exist!
                </div>
            ) : (
                <div className="nft-grid-container">
                    <div className="nft-grid">
                        {nfts.map((nft) => (
                            <div
                                key={nft.id}
                                className="nft-item"
                                onClick={() => onNFTClick(nft)}
                                style={{ backgroundColor: bgColor }}
                            >
                                <img src={getFullImageUrl(nft.imageUrl)} alt={nft.name} className="nft-image" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainView;