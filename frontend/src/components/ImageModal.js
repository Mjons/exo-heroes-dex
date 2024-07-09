import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getFullImageUrl } from '../services/api';
import './ImageModal.css';

const ImageModal = ({ nft, onClose, isDarkMode, bgColor, onBgColorChange }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [localBgColor, setLocalBgColor] = useState(bgColor); // Local state for background color
    const canvasRef = useRef(null);

    const drawImage = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (localBgColor === 'transparent') {
                ctx.fillStyle = ctx.createPattern(createGridPattern(), 'repeat');
            } else {
                ctx.fillStyle = localBgColor;
            }
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.onerror = () => {
            console.error('Failed to load image:', getFullImageUrl(nft.imageUrl));
        };
        img.src = getFullImageUrl(nft.imageUrl);
    }, [nft, localBgColor]);

    const createGridPattern = () => {
        const gridCanvas = document.createElement('canvas');
        gridCanvas.width = 128;
        gridCanvas.height = 128;
        const gridCtx = gridCanvas.getContext('2d');

        gridCtx.fillStyle = '#b3b3b3';
        gridCtx.fillRect(0, 0, 128, 128);
        gridCtx.fillStyle = '#e6e6e6';
        gridCtx.fillRect(0, 0, 64, 64);
        gridCtx.fillRect(64, 64, 64, 64);

        return gridCanvas;
    };

    useEffect(() => {
        drawImage();
    }, [drawImage]);

    const handleColorChange = (color) => {
        setLocalBgColor(color);
        onBgColorChange(color); // Notify parent component of color change
    };

    const handleSave = async () => {
        setIsSaving(true);
        const canvas = canvasRef.current;
        if (!canvas) {
            setIsSaving(false);
            return;
        }

        try {
            const dataUrl = canvas.toDataURL();
            const link = document.createElement('a');
            link.download = `${nft.name}_${localBgColor}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error saving image:', error);
            alert('Failed to save image. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${isDarkMode ? 'dark-mode' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>{nft.name}</h2>
                <div className="canvas-container">
                    <canvas ref={canvasRef}></canvas>
                </div>
                <div className="color-options">
                    <button onClick={() => handleColorChange('#FFA500')}>Orange</button>
                    <button onClick={() => handleColorChange('transparent')}>Transparent</button>
                    <button>Custom
                        <input
                            type="color"
                            onChange={(e) => handleColorChange(e.target.value)}
                            value={localBgColor}
                        />
                    </button>
                    <button
                        className="save-button"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save Image'}
                    </button>
                </div>
                <div className="traits-section">
                    <h3>Traits:</h3>
                    <ul>
                        {Object.entries(nft.traits).map(([trait, value]) => (
                            <li key={trait}>
                                <strong>{trait}:</strong> {value} ({nft.traitRarity[trait]}%)
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
