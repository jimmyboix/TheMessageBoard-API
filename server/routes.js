import express from 'express';

//Controller imports
import basicController from './controllers/basicController';
import userController from './controllers/userController';
import postController from './controllers/postController';
import commentController from './controllers/commentController';

const routes = express();

// Basic routes
routes.get('/', basicController.get);

// User routes
routes.post('/signup', userController.post);
routes.post('/login', userController.login);

// Post routes
routes.post('/post', postController.post);
routes.get('/posts', postController.getAll);
routes.put('/delete-post', postController.deletePost);

// Comment routes
routes.post('/comment', commentController.post);
routes.get('/comments', commentController.getAll);

export default routes;