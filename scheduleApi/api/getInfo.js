import stdRes from '../stdRes.js'
import request from 'request'
import cheerio from 'cheerio'
import iconv from 'iconv-lite'

let getInfo = (req, res) => {
	if(global.info) {
		res.json(stdRes('Success',0,{info : global.info}));
		return;
	}
	else{
		res.json(stdRes('Error',-1,{}));
		return;
	}
};

export default getInfo;