// Importing Area
import axios, { AxiosResponse } from 'axios';

// Declaring the necessary variables that will be used
const API_URL = process.env.THE_MOVIE_DATABASE_API_URL ? process.env.THE_MOVIE_DATABASE_API_URL : '';
const API_KEY = process.env.THE_MOVIE_DATABASE_API_READING_TOKEN ? process.env.THE_MOVIE_DATABASE_API_READING_TOKEN : '';

// That's a function that searches a movie by your own ID
async function searchFavoriteMovie(id: number) {

    // That's a constant that stores the necessary settings to do requests
    const defaultOptions = {
        baseURL: API_URL,
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    };

    // That's a service that does requests like a client to an API
    const requestService = axios.create(defaultOptions);

    // Searching for movie details by your ID in the movie database api
    const resultOperation: AxiosResponse = await requestService.get(`/movie/${id}`);

    // Returning an operation result
    return resultOperation.data;

}

// Exporting Area
export { searchFavoriteMovie };