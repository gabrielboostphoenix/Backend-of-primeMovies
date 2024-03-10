// Importing Area
import { Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

const verifyAccessToken = async (token: string): Promise<string | JwtPayload> => {

    // Extracting the API secret information from enviorment variable
    const ApiSecret: string = process.env.API_SECRET ? process.env.API_SECRET : '';
    // Verifying if the JWT is valid
    const operationResult = verify(token, ApiSecret);
    // Returning the operation result
    return operationResult;

};

const checkIfTheUserIsAuthenticated = async (req: any, res: Response, next: NextFunction) => {

    

};

// Exporting Area
export { checkIfTheUserIsAuthenticated };