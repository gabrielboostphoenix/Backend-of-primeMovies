// Importing Area
import { Request } from 'express';

// This is the user credentials type
interface userCredentials extends Request {
    userName: string,
    userEmail: string,
    userPassword: string
}

// Exporting Area
export { userCredentials };