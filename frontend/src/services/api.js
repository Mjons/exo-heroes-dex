import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
// const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = '/api';
export const fetchNFTs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/nfts`);
        return response.data;  // Ensure we are returning JSON data
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        throw error;
    }
};

export const fetchTraits = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/traits`);
        return response.data;  // Ensure we are returning JSON data
    } catch (error) {
        console.error('Error fetching traits:', error);
        throw error;
    }
};

export const getFullImageUrl = (imageUrl) => {
    if (imageUrl.startsWith('http')) {
        return imageUrl;
    }
    return `/${imageUrl}`;
};