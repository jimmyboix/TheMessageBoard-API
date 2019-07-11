import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const saltRounds = 10;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        minlength: [5, 'Username must be 5 characters or more.'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be 8 characters or more.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
export default User;