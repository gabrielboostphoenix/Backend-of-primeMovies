// Importing Area
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// That's a middleware request's type
interface middlewareRequest extends Request {
    userName?: string,
    userEmail?: string,
    userPassword?: string,
    jwtAuthorization?: string | JwtPayload
}

// Exporting Area
export { middlewareRequest };