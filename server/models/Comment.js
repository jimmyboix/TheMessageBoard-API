import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const commentSchema = new Schema ({
   text: {
       type:String, 
       required:true
    },
   isDeleted: {
       type: Boolean,
       default: false
   },
   isAnon: {
    type: Boolean,
    default: false
   },
   createdAt: {
       type: Date,
       default: Date.now
   },
   _creator: {
       type: Schema.ObjectId,
       ref: 'User' 
   },
   _post: {
    type: Schema.ObjectId,
    ref: 'Post' 
}
});

const autoPopCreator = function(next){
    this.populate({
        path: '_creator',
        select: 'username created _id'
    });
    next();
}

commentSchema.pre('find', autoPopCreator);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;