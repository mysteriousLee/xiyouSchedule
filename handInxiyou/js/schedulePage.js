window.onload = function(){
	getInfo();
	getSchedule();
}
function getInfo() {
	var model = {};
	baseAjax('GET','http://localhost:4000/getInfo',model,function(data){
	   if (data.errcode == 0) {
	   	 var name = document.getElementById('infoName');
	   	 var className = document.getElementById('infoClass');
	   	 var college = document.getElementById('infoCollege');
	   	 name.innerHTML = data.info.name;
	   	 className.innerHTML = data.info.class;
	   	 college.innerHTML = data.info.college;
	   } else if (data.errcode == -1){
	   	 alert(data.errmsg);
	   }
	});
}
function getSchedule() {
	var model = {
		session : localStorage.session
	};
	var loading = document.getElementsByClassName('loading')[0];
	loading.style.display = 'block';
	baseAjax('POST','http://localhost:4000/getSchedule',model,function(data){
	   if (data.errcode == 0) {
	   	loading.style.display = 'none';
	   	setTable(data);
	   } else if (data.errcode == -1) {
	   	 alert(data.errmsg);
	   }
	});
}
function setTable(data) {console.log(data);
	for(var i = 0;i < data.class.length; i++){
		var id = data.class[i].week + '-' + data.class[i].no;
		var ele = document.getElementById(id);
		ele.innerHTML = '<div class="className"></div>' +
						'<div class="teacherName">' + 
							'<img src="images/teacher.png">' +
							'<span>' + data.class[i].classteacher + '</span>' +
						'</div>' +
						'<div class="findRoom">' +
							'<img src="images/find.png">' +
							'<span>查看</span>' +
						'</div>';
	}
	var semester = document.getElementsByClassName('semester')[0];
	semester.innerHTML = data.semester + semester.innerHTML;
	//bindFloateve(data);
}
function bindFloateve(data) {
	var findDiv = document.getElementsByClassName('findRoom');
	for(var i = 0;i < findDiv.length; i++){
		findDiv[i].onclick = function(){console.log(event);
			// var floatdiv = document.getElementById('floatdiv');
			// floatdiv.style.display = 'block';
			// var floatName = document.getElementById('floatName');
			// var floatCode = document.getElementById('floatCode');
			// var floatSchool = document.getElementById('floatSchool');
			// var floatRoom = document.getElementById('floatRoom');
			// var floatTeacher = document.getElementById('floatTeacher');
			// floatName.innerHTML
		}
	}
}