// Importing Area
import { Router, Request, Response } from 'express';
import {} from './controllers/auth.sign-in.controller';
import {} from './controllers/auth.sign-up.controller';
import { checkIfTheUserIsAuthenticated } from './middleware/isAuthenticated';

// Declaring the constant that will be used to run the router
const router = Router();

// Declaring the routes to do the authentication system works
// That's the sign-in route where the user can login in your own account
router.post('/signin', checkIfTheUserIsAuthenticated, new );

// That's the sign-up route where the user can create your own account
router.post('/signup', checkIfTheUserIsAuthenticated, new );

// Exporting Area
export { router };