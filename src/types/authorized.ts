// Importing Area
import { JWT } from './accessToken';

// That's an authorized's type
type authorized = {
    success: true,
    data: JWT
}

// Exporting Area
export type { authorized };