import db from './../models';
import bcryptjs from 'bcryptjs';
const jwt = require('jsonwebtoken');
const userController = {};

userController.post = (req, res) => {
    const {username, password} = req.body;

    const user = new db.User({
        username,
        password
    });

    user.save().then((newUser) => {
        res.status(200).json({
            success: true,
            data: newUser
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.toString()
        });
    });
}

userController.login = (req, res) => {
    const {username, password} = req.body;
    
    db.User.findOne({'username': username, 'isDeleted': false})
    .then((user) => {
        if(user) {   
            if(bcryptjs.compareSync(password, user.password)) { 
                
                const token = jwt.sign({id: user._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                
                const userObj = user;
                userObj.password = undefined;

                return res.status(200).json({
                    success:true,
                    data: {user: userObj, token: token},
                });
            } else{
                return res.status(401).json({
                    message: 'Issue with User/Password Authentication...'
                });
            }
        } else{
            return res.status(401).json({
                message: 'No User Found...'
            });
        }
    }).catch((err) => {
        console.log(err)
        return res.status(500).json({
            message: err
        })
    });
}

export default userController;