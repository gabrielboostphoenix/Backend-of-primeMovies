// Importing Area
import { Request } from 'express';

// That's a sign-in request's type
interface signIn extends Request {
    userEmail: string,
    userPassword: string
}

// Exporting Area
export { signIn };