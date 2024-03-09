// Importing Area
import { userCredentials } from '../types/userCredentials';
import { foundUser } from '../types/foundUser';
import { createdUser } from '../types/createdUser';
import { prisma } from '../../prisma/prismaClient';

// That's a functionality that checks if exists the user account in the database
async function findUserAccountByEmail(data: string): Promise<foundUser | null> {

    // Finding an user account register through the e-mail
    const operationResult = await prisma.users.findFirst({
        where: {
            email: data
        }
    });

    // Returning the operation result
    return operationResult;

};

// This is the functionality that creates an account to the user in the database
async function createUserAccount(data: userCredentials): Promise<createdUser> {

    // Creating an user register in the database
    const resultOperation = await prisma.users.create({
        data: {
            email: data.userEmail,
            name: data.userName,
            password: data.userPassword
        },
        select: {
            name: true,
            email: true,
            password: true
        }
    });

    // Returning the result
    return resultOperation;

};

// Exporting Area
export { createUserAccount, findUserAccountByEmail };