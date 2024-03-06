// Importing Area
import { createAccount, findUserByEmail } from '../services/auth.sign-up.service';
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

        // Verifying whether the e-mail is been used for another user account
        const checkingIfEmailAlreadyIsBeenUsed = await findUserByEmail(userEmail);

        // Checking the data type of response
        if (checkingIfEmailAlreadyIsBeenUsed) {

            // Instancing an error
            const error = new Error('This e-mail already is been used, try to use another!');
            // Returning an error response
            return res.status(409).json({
                statusCode: 409,
                errorMessage: error.message
            });

        } else {

            return 'E-mail válido!';

        }

        // Creating an user account
        const result = await createAccount(req.body);
        // Returning a success response
        return result;

    };

}

// Exporting Area
export { SignUpController };