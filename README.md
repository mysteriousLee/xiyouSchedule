## 西邮课表API

#### Create by lilu Power by Nodejs

### 1.Address : localhost:4000/verCode 参数 : 无 method ： GET/JSON 返回 :

```javascript
{
   "errcode" : 0,
   "errmsg" : "success",
   "session" : ... ,
   "verCode" : ... (验证码的base64编码，直接放在Img的src中即可显示)
}

```

