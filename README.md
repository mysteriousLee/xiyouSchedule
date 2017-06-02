## 西邮课表API

#### Create by lilu Power by Nodejs

### 1.Address : localhost:4000/vercode 参数 : 无 method ： GET/JSON 返回 :

```javascript
{
   "errcode" : 0,
   "errmsg" : "success",
   "session" : ... ,
   "vercode" : ... (验证码的base64编码，直接放在Img的src中即可显示)
}

```

### 2.Address : localhost:4000/login 参数 : username (学号 必填)、password (密码 必填)、session(是 IP/vercode 返回的session 必填)、vercode(验证码 必填) method ： POST/JSON 返回 :

```javascript
{
   "errcode" : 0,
   "errmsg" : "success"
}

```

### 3.Address : localhost:4000/getInfo 参数 : 无 method ： GET/JSON 返回 :

```javascript
{
   "errcode" : 0,
   "errmsg" : "Success",
   "Info" : {
   		"class" : "计科1405",
   		"college" : "计算机学院",
   		"major" : "计算机科学与技术",
   		"name" : "李璐",
   		"sno" : "04141143"
   }
}

```

### 4.Address : localhost:4000/getSchedule 参数 :  session(是 IP/vercode 返回的session 必填)method ： POST/JSON 返回 :

```javascript
{
   "errcode" : 0,
   "errmsg" : "Success",
   "semester" : "2016-2017-2"
   "class" : {
         [
            "buildname" : "长安校区东区逸夫楼",
            "classcode" : "JS100321",
            "classname" : "计算机组成原理A",
            "classroom" : "FZ310",
            "classteacher" : "董梁",
            "no" : "1-2",
            "week" : "3"
         ],
         ......
   }
}

```

