import stdRes from '../stdRes.js'
import request from 'request'
import cheerio from 'cheerio'

let getSchedule = (req, res) => {
	let session = req.body.session;
	if(!global.login) {
		res.json(stdRes('please login',-1,{}));
		return;
	}
	else{
		let url = "http://jwkq.xupt.edu.cn:8080/User/Schedule";
		request(
			{
				url : url,
				method : "POST",
				headers : {
					"Referer" : "http://jwkq.xupt.edu.cn:8080/User/Schedule",
					"Cookie" : session
				}
			},
			function(err,response,body){
				if(err){
		    		res.json(stdRes('Server Error',-1,{}));
		    		return;
		    	}
		    	let ifSuccess = body.indexOf("课表信息");
				if(ifSuccess == -1){
					res.json(stdRes("Msg Error",-1,{}));
					return;
				}
				else {
					let $ = cheerio.load(body);
		            let semester = $(".kebiaobox h2").text();
		            semester = semester.substr(0,semester.length - 5);
		            semester = semester.trim();
		            getClass(semester,session,res);
				}
			}
		);
	}
};

function getClass(semester,session,res) {
	let url = "http://jwkq.xupt.edu.cn:8080/User/GetStuClass";
	request(
		{
			url : url,
			method : "POST",
			form : {
				term_no : semester,
				json : true
			},
			headers : {
				"Referer" : "http://jwkq.xupt.edu.cn:8080/User/Schedule",
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
	    		let stuClass = {};
		    	stuClass.semester = semester;
		    	stuClass.class = [];
		    	for(let item of bodyJson.Obj){
		    		let oneClass = {};
		    		oneClass.week = item.WEEKNUM;
		    		oneClass.no = item.JT_NO;
		    		oneClass.classname = item.S_Name;
		    		oneClass.classcode = item.S_Code;
		    		oneClass.classteacher = item.Teach_Name;
		    		oneClass.classroom = item.RoomNum;
		    		oneClass.buildname = item.B_Name;
		    		stuClass.class.push(oneClass);
		    	}
		    	res.json(stdRes('Success',0,stuClass));
	    	}
	    	else{
	    		res.json(stdRes('Server Error',-1,{}));
	    	}
		}
	);
}

export default getSchedule;