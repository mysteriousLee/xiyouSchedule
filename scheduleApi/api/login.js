import stdRes from '../stdRes.js'
import request from 'request'
import cheerio from 'cheerio'


let login = (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	let session = req.body.session;
	let vercode = req.body.vercode;
	
	if(!username || !password || !session || !vercode){
		res.json(stdRes('Input Error',-1,{}));
		return;
	}
	let url = "http://jwkq.xupt.edu.cn:8080/Account/Login";
	let model = {
		'UserName' : username,
		'UserPassword' : password,
		'ValiCode' : vercode
	};
	let modelStr = JSON.stringify(model);
	request(
		{
			url : url,
			method : "POST",
			form : modelStr,
			headers : {
				"Referer" : "http://jwkq.xupt.edu.cn:8080/Account/Login",
				"Cookie" : session
			}
		},
		function(err, response, body){
			if(err){
	    		res.json(stdRes('Server Error',-1,{}));
	    		return;
	    	}
	    	global.login = 1;
	    	let bodyJson = JSON.parse(body);
	    	//console.log(bodyJson);
	    	for(let item in bodyJson){
	    		if (item == 'IsSucceed' && bodyJson[item]) {
	    			let info = {};
	    			info = {
	    				name : bodyJson.Obj.NAME,
	    				sno : bodyJson.Obj.SNO,
	    				college : bodyJson.Obj.XYName,
	    				major : bodyJson.Obj.ZYName,
	    				class : bodyJson.Obj.BJ
	    			}
	    			global.info = info;
	    			res.json(stdRes('success',0,{}));
	    		}
	    		if (item == 'IsSucceed' && !bodyJson[item]) {
	    			res.json(stdRes(bodyJson.Msg,-1,{}));
	    			return;
	    		}
	    	}
		}
	);
};

export default login;