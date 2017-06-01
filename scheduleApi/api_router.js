import Express from 'express'
import vercode from './api/vercode'
import login from './api/login'
import getInfo from './api/getInfo'

let router = Express.Router();

//获取验证码
router.use('/vercode', vercode);

//登录
router.use('/login', login);

//获取个人信息
router.use('/getInfo', getInfo);


export default router;