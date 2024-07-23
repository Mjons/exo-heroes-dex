// src/components/ReturnButton.js

import React from 'react';

const ReturnButton = () => {
    const returnToGame = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl');
        const posX = urlParams.get('posX');
        const posY = urlParams.get('posY');
        const direction = urlParams.get('direction');
        window.location.href = `${returnUrl}?posX=${posX}&posY=${posY}&direction=${direction}`;
    };

    return (
        <button onClick={returnToGame} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            Return to Game
        </button>
    );
};

export default ReturnButton;
