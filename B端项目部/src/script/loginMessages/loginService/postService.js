'use strict';

angular.module('app')
	.factory('$post',['$http','www', function($http, www) {
		var http=www.api();
		return {
			//B端用户登录接口
			postUserLogin:function (data,key){
				return $http({
		      	method: 'POST',
		      	data:data,
		      	url:http+'/hyb-entuser/ent_user/login',
		      	headers:{'UNIQUE_KEY':key}
		      })
			},
			
		/*注册页面接口文档*/			
			//1==图片验证码接口
			postRegister: function(key){
		      return $http({
		      	method: 'GET',
		      	url:http+'/hyb-entuser/kaptcha',
		      	headers:{'UNIQUE_KEY':key}
		      })
		    },
		    
		    //1. B端用户注册接口
		    postMessage: function(data,key) {
		    	return $http({
		    		method:'POST',
		    		url:http+'/hyb-entuser/ent_user/register',
		    		data:data,
		    		headers:{'UNIQUE_KEY':key}
		    	})
		    },
		    
		    
		    //2. B端用户完善企业信息接口
		    postCompangMessage: function (data) {
		    	return $http({
		    		method:'POST',
		    		url:http+'/hyb-ent/ent_info/update',
		    		data:data,
		    	})
		    },
		    
		    //3. B端用户完善企业信息---添加联系人接口
		    postAddPerson : function (data) {
		    	return $http({
		    		method:'POST',
		    		url:http+'/hyb-ent/ent_info/create_linkman',
		    		data:data,
		    	})
		    },
		    
		    //4. B端用户完善企业信息----添加联系人----发送验证码请求接口
		    postPersonCode : function (data) {
		    	return $http({
		    		method:'POST',
		    		url:http+'/hyb-ent/mobile/send',
		    		data:data,
		    		
		    	})
		    },
		    
		            /*===== 忘记密码接口=============================*/
		           
		    //B端发送手机验证码接口-  手机号 +图片验证码
		    postForgetNum : function (data,key){
		    	return $http({
		    		method:'POST',
		    		url:http+'/hyb-entuser/mobile/send',
		    		data:data,
		    		headers:{'UNIQUE_KEY':key}
		    	})
		    },
		    
		    //发送给手机的短信验证码         手机号+短信验证码 发送给 后端 
		     postForgetValid : function (data,key){
		    	return $http({
		    		method:'POST',
		    		url:http+'/hyb-entuser/mobile/valid_mess',
		    		data:data,
		    		headers:{'UNIQUE_KEY':key}
		    	})
		    },
		    //给用户手机发短信  多次 发短信 验证码接口 
		    postNumCode : function(data,key) {
		    	return $http({
		    		method:'POST',
		    		url:http+'/hyb-entuser/mobile/resend',
		    		data:data,
		    		headers:{'UNIQUE_KEY':key}
		    	})
		    },
		    
		    postChangePasswd : function(data,key) {
		    	return $http({
		    		method:'POST',
		    		url:http+'/hyb-entuser/ent_user/change_passwd',
		    		data:data,
		    		headers:{'UNIQUE_KEY':key}
		    	})
		    },
		    
		    //图片验证码接口
		    
		    getKaptcha : function(key){
		    	return $http({
		    		method:'GET',
		    		url:http+'/hyb-entuser/kaptcha',
		    		headers:{'UNIQUE_KEY':key}
		    	})
		    },
		    
		    //获取本地json文件
		    getJson : function(){
		    	return $http({
		    		method:'GET',
		    		url:'data/hangye.json'
		    	})
		    },
		}
	}])
	
