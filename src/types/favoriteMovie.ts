// Importing Area
import { authorized } from "./authorized";
import { unauthorized } from "./unauthorized";

// That's a favorite movie's type
interface favoriteMovie {
    id: number,
    name: string,
    userID: string,
    jwtAuthorization: authorized | unauthorized
}

// Exporting Area
export { favoriteMovie };