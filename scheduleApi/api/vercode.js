import stdRes from '../stdRes.js'
import request from 'request'
let vercode = (req, response) => {
	let time = new Date().getTime();
	let url = "http://jwkq.xupt.edu.cn:8080/Common/GetValidateCode?time=" + time;
	request(
		{
			url : url,
			method : "GET",
			encoding : null,
			Accept : "image/webp,image/*,*/*;q=0.8",
			headers : {
				"Referer": 'http://jwkq.xupt.edu.cn:8080/Account/Login'
			}
		}
		,function (err,res,body){
	      	if(err)
	    	{
	    		response.json(stdRes('Server Error',-1,{}));
	    		return;
	    	}
	    	let session = res.headers['set-cookie'][0];
	  		session = session.substr(0, session.indexOf(";"));
	    	if (!session) {
	    		response.json(stdRes('Server Error',-1,{}));
	    		return;
	    	}
	    	let imgBuf = body.toString('base64');
	    	imgBuf = "data:image/Gif;base64," + imgBuf;
	    	response.json(stdRes('success',0,{
	    		session : session,
	    		verCode : imgBuf
	    	}));	
		});
};

export default vercode;