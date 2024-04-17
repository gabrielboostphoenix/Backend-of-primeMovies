// Importing Area
import { Response } from "express";
import { movieRequest } from '../../types/movieRequest';
import { findUserAccountByID, addFavoriteMovie } from '../../services/movies/movie.adding.service';
import { favoriteMovie } from "../../types/favoriteMovie";

// That's a favorite movies class
class FavoriteMoviesController {

    // This method adds a movie in the favorite list
    async addMovie(req: favoriteMovie, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {

            // Extracting the user information from request
            const { movieID, movieName, userID } = req.body;

            // Checking if the properties is missing in the request
            if (typeof movieID === 'undefined' || typeof movieName === 'undefined' || typeof userID === 'undefined') {

                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! It's missing some information properties."
                });

            }

            // Searching for specific user register in the database
            const specificUser = await findUserAccountByID(userID);

            // Checking whether the user exists through the operation result
            if () {
                
            }


        } else {

            // Returning an error response
            return res.status(401).json({
                statusCode: 401,
                errorMessage: `Unauthorized Request! ${req.jwtAuthorization?.errorMessage}`
            });

        }

    }

    // This method removes a movie in the favorite list
    async removeMovie(req: movieRequest, res: Response) {

    }

}

// Exporting Area
export { FavoriteMoviesController };