// Importing Area
import { Response } from 'express';
import { credentialsUpdating } from '../types/credentialsUpdating';
import { changeName, changePassword } from '../services/auth.handle.service';

// That's a handling class of user credentials
class UserCredentialsHandlingController {

    // This method changes the user account password
    async handlePassword(req: credentialsUpdating, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {
            
        } else {

        }

    };

    // This method changes the user account name
    async handleName(req: credentialsUpdating, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {

            // In this case the user has authorization to access the service
            // Extracting the e-mail credential from the request
            const { userName } = req.body;

            // Checking if the credential is missing in the request
            if (userName === "") {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: ""
                });

            }

        } else {

            // In this case the user doesn't authorization to access the service
            // Returning an error response
            return res.status(401).json({
                statusCode: 401,
                errorMessage: "Unauthorized Request! It's not possible to change some user credential bacause the JWT is invalid."
            });

        }

    };

}

// Exporting Area
export { UserCredentialsHandlingController };