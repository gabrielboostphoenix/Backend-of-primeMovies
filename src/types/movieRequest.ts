// Importing Area
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// That's a movie request's type
interface movieRequest extends Request {
    id?: number,
    name?: string,
    userID?: string,
    jwtAuthorization?: string | JwtPayload
}

// Exporting Area
export { movieRequest };