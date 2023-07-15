const router = require('express').Router();
const { Comment } = require('../../../models');

// POST /api/comments (add a comment)
router.post('/', async (req, res) => {
    try {
        const comment = {
            post_id: req.body.postId,
            poster_id: req.body.userData.id,
            text: req.body.comment,
        }
        const commentData = await Comment.create(comment);
        res.json(commentData);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;