// Importing Area
import { Response, NextFunction } from 'express';
import { Jwt } from 'jsonwebtoken';

const verifyAccessToken = async (token: string | Jwt) => {

};

const checkIfTheUserIsAuthenticated = async (req: any, res: Response, next: NextFunction) => {

};

// Exporting Area
export { checkIfTheUserIsAuthenticated };