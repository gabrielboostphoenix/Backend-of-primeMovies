// Importing Area
import { prisma } from '../../prisma/prismaClient';

// This is a feature that changes the password credential from the user account
async function changePassword(userEmail: string, userPassword: string) {

    // Changing the user password of your own account
    const operationResult = prisma.users.update({
        where: {
            email: userEmail
        },
        data: {
            password: userPassword
        }
    });

    // Returning the operation result
    return operationResult;

};

// This is a feature that changes the name from the user account
async function changeName(userEmail: string, userName: string) {

    // Changing the user name of your own account
    const operationResult = prisma.users.update({
        where: {
            email: userEmail
        },
        data: {
            name: userName
        }
    });

    // Returning the operation result
    return operationResult;

}

// Exporting Area
export { changePassword, changeName };