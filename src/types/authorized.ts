// Importing Area
import { JwtPayload } from 'jsonwebtoken';

// That's an authorized's type
type authorized = {
    success: true,
    data: string | JwtPayload
}

// Exporting Area
export type { authorized };