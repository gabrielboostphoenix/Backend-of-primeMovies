// Importing Area
import { Response } from "express";
import { findUserAccountByEmailCredential, comparePasswords, findFavoriteMovie, addFavoriteMovie } from '../../services/movies/movie.adding.service';
import { removeFavoriteMovie } from '../../services/movies/movie.removing.service';
import { favoriteMovie } from "../../types/favoriteMovie";
import { searchFavoriteMovie } from "../../services/movies/movie.request.service";

// That's a favorite movies class
class FavoriteMoviesController {

    // This method adds a movie in the favorite list
    async addMovie(req: favoriteMovie, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {

            // In this case the user has authorization to access the service
            // Extracting the user information from request
            const { movieID } = req.body;
            const { email, password } = req.jwtAuthorization.data;

            // Checking if the properties is missing in the request
            if (typeof movieID === 'undefined' || movieID === "") {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! It's missing the movie ID information properties."
                });

            }

            // Searching for specific user register in the database
            const specificUser = await findUserAccountByEmailCredential(email);

            // Checking whether the user exists through the operation result
            if (specificUser === null) {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! The user informations are invalid so try again too later."
                });

            }

            // Checking if the received password from the request is correct
            const comparedPasswords = await comparePasswords(password, specificUser.password);

            // Checking the returned operation result
            if (!comparedPasswords) {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! The user informations are invalid so try again too later."
                });

            }

            // Checking if exists the user favorite movie
            try {

                // Searching for favorite movie by your ID in the API
                const validMovie = await searchFavoriteMovie(movieID);

            } catch (error) {

                // Returning an error message
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! That's an invalid movie because doesn't exists in our systems."
                });

            }

            // Checking if the user's favorite movie already exists registered in the database
            const registeredMovie = await findFavoriteMovie(movieID, specificUser.id);

            // Checking the returned data in the operation result
            if (registeredMovie !== null) {

                // Returning an error message
                return res.status(409).json({
                    statusCode: 409,
                    errorMessage: "Bad Request! It wasn't possible to add the favorite movie in the list because already was added before."
                });

            }

            // Adding the user's favorite movie in the database
            const addedMovie = await addFavoriteMovie(movieID, specificUser.id);

            // Returning the operation result
            return res.status(200).json({
                statusCode: 200,
                successMessage: "The favorite movie has been added in the list with successfully!"
            });

        } else {

            // In this case the user doesn't have the authorization to access the service
            // Returning an error response
            return res.status(401).json({
                statusCode: 401,
                errorMessage: `Unauthorized Request! ${req.jwtAuthorization?.errorMessage}`
            });

        }

    }

    // This method removes a movie in the favorite list
    async removeMovie(req: favoriteMovie, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {

            // In this case the user has authorization to access the service
            // Extracting the user informations from the request
            const { movieID } = req.body;
            const { email, password } = req.jwtAuthorization.data;

            // Checking if it's missing the movie ID information property in the request
            if (typeof movieID === 'undefined' || movieID === "") {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! It's missing the movie ID information property."
                });

            }

            // Searching for specific user register in the database
            const specificUser = await findUserAccountByEmailCredential(email);

            // Checking whether the user exists through the operation result
            if (specificUser === null) {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! The user informations are invalid so try again too later."
                });

            }

            // Checking if the received password from the request is correct
            const comparedPasswords = await comparePasswords(password, specificUser.password);

            // Checking the returned operation result
            if (!comparedPasswords) {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! The user informations are invalid so try again too later."
                });

            }

            // Checking if the user's favorite movie already exists registered in the database
            const registeredMovie = await findFavoriteMovie(movieID, specificUser.id);

            // Checking the returned data in the operation result
            if (registeredMovie === null) {

                // Returning an error message
                return res.status(409).json({
                    statusCode: 404,
                    errorMessage: "The favorite movie wasn't found in your list so it's not possible to remove it!"
                });

            }

            // Removing the favorite movie of the user list
            await removeFavoriteMovie(movieID, specificUser.id);

            // Returning the operation result
            return res.status(200).json({
                statusCode: 200,
                successMessage: "The favorite movie was removed with successfully of your list!"
            });

        } else {

            // In this case the user doesn't have the authorization to access the service
            // Returning an error response
            return res.status(401).json({
                statusCode: 401,
                errorMessage: `Unauthorized Request! ${req.jwtAuthorization?.errorMessage}`
            });

        }

    }

}

// Exporting Area
export { FavoriteMoviesController };