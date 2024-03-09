// Importing Area
import { createUserAccount, findUserAccountByEmail } from '../services/auth.sign-up.service';
import { hash } from 'bcryptjs';
import { signUp } from '../types/signUp';

// That's a sign up class
class SignUpController {

    // This method creates an user account
    async signUp(req: signUp, res: any) {

        // Extracting the informations from the request
        const { userName, userEmail, userPassword } = req.body;
        
        // Checking if the credentials are missing in the request
        if (userName === "" || userEmail === "" || userPassword === "") {

            // Returning an error response
            return res.status(400).json({
                statusCode: 400,
                errorMessage: "Bad Request! The user credentials are missing in the request."
            });

        }

        // Verifying whether the e-mail is been used for another user account
        const checkingIfEmailAlreadyIsBeenUsed = await findUserAccountByEmail(userEmail);

        // Checking the data type of operation result
        if (checkingIfEmailAlreadyIsBeenUsed !== null) {

            // Creating a new error to send like a response to the user
            const error = new Error('This e-mail already is been used, try to use another to sign-up!');
            // Returning an error response
            return res.status(409).json({
                statusCode: 409,
                errorMessage: error.message
            });

        }

        // Extrating the salt number of cryptography
        const salt = process.env.SALT ? Number(process.env.SALT) : '';
        // Using a cryptography function to hash the user password
        const hashedPassword = await hash(userPassword, salt);
        // Adding the current user in database
        const result = await createUserAccount({
            userName: userName,
            userEmail: userEmail,
            userPassword: hashedPassword
        });

        // Returning the operation result with a created user successfully response
        return res.status(201).json({
            statusCode: 201,
            successMessage: 'Your own user account was created with successfully!',
            operationResult: result
        });

    };

}

// Exporting Area
export { SignUpController };