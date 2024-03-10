// Importing Area
import { foundUser } from '../types/foundUser';
import { compare } from 'bcryptjs';
import { prisma } from '../../prisma/prismaClient';
import { payload } from '../types/payload';
import { sign } from 'jsonwebtoken';

// That's a functionality that checks if exists an user account
async function findUserAccountByEmailCredential(data: string): Promise<foundUser | null> {

    // Finding an user account register by unique credential
    const operationResult = await prisma.users.findUnique({
        where: {
            email: data
        }
    });

    // Returning the operation result
    return operationResult;

};

// That's a functionality that checks if the passwords are the same in both cases
async function verifyThePasswords(requestPassword: string, databasePassword: string) {

    // Comparing the both passwords
    const operationResult = await compare(requestPassword, databasePassword);

    // Returning the operation result
    return operationResult;

};

// That's a functionality that generates an access token to the user account
async function generateAccessToken(data: payload) {

    // Extracting the API secret information from enviorment variable
    const ApiSecret: string = process.env.API_SECRET ? process.env.API_SECRET : '';
    // Setting that access token has limit date
    const options = { expiresIn: '30d' };
    // Creating a JWT access
    const operationResult = sign(data, ApiSecret, options);
    // Returning the operation result
    return operationResult;

};

// Exporting Area
export { findUserAccountByEmailCredential, verifyThePasswords, generateAccessToken };