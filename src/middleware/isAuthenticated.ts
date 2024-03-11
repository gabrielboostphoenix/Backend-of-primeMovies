// Importing Area
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

// This is a feature that verifies if the access token is valid
const verifyAccessToken = async (token: string): Promise<string | JwtPayload> => {

    // Extracting the API secret information from enviorment variable
    const ApiSecret: string = process.env.API_SECRET ? process.env.API_SECRET : '';
    // Verifying if the JWT is valid
    const operationResult = verify(token, ApiSecret);
    // Returning the operation result
    return operationResult;

};

// That's a middleware that checks if exists the JWT in the request
const checkIfTheUserIsAuthenticated = async (req: Request, res: Response, next: NextFunction) => {

    // Getting all of the authorization informations from request header
    const authHeader = req.headers.authorization;

    // Checking if the authentication method is bearer
    if (authHeader?.split(' ')[0] === 'Bearer') {

        // Extracting the access json web token
        const accessToken = authHeader.split(' ')[1];

    }

};

// Exporting Area
export { checkIfTheUserIsAuthenticated };