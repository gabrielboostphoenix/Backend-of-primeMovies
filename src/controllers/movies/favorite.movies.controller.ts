// Importing Area
import { Response } from "express";
import { movieRequest } from '../../types/movieRequest';
import { addFavoriteMovie } from '../../services/movies/movie.adding.service';
import { favoriteMovie } from "../../types/favoriteMovie";

// That's a favorite movies class
class FavoriteMoviesController {

    // This method adds a movie in the favorite list
    async addMovie(req: favoriteMovie, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {



        } else {



        }

    }

    // This method removes a movie in the favorite list
    async removeMovie(req: movieRequest, res: Response) {

    }

}

// Exporting Area
export { FavoriteMoviesController };