const router = require('express').Router();
const toDoController = require('../Controllers/toDoController');
const userController = require('../Controllers/userController');
const middleware = require('../Middleware/middleware');

// router
//   .route('/toDoItem')
//   .post(middleware.authenticate, toDoController.createToDoItem)
//   .get(middleware.authenticate, toDoController.getAllItems);
// router.route('/deleteItem').post(middleware.authenticate, toDoController.deleteItem);
// router.route('/markAllChecked').get(middleware.authenticate, toDoController.markAllChecked);
// router.route('/deleteItemById/:id/').delete(middleware.authenticate, toDoController.deleteItemById);
// router.route('/toogleItem/:id/').put(middleware.authenticate, toDoController.toogleItem);
// router.route('/getItem/:id/').get(middleware.authenticate, toDoController.getItem);

// router.route('/register').post(userController.register);
// router.route('/getUser').get(userController.getUser);
// router.route('/login').post(userController.login);
// router.route('/logout').get(middleware.authenticate, userController.logout);

module.exports = router;
