// Importing Area
import { Response } from "express";
import { movieRequest } from '../../types/movieRequest';
import { findUserAccountByEmail, findFavoriteMovie, addFavoriteMovie } from '../../services/movies/movie.adding.service';
import { favoriteMovie } from "../../types/favoriteMovie";

// That's a favorite movies class
class FavoriteMoviesController {

    // This method adds a movie in the favorite list
    async addMovie(req: favoriteMovie, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {

            // Extracting the user information from request
            const { movieID, movieName } = req.body;

            // Checking if the properties is missing in the request
            if (typeof movieID === 'undefined' || typeof movieName === 'undefined') {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! It's missing some information properties."
                });

            }

            // Searching for specific user register in the database
            const specificUser = await findUserAccountByEmail(req.jwtAuthorization.data.email);

            // Checking whether the user exists through the operation result
            if (specificUser === null) {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! The user informations are invalid so try again too later."
                });

            }

            // Checking if the user's favorite movie already exists registered in the database
            const registeredMovie = await findFavoriteMovie(movieID, movieName, specificUser.id);

            // Checking the returned data in the operation result
            if (registeredMovie !== null) {

                // Returning an error message
                return res.status(409).json({
                    statusCode: 409,
                    errorMessage: "Bad Request! It wasn't possible to add the favorite movie in the list because already was added before."
                });

            }

            // Adding the user's favorite movie in the database
            const addedMovie = await addFavoriteMovie(movieID, movieName, specificUser.id);

            // Returning the operation result
            return res.status(200).json({
                statusCode: 200,
                successMessage: "The favorite movie has been added in the list with successfully!",
                result: addedMovie
            });

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