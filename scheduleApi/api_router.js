import Express from 'express'
import vercode from './api/vercode'
import login from './api/login'
import getInfo from './api/getInfo'
import getSchedule from './api/getSchedule'

let router = Express.Router();

//获取验证码
router.use('/vercode', vercode);

//登录
router.use('/login', login);

//获取个人信息
router.use('/getInfo', getInfo);

//获取课表
router.use('/getSchedule', getSchedule);
export default router;