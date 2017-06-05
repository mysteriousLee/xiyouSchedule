import Express from 'express'
import vercode from './api/vercode'
import login from './api/login'
import getInfo from './api/getInfo'
import getSchedule from './api/getSchedule'
import getAttend from './api/getAttendlist'
import { getbuildList,getcurrentRoom} from './api/getclassRoom'

let router = Express.Router();

//获取验证码
router.use('/vercode', vercode);

//登录
router.use('/login', login);

//获取个人信息
router.use('/getInfo', getInfo);

//获取课表
router.use('/getSchedule', getSchedule);

//获取考勤表
router.use('/getAttendlist', getAttend);

//获取教学楼列表
router.use('/getbuildList', getbuildList);

//获取占用教室信息
router.use('/getcurrentRoom', getcurrentRoom);
export default router;