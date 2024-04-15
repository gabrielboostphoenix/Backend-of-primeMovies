// Importing Area
import { Router } from 'express';
import { SignUpController } from './controllers/users/auth.sign-up.controller';
import { SignInController } from './controllers/users/auth.sign-in.controller';
import { UserCredentialsHandlingController } from './controllers/users/auth.handle.controller';
import { checkIfTheUserIsAuthenticated } from './middleware/isAuthenticated';

// Declaring the constant that will be used to run the router
const router = Router();

// That's the sign-up route where the user can create your own account
router.post('/signup', checkIfTheUserIsAuthenticated, new SignUpController().signUp);

// That's the sign-in route where the user can login in your own account
router.post('/signin', checkIfTheUserIsAuthenticated, new SignInController().signIn);

// That's the user credentials handling route where the user can change own account name
router.patch('/userCredentials/name', checkIfTheUserIsAuthenticated, new UserCredentialsHandlingController().handleName);

// That's the user credentials handling route where the user can change own account password
router.patch('/userCredentials/password', checkIfTheUserIsAuthenticated, new UserCredentialsHandlingController().handlePassword);

// Exporting Area
export { router };