// Importing Area
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// That's a middleware request's type
interface userRequest extends Request {
    userName?: string,
    userEmail?: string,
    userPassword?: string,
    jwtAuthorization?: string | JwtPayload
}

// Exporting Area
export { userRequest };