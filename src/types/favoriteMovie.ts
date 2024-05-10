// Importing Area
import { Request } from 'express';
import { authorized } from './authorized';
import { unauthorized } from './unauthorized';

// That's a favorite movie's type
interface favoriteMovie extends Request {
    movieID?: number,
    movieName?: string,
    jwtAuthorization?: authorized | unauthorized
}

// Exporting Area
export { favoriteMovie };