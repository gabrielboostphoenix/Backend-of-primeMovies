// Importing Area
import { Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { userRequest } from '../types/userRequest';
import { authorized } from '../types/authorized';
import { unauthorized } from '../types/unauthorized';

// This is a feature that verifies if the access token is valid
const verifyAccessToken = async (token: string): Promise <authorized | unauthorized> => {

    // Extracting the API secret information from enviorment variable
    const ApiSecret: string = process.env.API_SECRET ? process.env.API_SECRET : '';

    // That's a structure that verifies if the token is really valid
    try {

        // Verifing it
        const decodedJWT = verify(token, ApiSecret) as JwtPayload;
        // Returning it
        return {
            success: true,
            data: decodedJWT
        };

    } catch (error) {

        // Creating an error object to return it
        const invalidJWT = new Error("That's an invalid json web token!");
        // Returning it
        return {
            success: false,
            errorMessage: invalidJWT
        };

    }

};

// That's a middleware that checks if exists the JWT in the request
const checkIfTheUserIsAuthenticated = async (req: userRequest, res: Response, next: NextFunction) => {

    // Getting all of the authorization informations from request header
    const authHeader = req.headers.authorization;

    // Checking if the authentication method is bearer
    if (authHeader?.split(' ')[0] === 'Bearer') {

        // Extracting the access json web token
        const accessToken = authHeader.split(' ')[1];
        // Verifing whether the jwt is valid
        const result = await verifyAccessToken(accessToken);
        // Putting the verification result in the request
        req.jwtAuthorization = result;

    }

    // Skipping to the next
    next();

};

// Exporting Area
export { checkIfTheUserIsAuthenticated };