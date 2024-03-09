// Importing Area
import { router } from './routes';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Declaring the constants that will be used to run the authentication system API
const server = express();
const port = Number(process.env.SERVER_PORT) ? Number(process.env.SERVER_PORT) : 'not found!';

// Setting the express server to be possible to receive and send resources
server.use(express.json());
server.use(cors());
server.use(router);

// Server listening on specific port 
server.listen(port, () => {
    console.log(`Server Online, The application is running on port ${port}!`);
});