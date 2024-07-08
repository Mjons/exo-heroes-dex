// frontend/src/components/ImageModal.js

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getFullImageUrl } from '../services/api';
import './ImageModal.css';

const ImageModal = ({ nft, onClose, isDarkMode, bgColor }) => {
    const [isSaving, setIsSaving] = useState(false);
    const canvasRef = useRef(null);

    const drawImage = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.onerror = () => {
            console.error('Failed to load image:', getFullImageUrl(nft.imageUrl));
        };
        img.src = getFullImageUrl(nft.imageUrl);
    }, [nft, bgColor]);

    useEffect(() => {
        drawImage();
    }, [drawImage]);

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
            link.download = `${nft.name}_${bgColor}.png`;
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
                <div className="traits-section">
                    <h3>Traits</h3>
                    <ul>
                        {Object.entries(nft.traits).map(([trait, value]) => (
                            <li key={trait}>
                                <strong>{trait}:</strong> {value} ({nft.traitRarity[trait]}%)
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    className="save-button"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : 'Save Image'}
                </button>
            </div>
        </div>
    );
};

export default ImageModal;
