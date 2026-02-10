import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const analyzeRepo = async (repoUrl, filePath) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/analyze`, {
            repo_url: repoUrl,
            file_path: filePath
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
