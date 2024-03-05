// Importing Area
import { Response } from 'express';
import { createAccount } from '../services/auth.sign-up.service';
import { userCredentials } from '../types/userCredentials';

// That's a sign up class
class SignUpController {

    // This method create an user account
    async signUp(req: userCredentials, res: any) {

        // Extracting informations from the request
        const { userName, userEmail, userPassword } = req.body;
        
        // Checking if the credentials are missing in the request
        if (userName === "" || userEmail === "" || userPassword === "") {

            // Returning an error response
            return res.status(400).json({
                statusCode: 400,
                errorMessage: "Bad Request! The user credentials are missing in the request."
            });

        }

        // Creating an user account
        const result = await createAccount(req.body);
        // Returning a success response
        return result;

    };

}

// Exporting Area
export { SignUpController };