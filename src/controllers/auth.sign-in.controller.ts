// Importing Area
import { signIn } from '../types/signIn';
import { findUserAccountByEmailCredential, verifyThePasswords } from '../services/auth.sign-in.service';

// That's a sign-in class
class SignInController {

    // This method finds an existing user account and log-in it
    async signIn(req: signIn, res: any) {

        // Extrating the informations from request
        const { userEmail, userPassword } = req.body;

        // Checking if the user credentials are missing in the request
        if (userEmail === "" || userPassword === "") {

            // Returning an error response
            return res.status(400).json({
                statusCode: 400,
                errorMessage: "Bad Request! The user credentials are missing in the request."
            });

        }

        // Searching for specific user account in the database registers
        const result = await findUserAccountByEmailCredential(userEmail);

        // Checking the data type of operation result
        if (result === null) {

            // Returning an error response
            return res.status(404).json({
                statusCode: 404,
                errorMessage: "User account record wasn't found! The e-mail credential is invalid."
            });

        }

        // Verifying whether the received password from request is the same as the database record
        const comparingResult = await verifyThePasswords(userPassword, result.password);

        // Checking the data type of comparing operation result
        if (!comparingResult) {
            
            // Returning an error response
            return res.status(400).json({
                statusCode: 400,
                errorMessage: "Bad Request! The password credential is invalid."
            });

        }

        // Returning a successfully response
        return res.status(200).json({
            statusCode: 200,
            successMessage: "Congratulations! The client was loged with successfully in the user account."
        });

    }

}

// Exporting Area
export { SignInController };