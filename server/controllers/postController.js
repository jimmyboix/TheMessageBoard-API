import db from './../models';

const postController = {};

postController.post = (req,res) => {
    const {
        title,
        text,
        link,
        isAnon,
        userId
    } = req.body;

    //Validation

    const post = new db.Post({
        title, 
        text,
        link,
        _creator : userId,
        isAnon
    });

    post.save().then((newPost) => {
        return res.status(200).json({
            success: true,
            data: newPost
        })
    }).catch((err) => {
        return res.status(500).json({
            message: err
        })
    });
};

postController.getAll = (req, res) => {
    db.Post.find({'isDeleted': false}).populate({
        path: '_creator',
        select: 'username -_id createdAt',
    }).populate({
        path: '_comments',
        select: 'text createdAt isAnon _creator',
        match: {'isDeleted': false}
    })
    .then((posts) => {
        return res.status(200).json({
            success:true,
            data: posts
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        })
    });
};

postController.deletePost = (req, res) => {
    const {
        postId
    } = req.body;

    db.Post.update({'_id':postId}, {'isDeleted':true})
    .then((del) => {
        return res.status(200).json({
            success:true
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        })
    });
}

export default postController;