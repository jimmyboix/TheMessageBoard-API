import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import routesUser from './routesUser';
import bodyParser from 'body-parser';
import cors from 'cors';

var jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/chat-forum',  { useNewUrlParser: true , useCreateIndex: true, useFindAndModify: false},  () => {
    console.log('Connected to mongodb...');
})

const app = express();

app.set('secretKey', 'nodeRestApi');

//Middleware
app.use(bodyParser.json());

app.use('/api/public', routesUser);

app.use('/api', validateUser, routes);

//app.use(cors({credentials: true, origin: true}));

function validateUser(req, res, next) {

    let tokenHeader = req.headers['x-access-token'] || req.headers['authorization'];
    let string = "" + tokenHeader;
    let arr = string.split(" ");
    let token = arr[1];
 
    jwt.verify(token, req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        return res.json(err);
      }else{
        req.body.userId = decoded.id;
        next();
      }
    });
    
  }

export default app;