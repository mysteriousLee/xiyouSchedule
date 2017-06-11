window.onload = function(){
    getCodeimg();
}
function signUp() {
	var model = {
		username : document.getElementById('username').value,
		password : document.getElementById('password').value,
		session : localStorage.session,
		vercode : document.getElementById('vercode').value
	};
	baseAjax('POST','http://localhost:4000/login',model,function(data){
       console.log(data);
	     if(data.errcode == 0){
          window.location.href = 'schedulePage.html';
       } else if(data.errcode == -1){
          alert(data.errmsg);
       }
  });
}
function getCodeimg() {
  var model = {};
  baseAjax('GET','http://localhost:4000/vercode',model,function(data){
    localStorage.session = data.session;
    document.getElementById('codeImg').src = data.verCode;
  });
}