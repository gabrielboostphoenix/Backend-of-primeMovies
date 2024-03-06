// Importing Area
import { Router } from 'express';
import { SignUpController } from './controllers/auth.sign-up.controller';

/*
import {  } from './controllers/auth.sign-in.controller';
import { UserCredentialsHandlingController } from './controllers/auth.handle.controller';
import { checkIfTheUserIsAuthenticated } from './middleware/isAuthenticated';
*/

// Declaring the constant that will be used to run the router
const router = Router();

// Declaring the routes to do the authentication system works
// That's the sign-up route where the user can create your own account
router.post('/signup', new SignUpController().signUp);

/*
// That's the sign-in route where the user can login in your own account
router.post('/signin', checkIfTheUserIsAuthenticated, new );

// That's the user credentials handling route where the user can change own account name
router.patch('/userCredentials/name', checkIfTheUserIsAuthenticated, new UserCredentialsHandlingController().changeName);

// That's the user credentials handling route where the user can change own account password
router.patch('/userCredentials/password', checkIfTheUserIsAuthenticated, new UserCredentialsHandlingController().changePassword);
*/

// Exporting Area
export { router };