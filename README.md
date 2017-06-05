## 西邮课表API

#### Created by lilu Power by Nodejs

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
   "semester" : "2016-2017-2",
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


### 5.Address : localhost:4000/getAttendlist 参数 :  session(是 IP/vercode 返回的session 必填)monthDay(是从当日和往前推一个月的时间字符串 比如2017-05-05a2017-06-04) method ： POST/JSON 返回 :

```javascript
{
   "errcode" : 0,
   "errmsg" : "Success",
   "total" : 32,//总共课堂记录
   "allClass" : {
         [
            "absence" : 7,
            "attend" : 20,
            "attendance" : 0,
            "classname" : "编译原理",
            "late" : 0,
            "shouldattend" : 27,
            "total" : 31
         ],
         ......
   },
   "attendlist" : {
         [
            "classname" : "编译原理",
            "classno" : "1-2",
            "classname" : "FZ310",
            "status" : 1,//1表示正常签到，2表示请假，3表示缺勤
            "time" : "2017-05-05"
         ]
         ......
   }
}

```

### 6.Address : localhost:4000/getbuildList 参数 : 无 method ： POST/JSON 返回 :

```javascript
{
   "errcode" : 0,
   "errmsg" : "success",
   "buildList" : {
         [
            "buildName" : "雁塔校区18层楼",
            "id" : 164
         ],
         [
            "buildName" : "长安校区西区基础教学B楼",
            "id" : 166
         ]
         ......
   }
}

```

### 7.Address : localhost:4000/getcurrentRoom 参数 : id(是IP/getbuildList返回的id,查哪栋教学楼传入其对应的参数) method ： POST/JSON 返回 :

```javascript
{
   "errcode" : 0,
   "errmsg" : "success",
   "roomList" : {
         "FF203" : {
            "0" : {
               "count" : 160,//教室容纳人数
               "roomnum" : "FF203",
               "time" : "5-6"
            },
            "1" : {
               "count" : 160,
               "roomnum" : "FF203",
               "time" : "3-4"
            }
         },
         "FF205" : {
            "0" : {
               "count" : 160,
               "roomnum" : "FF205",
               "time" : "5-6"
            },
            "1" : {
               "count" : 160,
               "roomnum" : "FF205",
               "time" : "1-2"
            },
            "2" : {
               "count" : 160,
               "roomnum" : "FF205",
               "time" : "3-4"
            }
         }
         ......
   }
}

```
