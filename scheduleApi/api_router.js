import Express from 'express'
import vercode from './api/vercode'


let router = Express.Router();

//获取验证码
router.get('/vercode', vercode);

export default router;