// Importing Area
import { prisma } from '../../../prisma/prismaClient';
import { favoriteMovie } from '../../types/favoriteMovie';

// That's a functionality that finds an user account by ID
async function findUserAccountByID(id: string) {

    // Searching if exists the user account
    const operationResult = await prisma.users.findUnique({
        where: {
            id: id
        }
    });

}

// That's a functionality that adds the favorite movie in the database
async function addFavoriteMovie(movie: favoriteMovie) {

    // Finding the user account to add the movie in the favorites list
    const result = await findUserAccountByID(movie.userID);

    // Checking the returned data in the database operation
    if (result === null) {

        // In this case the data type is equal to null
        return "It wasn't possible to add the movie in the favorites list because that's an invalid user account.";

    } else {

        // In this case the data type is different to null
        const operationResult = await prisma.movies.create({
            data: {
                id: movie.id,
                name: movie.name,
                userID: movie.userID
            }
        });

        // Returning the operation result
        return operationResult;

    }

}

// Exporting Area
export { addFavoriteMovie };