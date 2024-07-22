// src/ReturnButton.js
import React from 'react';

function ReturnButton() {
    const returnToGame = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl');
        const posX = urlParams.get('posX');
        const posY = urlParams.get('posY');
        const direction = urlParams.get('direction');
        if (returnUrl) {
            window.location.href = `${returnUrl}?posX=${posX}&posY=${posY}&direction=${direction}`;
        } else {
            // Handle the case where returnUrl is not available
            console.warn('Return URL is not available');
        }
    };

    return (
        <div>
            <h1>NFT Collector</h1>
            <button onClick={returnToGame}>Return to Game</button>
        </div>
    );
}

export default ReturnButton;
