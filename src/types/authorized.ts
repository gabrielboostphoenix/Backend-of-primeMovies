// Importing Area
import { JwtPayload } from 'jsonwebtoken';
import { JWT } from './accessToken';

// That's an authorized's type
type authorized = {
    success: true,
    data: JwtPayload | JWT
}

// Exporting Area
export type { authorized };