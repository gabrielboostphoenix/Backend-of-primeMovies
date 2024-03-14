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

            // In this case the user has authorization to access the service
            // Extracting the password information from the request
            const { userPassword } = req.body;

            // Checking if the credential is missing in the request
            if (userPassword === "") {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! The user password information is missing."
                });

            }

            // Extracting the user e-mail credential from JWT
            const { email } = req.jwtAuthorization.data;
            // Changing the user password of your own account
            const operationResult = changePassword(email, userPassword);

            // Returning a successfully response
            return res.status(200).json({
                statusCode: 200,
                successMessage: "Congratulations! The user password was changed of your own account.",
                result: operationResult
            });

        } else {
            
            // In this case the user doesn't authorization to access the service
            // Returning an error response
            return res.status(401).json({
                statusCode: 401,
                errorMessage: "Unauthorized Request! It's not possible to change some user credential bacause the JWT is invalid."
            });
            
        }

    };

    // This method changes the user account name
    async handleName(req: credentialsUpdating, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {

            // In this case the user has authorization to access the service
            // Extracting the user name information from the request
            const { userName } = req.body;

            // Checking if the credential is missing in the request
            if (userName === "") {

                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! The user name information is missing."
                });

            }

            // Extracting the user e-mail credential from JWT
            const { email } = req.jwtAuthorization.data;
            // Changing the user name of your own account
            const operationResult = changeName(email, userName);

            // Returning a successfully response
            return res.status(200).json({
                statusCode: 200,
                successMessage: "Congratulations! The user name was changed of your own account.",
                result: operationResult
            });

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