// e.g., in frontend/src/components/NFTCard.js or similar

import React from 'react';
import { getFullImageUrl } from '../services/api';

const NFTCard = ({ nft }) => {
    return (
        <div className="nft-card">
            <img src={getFullImageUrl(nft.imageUrl)} alt={nft.name} />
            <h3>{nft.name}</h3>
            {/* ... other NFT details */}
        </div>
    );
};

export default NFTCard;