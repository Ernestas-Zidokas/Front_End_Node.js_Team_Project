const router = require('express').Router();
const postController = require('../Controllers/postController');
const userController = require('../Controllers/userController');
const middleware = require('../Middleware/middleware');

router.route('/toDoItem')
  .post(middleware.authenticate, postController.createToDoItem)
  .get(middleware.authenticate, postController.getAllItems)
  //.put(middleware.authenticate, postController.getAllItems)   //pats darasiau


//sita visa pilna rauta isikeliau is saves
  // router.route('/toDoItem/:id')
  //   .delete(middleware.authenticate, toDoController.deleteItem)
  //   .put(middleware.authenticate, toDoController.toggleItem)
  //   .get(middleware.authenticate, toDoController.getItem)

router.route('/deleteItem')
.post(middleware.authenticate, postController.deleteItem);

router.route('/markAllChecked')
.get(middleware.authenticate, postController.markAllChecked);

router.route('/deleteItemById/:id/')
.delete(middleware.authenticate, postController.deleteItemById);

router.route('/toogleItem/:id/')
.put(middleware.authenticate, postController.toogleItem);

router.route('/getItem/:id/')
.get(middleware.authenticate, postController.getItem);

router.route('/register')
.post(userController.register);

router.route('/getUser')
.get(userController.getUser);

router.route('/login')
.post(userController.login);

router.route('/logout')
.get(middleware.authenticate, userController.logout);

module.exports = router;
