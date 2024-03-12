// Importing Area
import { Request } from 'express';
import { authorized } from '../types/authorized';
import { unauthorized } from '../types/unauthorized';

// That's an user credentials updating's type
interface credentialsUpdating extends Request {
    userName?: string,
    userPassword?: string,
    jwtAuthorization?: authorized | unauthorized
}

// Exporting Area
export { credentialsUpdating };