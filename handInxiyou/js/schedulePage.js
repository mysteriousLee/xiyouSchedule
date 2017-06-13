window.onload = function(){
	getInfo();
	getSchedule();
	bindEvent();
	getSelect();
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
	   	 if (data.errmsg == 'please login') {
	   	 	window.location.href = 'index.html';
	   	 }
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
	   	 if (data.errmsg == 'please login') {
	   	 	window.location.href = 'index.html';
	   	 }
	   }
	});
}
function getSelect() {
	var model = {};
	var loading = document.getElementsByClassName('loading')[0];
	loading.style.display = 'block';
	baseAjax('GET','http://localhost:4000/getbuildList',model,function(data){
	   if (data.errcode == 0) {
	   	loading.style.display = 'none';
	   	 var select = document.getElementById('buildSelect');
	   	 for (var i = 0; i < data.buildList.length; i++) {
	   	 	select.innerHTML = select.innerHTML + '<option data-id="' + data.buildList[i].id + '">' + data.buildList[i].buildName + '</option>';
	   	 }
	   } else if (data.errcode == -1){
	   	 alert(data.errmsg);
	   }
	});
}
function bindEvent() {
	var scheduleBlock = document.getElementsByClassName('scheduleBlock')[0];
	var roomBlock = document.getElementsByClassName('roomBlock')[0];
	var bottomBlock1 = document.getElementsByClassName('bottomBlock1')[0];
	var bottomBlock2 = document.getElementsByClassName('bottomBlock2')[0];
	var findRoom = document.getElementById('findRoom');
	scheduleBlock.addEventListener('click',function(){
		bottomBlock1.style.display = 'block';
		bottomBlock2.style.display = 'none';
	},false);
	roomBlock.addEventListener('click',function(){
		bottomBlock2.style.display = 'block';
		bottomBlock1.style.display = 'none';
	},false);
	findRoom.addEventListener('click',function(){
		var buildSelect = document.getElementById('buildSelect');
		var numOption = buildSelect.selectedIndex;
		var selectOption = buildSelect.getElementsByTagName('option')[numOption];
		initTable();
		findinputRoom(selectOption.dataset.id);
	},false);
}
function initTable() {
	var ele = {
		'0' : document.getElementById('1-2'),
		'1' : document.getElementById('3-4'),
		'2' : document.getElementById('5-6'),
		'3' : document.getElementById('7-8')
	};
	var people = document.getElementById('class_people');
	people.innerHTML = '未知';
	for(var item in ele){
		ele[item].innerHTML = '未占用';
	}
}
function findinputRoom(id) {
	var model = {
		id : id
	};
	baseAjax('POST','http://localhost:4000/getcurrentRoom',model,function(data){
	   if (data.errcode == 0) {
	     getroomList(data);
	   } else if (data.errcode == -1) {
	   	 alert(data.errmsg);
	   }
	});
}
function setTable(data) {console.log(data);
	for(var i = 0;i < data.class.length; i++){
		var id = data.class[i].week + '-' + data.class[i].no;
		var ele = document.getElementById(id);
		ele.innerHTML = '<div class="className">' + data.class[i].classname + '</div>' +
						'<div class="teacherName">' + 
							'<img src="images/teacher.png">' +
							'<span>' + data.class[i].classteacher + '</span>' +
						'</div>' +
						'<div class="findRoom">' +
							'<img src="images/find.png">' +
							'<span>查看</span>' +
						'</div>' + 
						'<div class="hiddenInfo">' + data.class[i].classname + ' ' + data.class[i].classcode + ' ' + data.class[i].buildname + ' ' + data.class[i].classroom + ' ' + data.class[i].classteacher + '</div>';
	}
	var semester = document.getElementsByClassName('semester')[0];
	semester.innerHTML = data.semester + semester.innerHTML;
	bindFloateve(data);
}
function getroomList(data) {console.log(data.roomList);
	if(data.length == 0){
		alert('没有占用的教室');
		return;
	}
	var no = document.getElementById('roomNo').value;
	if(no === ''){
		alert('请检查输入');
		return;
	}
	for(var item in data.roomList){
		if(item == no){
			setRoom(no,data.roomList[item]);
			return;
		}
	}
	setRoom(no);
}
function setRoom(no,roomList) {
	var name = document.getElementById('class_name');
	var people = document.getElementById('class_people');
	var table = document.getElementsByClassName('classTable')[0];
	table.style.visibility = 'visible';
	name.innerHTML = no;
	if (roomList) {
		people.innerHTML = roomList[0].count;
		for(var i = 0;i < roomList.length; i++){
			var ele = document.getElementById(roomList[i].time);
			ele.innerHTML = '占用';
		}
	}
}
function bindFloateve(data) {
	var findDiv = document.getElementsByClassName('findRoom');
	for(var i = 0;i < findDiv.length; i++){
		findDiv[i].onclick = function(){
			var targetEle = event.target.parentNode.parentNode;
			var hiddenInfo = targetEle.getElementsByClassName('hiddenInfo')[0];
			var val = hiddenInfo.innerHTML.split(' ');
			var floatdiv = document.getElementById('floatdiv');
			floatdiv.style.display = 'block';
			var floatObj = {
				'0' : document.getElementById('floatName'),
				'1' : document.getElementById('floatCode'),
				'2' : document.getElementById('floatSchool'),
				'3' : document.getElementById('floatRoom'),
				'4' : document.getElementById('floatTeacher')
			};
			for(var item in floatObj){
				var preVal = floatObj[item].innerHTML.split(':')[0];
				floatObj[item].innerHTML = '';
				floatObj[item].innerHTML = preVal + ' : ' + val[item];
			}
		}
	}
}
function closeFloat() {
	var floatdiv = document.getElementById('floatdiv');
	floatdiv.style.display = 'none';
}