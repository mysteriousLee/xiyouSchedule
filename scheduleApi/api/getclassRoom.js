import stdRes from '../stdRes.js'
import request from 'request'

let getbuildList = (req, response) => {
	let url = 'http://jwkq.xupt.edu.cn:8080/Build/GetList';
	request(
		{
			url : url,
			method : "POST",
			headers : {
				"Referer": 'http://jwkq.xupt.edu.cn:8080/Room'
			          }   
		},function(err,res,body){
			if(err){
	    		response.json(stdRes('Server Error',-1,{}));
	    		return;
	    	}
	    	let bodyJson = JSON.parse(body);
	    	if (bodyJson.IsSucceed) {
		    	let result = {};
		    	result.buildList = [];
		    	for(let item of bodyJson.Obj){
		    		let oneBuild = {};
		    		oneBuild.id = item.BH;
		    		oneBuild.buildName = item.NAME;
		    		result.buildList.push(oneBuild);
		    	}
		    	response.json(stdRes('Success',0,result));
	    	}
	    	else{
	    		response.json(stdRes('Server Error',-1,{}));
	    	}
		}
	);
};


let getcurrentRoom = (req, response) => {
	let id = req.body.id;
	let url = 'http://jwkq.xupt.edu.cn:8080/Room/GetCurrentRoom';
	let model = {
		id : id,
		json : true
	};
	request(
		{
			url : url,
			method : 'POST',
			form : model,
			headers : {
				"Referer" : "http://jwkq.xupt.edu.cn:8080/Home",
			}
		},
		function(err,res,body){
			if(err){
	    		response.json(stdRes('Server Error',-1,{}));
	    		return;
	    	}
	    	let bodyJson = JSON.parse(body);
	    	if (bodyJson.IsSucceed) {
		    	let roomList = [];
		    	for(let item of bodyJson.Obj){
		    		let oneBuild = {};
		    		oneBuild.id = item.B_BH;
		    		oneBuild.time = item.EQNO;
		    		oneBuild.roomnum = item.ROOMNUM;
		    		oneBuild.count = item.USERCOUNT;
		    		roomList.push(oneBuild);
		    	}
		    	simpleArray(roomList,response);
	    	}
	    	else{
	    		response.json(stdRes('Server Error',-1,{}));
	    	}
		}
	);
};

function simpleArray(roomList,res) {
	let result = {};
	result.roomList = {};
	result.length = 0;
	for(let item of roomList){
		if(!result.roomList[item.roomnum]){
			result.roomList[item.roomnum] = [];
			result.length++;
		}
		let newObj = {};
		newObj.roomnum = item.roomnum;
		newObj.time = item.time;
		newObj.count = item.count;
		result.roomList[item.roomnum].push(newObj);
	}
	res.json(stdRes('Success',0,result));
}
export { getbuildList,getcurrentRoom };