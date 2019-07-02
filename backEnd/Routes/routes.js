const router = require('express').Router();
const multer = require('multer');
const postController = require('../Controllers/postController');
const userController = require('../Controllers/userController');
const middleware = require('../Middleware/middleware');
const commentController = require('../Controllers/commentController');

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

let upload = multer({ storage: storage });

router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/createComments').post(middleware.authenticate, commentController.createComments);
router
  .route('/getPostsByCreator/:id')
  .get(middleware.authenticate, postController.getPostsByCreator);
router.route('/getLastTenPosts').get(middleware.authenticate, postController.getLastTenPosts);
router
  .route('/getPostCommentsById/:id')
  .get(middleware.authenticate, commentController.getPostCommentsById);
router.route('/getUser/:id').get(middleware.authenticate, userController.getUser);
router.route('/getLoggedInUser').get(middleware.authenticate, userController.getLoggedInUser);

router
  .route('/createPost')
  .post(middleware.authenticate, upload.single('avatar'), postController.createPost);
router.route('/setLikesCount/:id').put(middleware.authenticate, postController.setLikesCount);
router
  .route('/getLikesCountByPostId/:id')
  .get(middleware.authenticate, postController.getLikesCountByPostId);
router.route('/deletePostById/:id/').delete(middleware.authenticate, postController.deletePostById);

module.exports = router;
