// Importing Area
import { Response } from 'express';
import { credentialsUpdating } from '../types/credentialsUpdating';
import { changeName, changePassword } from '../services/auth.handle.service';
import { findUserAccountByEmailCredential, generateAccessToken, verifyThePasswords } from '../services/auth.sign-in.service';

// That's a handling class of user credentials
class UserCredentialsHandlingController {

    // This method changes the user account password
    async handlePassword(req: credentialsUpdating, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {

            // Extracting the user credentials from JWT
            const { email, password } = req.jwtAuthorization.data;

            // Verifing if there are properties like e-mail and password in the token
            if (typeof email !== 'undefined' && typeof password !== 'undefined') {

                // Searching for the user in the database with your respective received credentials
                const specificUser = await findUserAccountByEmailCredential(email);

                // Checking if exists the specific user through the data type
                if (specificUser === null) {

                    // Returning an error response
                    return res.status(400).json({
                        statusCode: 400,
                        errorMessage: "Bad Request! It's not possible to change the user password bacause the JWT is invalid."
                    });

                }

                // Checking if the received password credential from the request is correct
                const comparedPasswords = await verifyThePasswords(password, specificUser.password);

                // Checking the returned operation result
                if (!comparedPasswords) {

                    // Returning an error response
                    return res.status(400).json({
                        statusCode: 400,
                        errorMessage: "Bad Request! It's not possible to change the user password bacause the JWT is invalid."
                    });

                }

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

                // Changing the user password of your own account
                const operationResult = await changePassword(email, userPassword);

                // Generating a new JSON Web Token relative to the new user credentials
                const newAccessToken = await generateAccessToken({
                    email: operationResult.email,
                    password: operationResult.password
                });

                // Returning a successfully response
                return res.status(200).json({
                    statusCode: 200,
                    successMessage: "Congratulations! The user password was changed of your own account.",
                    result: operationResult,
                    newJWT: newAccessToken
                });

            } else {

                // In this case the user doesn't have authorization to access the service
                // It's because was send an invalid JWT where is missing some properties
                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! It's not possible to change the user password bacause the JWT is invalid."
                });

            }

        } else {
            
            // In this case the user doesn't have the authorization to access the service
            // Returning an error response
            return res.status(401).json({
                statusCode: 401,
                errorMessage: "Unauthorized Request! It's not possible to change the user password bacause the JWT is missing."
            });
            
        }

    };

    // This method changes the user account name
    async handleName(req: credentialsUpdating, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {

            // Extracting the user credentials from JWT
            const { email, password } = req.jwtAuthorization.data;

            // Checking if the user credentials are invalid through the data type
            if (typeof email !== 'undefined' && typeof password !== 'undefined') {

                // Searching for the user in the database with your respective received credentials
                const specificUser = await findUserAccountByEmailCredential(email);

                // Checking if exists the specific user through the data type
                if (specificUser === null) {

                    // Returning an error response
                    return res.status(400).json({
                        statusCode: 400,
                        errorMessage: "Bad Request! It's not possible to change the user name bacause the JWT is invalid."
                    });

                }

                // Checking if the received password credential from the request is correct
                const comparedPasswords = await verifyThePasswords(password, specificUser.password);

                // Checking the returned operation result
                if (!comparedPasswords) {

                    // Returning an error response
                    return res.status(400).json({
                        statusCode: 400,
                        errorMessage: "Bad Request! It's not possible to change the user name bacause the JWT is invalid."
                    });

                }

                // In this case the user has authorization to access the service
                // Extracting the user name information from the request
                const { userName } = req.body;

                // Checking if the credential is missing in the request
                if (userName === "") {

                    // Returning an error response
                    return res.status(400).json({
                        statusCode: 400,
                        errorMessage: "Bad Request! The username information is missing."
                    });

                }

                // Changing the user name of your own account
                const operationResult = await changeName(email, userName);

                // Returning a successfully response
                return res.status(200).json({
                    statusCode: 200,
                    successMessage: "Congratulations! The user name was changed of your own account.",
                    result: operationResult
                });

            } else {

                // In this case the user doesn't have authorization to access the service
                // It's because was send an invalid JWT where is missing some properties
                // Returning an error response
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: "Bad Request! It's not possible to change the user name bacause the JWT is invalid."
                });

            }

        } else {

            // In this case the user doesn't have the authorization to access the service
            // Returning an error response
            return res.status(401).json({
                statusCode: 401,
                errorMessage: "Unauthorized Request! It's not possible to change the user name bacause the JWT is missing."
            });

        }

    };

}

// Exporting Area
export { UserCredentialsHandlingController };