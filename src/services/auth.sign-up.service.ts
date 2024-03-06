// Importing Area
import { userCredentials } from '../types/userCredentials';
import { createdUser } from '../types/createdUser';
import { prisma } from '../../prisma/prismaClient';

// This is the functionality that checks if exists the user account in the database
async function findUserByEmail(data: string) {

    const operationResult = await prisma.users.findFirstOrThrow({
        where: {
            email: data
        }
    });

    // Returning the operation result
    return operationResult;

};

// This is the functionality that creates an account to the user in the database
async function createAccount(data: userCredentials): Promise<createdUser> {

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
export { createAccount, findUserByEmail };