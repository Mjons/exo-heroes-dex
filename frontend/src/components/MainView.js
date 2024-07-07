// /frontend/src/components/MainView.js

import React from 'react';
import { getFullImageUrl } from '../services/api';
import './MainView.css';

const MainView = ({ nfts, onNFTClick, bgColor, gridSize, noMatchingTraits }) => {
    return (
        <div className={`main-view ${gridSize}`}>
            {noMatchingTraits ? (
                <div className="no-traits-message">Trait does not exist!</div>
            ) : (
                <div className="nft-grid-container">
                    <div className="nft-grid">
                        {nfts.map((nft) => (
                            <div key={nft.id} className="nft-item" onClick={() => onNFTClick(nft)} style={{ backgroundColor: bgColor }}>
                                <img src={getFullImageUrl(nft.imageUrl)} alt={nft.name} />
                                <div className="nft-info">
                                    <h3>{nft.name}</h3>
                                    <p>{nft.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainView;
