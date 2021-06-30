import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_TMDB_API}`,
    params: {
        api_key: `${process.env.REACT_APP_API_KEY}`,
    },
    timeout: 120000,
});

export default api;
