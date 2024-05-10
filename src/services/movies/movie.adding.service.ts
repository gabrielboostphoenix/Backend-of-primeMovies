// Importing Area
import { prisma } from '../../../prisma/prismaClient';
import { foundMovie } from '../../types/foundMovie';
import { foundUser } from '../../types/foundUser';
import { movie } from '../../types/movie';

// That's a functionality that finds an user account by ID
async function findUserAccountByEmail(email: string): Promise <foundUser | null> {

    // Searching if exists the user account
    const operationResult = await prisma.users.findFirst({
        where: {
            email: email
        }
    });

    // Returning the operation result
    return operationResult;

}

// That's a functionality that finds a favorite movie already registered in the database
async function findFavoriteMovie(movieID: number, movieName: string, userID: string): Promise <foundMovie | null> {

    // Searching if exists the user's favorite movie in the database
    const operationResult = await prisma.movies.findFirst({
        where: {
            id: movieID,
            name: movieName,
            userID: userID
        }
    });

    // Returning the operation result
    return operationResult;

}

// That's a functionality that adds the favorite movie in the database
async function addFavoriteMovie(movieID: number, movieName: string, userID: string): Promise <movie> {

    // Adding a specific movie in the favorite movies list
    const operationResult = await prisma.movies.create({
        data: {
            id: movieID,
            name: movieName,
            userID: userID
        }
    });

    // Returning the operation result
    return operationResult;

}

// Exporting Area
export { findUserAccountByEmail, findFavoriteMovie, addFavoriteMovie };