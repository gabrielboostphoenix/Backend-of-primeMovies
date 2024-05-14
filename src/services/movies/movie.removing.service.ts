// Importing Area
import { prisma } from '../../../prisma/prismaClient';

// That's a functionality that removes a favorite movie in the database by own ID
async function removeFavoriteMovie(movieID: number, userID: string) {

    // Removing the favorite movie in the list of user favorite movies
    const resultOperation = await prisma.movies.delete({
        where: {
            id: movieID,
            userID: userID
        }
    });

    // Returning the operation result
    return resultOperation;

}

// Exporting Area
export { removeFavoriteMovie };