const Router = require('koa-router')
const UserController = require('../controller/user')
const HomeController = require('../controller/home')
const GoodsController = require('../controller/goods')



const router = new Router({
    prefix: '/api/v1'
})

/**
 * home页面数据
 */
router.get('/home',HomeController.getHomeInitData)

/**
 * 用户接口
 */
router.post('/user/register', UserController.create);
router.post('/user/login', UserController.login);
router.get('/user/info', UserController.getUserInfo);
router.get('/user/list', UserController.getUserList);
router.delete('/user/delete/:id', UserController.delete);


/** 
 * 商品接口
 */
router.get('/goods/getGoodsDetail', GoodsController.getGoodsDetail)
router.get('/goods/commentsList', GoodsController.getCommentsList)
router.get('/goods/getCategories', GoodsController.getCategories);
router.get('/goods/getCategoriesChild', GoodsController.getCategoriesChild);
router.post('/goods/getCategoriesChildList', GoodsController.getCategoriesChildList);


module.exports = router