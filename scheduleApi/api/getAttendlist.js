import stdRes from '../stdRes.js'
import request from 'request'
import cheerio from 'cheerio'


let attendList = {};

let getAttend = (req, res) => {
	let session = req.body.session;
	let monthDay = req.body.monthDay;
	if(!global.login) {
		res.json(stdRes('please login',-1,{}));
		return;
	}
	else{
		GetAttendRepList(session,res);
		getAttendlist(session,monthDay,res);
	}
};

function GetAttendRepList(session, res) {
	let url = "http://jwkq.xupt.edu.cn:8080/User/GetAttendRepList";
	request(
		{
			url : url,
			method : "POST",
			headers : {
				"Referer" : "http://jwkq.xupt.edu.cn:8080/User",
				"Cookie" : session
			}
		},
		function(err,response,body){
			if(err){
	    		res.json(stdRes('Server Error',-1,{}));
	    		return;
	    	}
	    	let bodyJson = JSON.parse(body);
	    	if (bodyJson.IsSucceed) {
		    	attendList.allClass = [];
		    	for(let item of bodyJson.Obj){
		    		let oneClass = {};
		    		oneClass.total = item.Total;
		    		oneClass.shouldattend = item.ShouldAttend;
		    		oneClass.classname = item.CourseName;
		    		oneClass.attend = item.Attend;
		    		oneClass.late = item.Late;
		    		oneClass.leave = item.Leave;
		    		oneClass.absence = item.Absence;
		    		oneClass.attendance = item.Attendance;
		    		attendList.allClass.push(oneClass);
		    	}
	    	}
	    	else{
	    		res.json(stdRes('Server Error',-1,{}));
	    	}
		}
	);
	
}

function getAttendlist(session, monthDay, res) {
	let url = "http://jwkq.xupt.edu.cn:8080/User/getAttendList";
	let model = {
		'WaterDate' : monthDay,
		'Status' : 3,
		'page' : 1,
		'rows' : 10,
		'Flag' : ''
	};
	request(
		{
			url : url,
			method : "POST",
			form : model,
			headers : {
				"Referer" : "http://jwkq.xupt.edu.cn:8080/User/Query",
				"Cookie" : session
			}
		},
		function(err,response,body){
			if(err){
	    		res.json(stdRes('Server Error',-1,{}));
	    		return;
	    	}
	    	let bodyJson = JSON.parse(body);
	    	let total = bodyJson.total;
	    	let page = 1;
	    	if(total % 10 > 0) {
	    		page = Math.floor(total/10) + 1;
	    	} else{
	    		total = Math.floor(total/10);
	    	}
	    	attendList.total = bodyJson.total;
	    	attendList.attendlist = [];
	    	for(let i = 1;i <= page; i++){
	    		getEverypage(i,monthDay,session);
	    	}
	    	
		}
	);
	returnResult(res);
}

function getEverypage(i,monthDay,session) {
	let url = "http://jwkq.xupt.edu.cn:8080/User/getAttendList";
	let model = {
		'WaterDate' : monthDay,
		'Status' : 3,
		'page' : i,
		'rows' : 10,
		'Flag' : ''
	};
	request(
		{
			url : url,
			method : "POST",
			form : model,
			headers : {
				"Referer" : "http://jwkq.xupt.edu.cn:8080/User/Query",
				"Cookie" : session
			}
		},
		function(err,response,body){
			if(err){
	    		res.json(stdRes('Server Error',-1,{}));
	    		return;
	    	}
	    	let bodyJson = JSON.parse(body);
	    	for(let item of bodyJson.rows){
	    		let oneClass = {};
	    		oneClass.time = item.WaterDate;
	    		oneClass.status = item.Status;
	    		oneClass.classname = item.S_Name;
	    		oneClass.classno = item.JT_No;
	    		oneClass.classroom = item.RoomNum;
	    		attendList.attendlist.push(oneClass);
	    	}
		}
	);
}

function returnResult(res) {
	res.json(stdRes('Success',0,attendList));
}


export default getAttend;