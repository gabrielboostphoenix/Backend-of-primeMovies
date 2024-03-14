// Importing Area
import { JwtPayload } from 'jsonwebtoken';

// That's an own JSON Web Token's type
interface JWT extends JwtPayload {
    email: string,
    password: string
};

// Exporting Area
export { JWT };