// Importing Area
import { foundUser } from '../types/foundUser';
import { compare } from 'bcryptjs';
import { prisma } from '../../prisma/prismaClient';

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

}

// That's a functionality that checks if the passwords are the same in both cases
async function verifyThePasswords(requestPassword: string, databasePassword: string) {

    // Comparing the both passwords
    const operationResult = await compare(requestPassword, databasePassword);

    // Returning the operation result
    return operationResult;

}

// Exporting Area
export { findUserAccountByEmailCredential, verifyThePasswords };