function baseAjax() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {  
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");  
	} else {  
	    xmlhttp = null;  
	    return;
	}  
	xmlhttp.open(arguments[0],arguments[1],true);
	var callback = arguments[3];
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			callback(JSON.parse(xmlhttp.responseText));
		}
	}
	if (arguments[0] == 'GET') {
		xmlhttp.send();
	} else {
		var str = formatParams(arguments[2]);
		console.log(str);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(str);
	}
}

//格式化参数
function formatParams(data) {
	var arr = [];
	for(var name in data){
		arr.push(name + '=' + data[name]);
	}
	return arr.join("&");
}