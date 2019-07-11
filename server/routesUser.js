import express from 'express';

//Controller imports
import basicController from './controllers/basicController';
import userController from './controllers/userController';

const routes = express();

// Basic routes
routes.get('/', basicController.get);

// User routes
routes.post('/signup', userController.post);
routes.post('/login', userController.login);

export default routes;