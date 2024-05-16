// Importing Area
import { Response } from 'express';
import { credentialsUpdating } from '../../types/credentialsUpdating';
import { changeName, changePassword } from '../../services/users/auth.handle.service';
import { findUserAccountByEmailCredential, generateAccessToken, verifyThePasswords } from '../../services/users/auth.sign-in.service';
import { hash } from 'bcryptjs';

// That's a handling class of user credentials
class UserCredentialsHandlingController {

    // This method changes the user account password
    async handlePassword(req: credentialsUpdating, res: Response) {

        // Checking for an existing JWT
        if (req.jwtAuthorization?.success === true) {

            // Extracting the user credentials from JWT
            const { email, password } = req.jwtAuthorization.data;

            // Verifing if there are properties like e-mail and password in the token
            if (typeof email !== 'undefined' && email !== "" &&
                typeof password !== 'undefined' && password !== "") {

                // Searching for the user in the database with your respective received credentials
                const specificUser = await findUserAccountByEmailCredential(email);

                // Checking if exists the specific user through the data type
                if (specificUser === null) {

                    // Returning an error response
                    return res.status(400).json({
                        statusCode: 400,
                        errorMessage: "Bad Request! It's not possible to change the user password credential bacause the JWT is invalid."
                    });

                }

                // Checking if the received password credential from the request is correct
                const comparedPasswords1 = await verifyThePasswords(password, specificUser.password);

                // Checking the returned operation result
                if (!comparedPasswords1) {

                    // Returning an error response
                    return res.status(400).json({
                        statusCode: 400,
                        errorMessage: "Bad Request! It's not possible to change the user password credential bacause the JWT is invalid."
                    });

                }

                // In this case the user has authorization to access the service
                // Extracting the password information from the request
                const { userPassword } = req.body;

                // Checking if the credential is missing in the request
                if (userPassword === "" || typeof userPassword === "undefined") {

                    // Returning an error response
                    return res.status(400).json({
                        statusCode: 400,
                        errorMessage: "Bad Request! The user password credential is missing."
                    });

                }

                // Checking again if the hashed password credential is the same as the one registered in the database
                const comparedPasswords2 = await verifyThePasswords(userPassword, specificUser.password);

                // Checking the returned operation result through the data type
                if (comparedPasswords2) {

                    // Returning na error
                    return res.status(409).json({
                        statusCode: 409,
                        errorMessage: "Bad Request! The user password credential is invalid."
                    });

                }

                // Extrating the salt number of cryptography
                const salt = process.env.SALT ? Number(process.env.SALT) : '';
                // Using a cryptography function to hash the user password
                const hashedPassword = await hash(userPassword, salt);

                // Changing the user password of your own account
                const operationResult = await changePassword(email, hashedPassword);

                // Generating a new JSON Web Token relative to the new user credentials
                const newAccessToken = await generateAccessToken({
                    email: operationResult.email,
                    password: operationResult.password,
                    userID: operationResult.id
                });

                // Returning a successfully response
                return res.status(200).json({
                    statusCode: 200,
                    successMessage: "Congratulations! The user password credential was changed of your own account.",
                    newJWT: newAccessToken
                });

            } else {

                // In this case the user doesn't have the authorization to access the service
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
            if (typeof email !== 'undefined' && email !== "" &&
                typeof password !== 'undefined' && password !== "") {

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

                // Checking if the user name information is missing in the request
                if (userName === "" || typeof userName === 'undefined') {

                    // Returning an error response
                    return res.status(400).json({
                        statusCode: 400,
                        errorMessage: "Bad Request! The user name information is missing."
                    });

                }

                // Checking again if the user name information is the same as the one registered in the database
                if (userName === specificUser.name) {

                    // Returning na error
                    return res.status(409).json({
                        statusCode: 409,
                        errorMessage: "Bad Request! The user name information is invalid."
                    });

                }

                // Changing the user name of your own account
                const operationResult = await changeName(email, userName);

                // Returning a successfully response
                return res.status(200).json({
                    statusCode: 200,
                    successMessage: "Congratulations! The user name was changed of your own account."
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