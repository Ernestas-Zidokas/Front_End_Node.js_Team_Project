const router = require('express').Router();
const postController = require('../Controllers/postController');
const userController = require('../Controllers/userController');
const middleware = require('../Middleware/middleware');
const commentController = require('../Controllers/commentController');

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/createComments').post(middleware.authenticate, commentController.createComments);
router.route('/createPost').post(middleware.authenticate, postController.createPost);
router.route('/getPostByCreator').post(middleware.authenticate, postController.getPostByCreator);
router.route('/getLastTenPosts').get(postController.getLastTenPosts);      
router.route('/getPostByCreator/:id').get(middleware.authenticate, postController.getPostByCreator);
router.route('/setLikesCount/:id').put(middleware.authenticate, postController.setLikesCount);
router
  .route('/getLikesCountByPostId/:id')
  .get(middleware.authenticate, postController.getLikesCountByPostId);

module.exports = router;
