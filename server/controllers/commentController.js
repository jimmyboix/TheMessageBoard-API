import db from './../models';

const commentController = {};

commentController.post = (req,res) => {
    const {
        text,
        postId,
        userId,
        isAnon
    } = req.body;
    
const comment = new db.Comment({
        text, 
        _post: postId,
        _creator : userId,
        isAnon
});

comment.save().then((newComment) => {
    db.Post.findByIdAndUpdate(
            postId,
            { $push: {'_comments': newComment._id}}
    ).then((exisitingPost) =>{
            res.status(200).json({
                success: true,
                data: newComment,
                exisitingPost
            })
    }).catch((err) => {
            return res.status(500).json({
                message: err.toString()
            })
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err.toString()
        })
    });
};


commentController.getAll = (req, res) => {
    var postId = req.query.postId;
    if(postId != null){
        db.Comment.find({'_post': postId})
            .then((comments) => {
                return res.status(200).json({
                success:true,
                data: comments
            });
             }).catch((err) => {
                return res.status(500).json({
                message: err
            })
        });
    } else{
        return res.status(500).json({
            message: 'Valid Post ID must be passed in'
        })
    }
};

export default commentController;
