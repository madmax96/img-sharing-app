
const UserControllers = require('./controllers/UserControllers');
const ImageControllers = require('./controllers/ImageControllers');

const authMiddleware = require('./middlewares/authenticate');

const routes = [

    {method:'post',path:'/users', handler:UserControllers.registerUser},
    {method:'post',path:'/users/login', handler:UserControllers.loginUser},
    {method:'post',path:'/users/logout', handler:[ authMiddleware,UserControllers.logoutUser ]},

    {method:'get',path:'/users/me',handler:[authMiddleware ,UserControllers.getAuthUser]},

    {method:'patch',path:'/users/me',handler:[authMiddleware ,UserControllers.updateAuthUser]},

    {method:'get',path:'/users/:userName',handler:[authMiddleware ,UserControllers.getUser]},
    {method:'get',path:'/users/checkEmail/:email',handler:UserControllers.isEmailAvailable},
    {method:'get',path:'/users/checkUserName/:userName',handler:UserControllers.isUserNameAvailable},
    {method:'get',path:'/images/:page/:perPage',handler:[authMiddleware,ImageControllers.getImages]},
    {method:'patch',path:'/images/:imageId',handler:[authMiddleware,ImageControllers.updateImage]},
    {method:'post',path:'/images/',handler:[authMiddleware,ImageControllers.crateImage]},
    {method:'delete',path:'/images/:imageId',handler:[authMiddleware,ImageControllers.deleteImage]},

];

module.exports = function initRoutes(app) {
    for (const route of routes) {
        app.route(route.path)[route.method] (route.handler);
    }
}