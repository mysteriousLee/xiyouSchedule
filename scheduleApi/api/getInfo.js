import stdRes from '../stdRes.js'
import request from 'request'

let getInfo = (req, res) => {
	if(!global.login) {
		res.json(stdRes('please login',-1,{}));
		return;
	}
	else if(global.info) {
		res.json(stdRes('Success',0,{info : global.info}));
		return;
	}
	else{
		res.json(stdRes('Error',-1,{}));
		return;
	}
};

export default getInfo;