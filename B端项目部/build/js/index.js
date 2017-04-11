'use strict';

angular.module('app', ['ui.router']);

'use strict';

angular.module('app', ['ui.router','Encrypt'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
   var view='views/logins/';
   var viewR= view+'registerMessage/';
   var viewF=view+'forget/';
   $stateProvider
    	//用户登录页面首页
    	.state('login',{
    		url:'/login',
    		views: {
    			top:{
    				templateUrl:'views/logins/login1.html',
    			}
    		}
    		
    	})
   
   
       /*注册页面*/
    	.state('loginUser', {
    		url:'/register',
    		views: {
    			top:{
    				templateUrl:viewR+'register1.html',
    			}
    		}
    	})
    	
    	
    	//注册成功   弹出成功页面
    	.state('succeed', {
    		url:'/succeed',
    		views: {
    			top: {
    				templateUrl:viewR+'register/success.html'
    			}
    		}
    	})
    	
    	
         /* 完善信息
          * 和联系人电话*/
    	.state('information', {
    		url:'/information',
    		views: {
    			top: {
    				templateUrl:viewR+'register/information.html'
    			}
    		}
    	})
    	//个人信息
    	.state('personM',{
    		url:'/personM', 
    		views: {
    			top : {
    				templateUrl:viewR+'register/people.html'
    			}
    		}
    	})
    	
    	
    	/*忘记密码页面流程page1*/  	
    	.state('forgetPassWorld', {
    		url:'/forget',
    		views: {
    			top : {
    				templateUrl:viewF+'forgetPage1.html',
    				
    			}
    		}
    	})
    	
    	.state('forgetNext',{
    		url:'/page2',
    		views: {
    			top: {
    				templateUrl:viewF+'page2/forgetPage2.html',
    				
    			}
    		}
    	})
    	
    	
    	.state('forgetN',{
    		url:'/page3',
    		views: {
    			top: {
    				templateUrl:viewF+'page2/page3/forgetN.html',
    				
    			}
    		}
    	})
    	
    	 .state('forget2',{
    		url:'/page4',
    		views: {
    			top: {
    				templateUrl:viewF+'page2/page3/page4/forget4.html',
    				
    			}
    		}
    	})
    	
    	/*主页面内容部分*/
    	
    	 //成功进入主页main
    	.state('main', {
    		url:'/main',
    		views: {
    			top: {
    				templateUrl:'views/main.html'
    			}
    		}
    	})
    	

   
  $urlRouterProvider.otherwise('/login');
}])
   .directive('hello' ,function () {
   		return {
   			restrict:'ECMA',
   			transclude:true,  //指令内嵌入的内容不会被替换
   		
   			templateUrl:'views/logins/directivePage/loginDirective.html',
   						
   		}
   })
    .directive('forget' ,function () {
   		return {
   			restrict:'ECMA',
   			transclude:true,  //指令内嵌入的内容不会被替换
   		
   			templateUrl:'views/logins/directivePage/forgetD.html',
   						
   		}
   })
	 .directive('setFocus',[ function(){
         return {
             scope:false,
             link:function(scope, element){                     
                 scope.$watch("isFocus",function(newValue,oldValue, scope) {
                     //大圣来了，且要取芭蕉扇
                     if(newValue && scope.isCome){
                         element[0].focus(); //获取焦点
                         alert("猴哥，老牛不在家，我一介女子还不是你说什么我就照做，可你进入人家的身体也不打声招呼，进了就进了，还搞得我那么难受，求你别搞了，给，芭~~~蕉~~~扇！")
                     }
                }, true);;
             }
         };
    }])
			       
'use strict';
angular.module('app')
        .service('www',['$http',function($http){
        	
        	this.api=function() {
        		//公共接口
        		var api='http://59.110.164.152';
        	/*var api='http://10.130.31.56:8081';*/
        		return  api;
        	}
        	
        }])



'use strict';

angular.module('app')
	.service('https', ['$http','storageUser','$rootScope','$state','www', function ($http, storageUser, $rootScope,$state,www) {
		var http=www.api();
		
		this.forgetInIt=function(){
			var num=JSON.parse(sessionStorage.getItem('number'))
			if(num==null){
				$state.go('login');
			}
		}
		this.phoneNum=function() {
			var phone=JSON.parse(sessionStorage.getItem('number'));
			if(phone==null){
				return fale;
			}
		}
		
		
		this.tokenInit=function(){
			var token=JSON.parse(sessionStorage.getItem('tokens'));
			if(token==null){
				return false;
			}else{
				return true;
			}
		}
		this.token=function (){
			var token=JSON.parse(sessionStorage.getItem('tokens')).token;
			return token;
		}
		this.jump=function (url) {
			return	$state.go(url)
		}
       /*账号验证*/
		this.loginMessage=function (name) {
				var userName=new RegExp(/^[0-9a-zA-Z@.-_]{6,16}$/);
				if(!userName.test(name)){
					return false;
				}else{
					return true;
				};
	
			}	
		
		/*密码验证*/
		this.userPassworld=function (p) {
				var bb=new RegExp(/^(\w){8,16}$/);		
				if(!bb.test(p)){
					return false;
				}else {
					return true;
				}
		}
		
		
		/*图片验证码验证*/
		this.kaptcha=function(code) {
			var reg=new RegExp(/^[0-9a-zA-Z]{1,5}$/);
			if(!reg.test(code)){
				return false;
			}else{
				return true;
			};
		}
		
		this.phoneCode=function(code) {
			var reg=new RegExp(/^[0-9]{1,6}$/);
			if(!reg.test(code)){
				return false;
			}else{
				return true;
			};
		}
		
		/*公司全称验证方法*/
		this.companyFullName=function(company) {
			var companyName=new RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9\(\)]{2,32}$/);
			if(!companyName.test(company)){
				return false;
			}else{
				return true;
			}
		}
		/*公司简称*/
		this.companyS=function(company){
			var reg=new RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9\(\)]{2,20}$/);
			if(!reg.test(company)){
				return false;
			}else{
				return true;
			}
		}
		
		/*手机号验证*/
		this.phoneMessage=function(num) {
			var reg=new RegExp(/^1[34578]\d{9}$/);
			if(!reg.test(num)){
				return false;
			}else{
				return true;
			}
		}
		
		this.phoneCodeNumber=function(number) {
			var num=new RegExp(/^\d{1}$/);
			if(!num.test(number)) {
				return false;
			}else{
				return true;
			}
		}
			
		/*生成SET_UNIQUE_KEY*/
		this.setKey=function (){
			var XHR=null;  
			if (window.XMLHttpRequest) {  
			    // 非IE内核  
			    XHR = new XMLHttpRequest();  
			} else if (window.ActiveXObject) {  
			    // IE内核,这里早期IE的版本写法不同,具体可以查询下  
			    XHR = new ActiveXObject("Microsoft.XMLHTTP");  
			} else {  
			    XHR = null;  
			}  	  
			if(XHR){  
			    XHR.open("GET", http+"/hyb-entuser/ent_user/uniqueKey",false);  
			    XHR.onreadystatechange = function () {  
			        if (XHR.readyState == 4 && XHR.status == 200) {
			        	var k=JSON.parse(sessionStorage.getItem('key'));
			        	if(k==null){	
			        		var key=XHR.getResponseHeader('SET_UNIQUE_KEY'); 		      
			          		sessionStorage.setItem('key',JSON.stringify({'key':key}));
			          		var keyId=JSON.parse(sessionStorage.getItem('key')).key;
			        	}        
  
			        }  
			    };  
			    XHR.send();  
			}
		} 

	
	}])

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
	

'use strict';
angular.module('app')
	.service('storageUser',['$rootScope',function ($rootScope) { 
		var userKey='User'
		//用户信息的增删改查
		this.getStorage=function (name) {
			return localStorage.getItem(name);
		};
		this.setStorage=function (name, obj) {
			localStorage.setItem(name, obj)
		};
		this.removeStorage=function (name) {
			localStorage.removeItem(name)
		};
		
	}]);
'use strict';
angular.module('app')
.controller('forget',['$scope','https','$state','$interval','$post','$http','$rootScope','Md5',function($scope, $https,$state,$interval,$post,h,$rootScope,Md5){
	var keyId=JSON.parse(sessionStorage.getItem('key')).key;
	$scope.phoneCode={
		mobile:'',
		kaptcha:''
	};
	/*初始化带着keyId取回图片*/

	$post.getKaptcha(keyId).then(function(ele){
			var result=ele.data.data.img;
			$scope.imgSrc=result;
		});
	$scope.phoneNumClick=function (){
		$post.getKaptcha(keyId).then(function(ele){
			var result=ele.data.data.img;
			$scope.imgSrc=result;
		});
	};
	
	$scope.go=function(url) {
		//点击后验证  取出手机号   手机号 图片验证码合法性  后进行数据交互
		var num=$scope.phoneCode.mobile;
		var mobile=$https.phoneMessage($scope.phoneCode.mobile);
		var kaptcha=$https.kaptcha($scope.phoneCode.kaptcha);
		
		if(!mobile) {
			$scope.mobile='手机号输入错误';
			$scope.forgetM=true;	
		}
		if(!kaptcha){
			$scope.forgetK=true;
			$scope.kaptcha='验证码输入有误'
		};
		
		$scope.forgetMobile=function() {
			$scope.forgetM=false;
			$scope.mobile='';
		};
		$scope.forgetKaptcha=function() {
			$scope.forgetK=false;
			$scope.kaptcha=''
		}
		
		if(mobile &&  kaptcha) {
			/* 给后台传递的信息*/	
	        var keyId=JSON.parse(sessionStorage.getItem('key')).key;
			var resultKapt=($scope.phoneCode.kaptcha).toLowerCase();
	        sessionStorage.setItem('number',JSON.stringify({phone:num}));	
			var result={
				mobile:$scope.phoneCode.mobile,
				kaptcha:resultKapt
			};
			$post.postForgetNum(result,keyId)
				.then(function(data){	
					var phoneNum = data.data;
					if(phoneNum.code == '0' &&  phoneNum.data.success) {
							console.log(data);
							$state.go('forgetNext');
					}else if(phoneNum.code == '0' &&  phoneNum.data.success==false){
							$post.getKaptcha(keyId).then(function(ele){
								var result=ele.data.data.img;
								$scope.imgSrc=result;
							});	 	
						 	$scope.mobile=phoneNum.data.errors.mobile;
						 	$scope.kaptcha=phoneNum.data.errors.kaptcha;	 	
					}
					if(phoneNum.code=='400') {
						$scope.kaptcha=phoneNum.reason;
					}
							
				})
			}
		 }
}]);
'use strict';

angular.module('app')
	.controller('login',['$scope','https','$state','$interval','$post','$http','$rootScope','Md5','storageUser', function($scope, $https,$state,$interval,$post,h,$rootScope,Md5,storageUser) {
		/*
		 *============== 登陆页面验证=================
		 */
		$scope.user={loginName:'',
		  			 password:'',
		  			 imgCode:''	 
			};
		var user=storageUser.getStorage('userName');
		if(user!=null){
			var userName=JSON.parse(storageUser.getStorage('userName')).name;
			console.log(userName);
			$scope.user.loginName=userName;
		}
		$scope.f=false;
		if(JSON.parse(sessionStorage.getItem('number'))!=null){
			sessionStorage.removeItem('number');
		}
		var key=JSON.parse(sessionStorage.getItem('key'));
		if(key==null) {
			$https.setKey();
		}
		
			
		/*初始化与手动更换验证码*/
		$scope.imageClick=function () {	
			
			var keyId=JSON.parse(sessionStorage.getItem('key')).key;
			$post.getKaptcha(keyId).then(function(ele){
				var result=ele.data.data.img;
				$scope.imgSrc=result;
			});
		};		
		$scope.login_click=function (){ 		
			var name=$https.loginMessage($scope.user.loginName);
			var userPass=$https.userPassworld($scope.user.password);
			var kapt=$https.kaptcha($scope.user.imgCode);
		 	var  m=Md5.hex_md5($scope.user.password);
			$scope.LowerCase=($scope.user.imgCode).toLowerCase();			  
			var userMessage={
				loginName:$scope.user.loginName,
			    password:m,
			    imgCode:$scope.LowerCase
			};

			 if(userPass==true && name==true ) {
				var keyId=JSON.parse(sessionStorage.getItem('key')).key;
				$scope.loginUserName=true;		
				$post.postUserLogin(userMessage,keyId).then(function(data){
					var userM=data.data;
					if(userM.code=='0' && userM.data.success){
							var token=userM.data.token;
							storageUser.setStorage('userName',JSON.stringify({'name':$scope.user.loginName,}))
							sessionStorage.setItem('tokens',JSON.stringify({'token':token}));
							$state.go('main');
					}else if(userM.code=='0' && userM.data.success==false){
							$scope.m=userM.data.message;
							if(userM.data.message=='验证码错误'){
								$scope.userCode=true;
								$post.getKaptcha(keyId).then(function(ele){
									var result=ele.data.data.img;
									$scope.imgSrc=result;
								});
							}
					}else if(userM.code=='402'){
						  //需要图片验证码
							$post.getKaptcha(keyId).then(function(ele){
								var result=ele.data.data.img;
								$scope.imgSrc=result;
							});
							$scope.m=userM.reason;
							$scope.f=true;
							$scope.foot=true;
					}else if(userM.code=='400'){
						if(userM.reason=='验证码不能为空') {
							$scope.f=true;
								$post.getKaptcha(keyId).then(function(ele){
									var result=ele.data.data.img;
									$scope.imgSrc=result;
								});
							
						}
					}
				});
			}

			if(!name) {
				$scope.loginUserName=true;
				$scope.m=' *用户名／密码错误';
			}else {
				$scope.loginUserName=false;
			
			};
			
			if(!userPass) {
				$scope.loginUserPass=true;
				$scope.m='*用户名／密码错误';
			}else {
				$scope.loginUserPass=false;
			}
		}
		
		
		/* ==========输入框聚焦时候效果改变===========
		 * time:2017-3-28  12：37
		 * author:csw
		 * ===================================
		 */
		$scope.userNameF=function () {
			$scope.loginUserName=false;
		}
		
		$scope.passF=function(){
			$scope.loginUserPass=false;
		}
		$scope.code=function(){
			$scope.userCode=false;
		}
	}])


'use strict';
angular.module('app')

.controller('postCode',['$scope','https','$state','$interval','$post','$stateParams','$rootScope','Md5',function($scope, $https,$state,$interval,$post,$stateParams,$rootScope,Md5){
	
	$https.forgetInIt();
	if(JSON.parse(sessionStorage.getItem('number'))!=null){
		 var phoneNumber=JSON.parse(sessionStorage.getItem('number')).phone;
			$scope.number=phoneNumber;
	};
	
	var countdown=60; 
		$scope.ff=true;
		function settime() { 
			if (countdown == 0) {
				$scope.ff=false;
				countdown=60;
				$scope.postCode="(" + 60 + ") 重新发送"; 
				$interval.cancel(timer);
			} else { 
				$scope.ff=true;
				$scope.postCode="(" + countdown + ") 重新发送"; 
				countdown--; 
			}
		}
		if(countdown==60) {
			var timer=$interval(function() { 
			settime() 
			},1000) 
		} 
		
		/*发送手机验证码
		 *  给用户邮寄发短信 
		 */
		$scope.phoneCodes=function(){
			var keyId=JSON.parse(sessionStorage.getItem('key')).key;
			 var timer=$interval(function() { 
				settime() 
			},1000)  
			  var phoneNum={
			  		'mobile':phoneNumber
			  }
			$post.postNumCode(phoneNum,keyId).then(function(data){
				console.log(data);
			})
		}
		$scope.number1='';$scope.number2='';$scope.number3='';$scope.number4='';
		$scope.number5='';
		$scope.number6='';	
		$scope.up=function(){
			console.log(111111)
		};
		$scope.forgetNext=function(){	
			var keyId=JSON.parse(sessionStorage.getItem('key')).key;
		    var phoneNumber=JSON.parse(sessionStorage.getItem('number')).phone;
		    $scope.number=phoneNumber;
			var http=$https.phoneCodeNumber;
			var num1=http($scope.number1);
			var num2=http($scope.number2);
			var num3=http($scope.number3);
			var num4=http($scope.number4);
			var num5=http($scope.number5);
			var num6=http($scope.number6);
			if(num1 && num2 && num3 && num4 && num5 && num6) {
				var nums=[];
				nums.push($scope.number1);
				nums.push($scope.number2);
				nums.push($scope.number3);
				nums.push($scope.number4);
				nums.push($scope.number5);
				nums.push($scope.number6);
				var string=nums.join('');
				$rootScope.string=string;
				var mobileMess={
					mobile:phoneNumber,
					mess:string
				};
					
				/*手机号加短信验证码发送给后端*/
				$post.postForgetValid(mobileMess,keyId).then(function(data){
					console.log(data);
					var resultCode=data.data;
					if(resultCode.code=='0' &&  resultCode.data.success) {
						$state.go('forgetN');
					}else if(resultCode.code=='0' &&  !resultCode.data.success){
						/*短信验证码错误的时候*/
						$scope.mess=resultCode.data.errors.mess;
					}
				})		
			}			
		}
		
		
		//修改密码api
		var data='';
		$scope.passwd='';
		$scope.forgetClick=function() {	
			var keyId=JSON.parse(sessionStorage.getItem('key')).key;
		    var phoneNumber=JSON.parse(sessionStorage.getItem('number')).phone;
		    $scope.number=phoneNumber;
			var passF=$https.userPassworld($scope.passwd);
				if(!passF) {
					$scope.color=true;
					$scope.passError='密码格式输入有误';
				}else{		
					$scope.Md5=Md5.hex_md5($scope.passwd);
					var data={
						'mess':$rootScope.string,
						"passwd": $scope.Md5,
						'mobile':phoneNumber
					    }			
					/*发送用户新密码进行验证*/
					 
					$post.postChangePasswd(data,keyId).then(function(data){
						var result=data.data;
						console.log(result);
						if(result.code=='0' && result.data.success) {	
							$state.go('forget2')
						}
					})
			
				}			
			}	
			
			$scope.forget3=function () {
				$scope.color=false;
				$scope.passError='';
			}
			
	}])
'use strict';

angular.module('app')
		
.controller('register',['$scope','https','$state','$interval','$post','$http','$rootScope','Md5', function($scope, $https,$state,$interval,$post,h,$rootScope,Md5) {
		/*	
		 * ===========注册页面验证============ 
		 * data:2017-3-27
		 *	author:chen
		 * =============================
		 */
		$https.tokenInit();
		var keyId=JSON.parse(sessionStorage.getItem('key')).key;
		$scope.register={
						 user_name: '',
						 passwd: '',
						 kaptcha : ''
				}
		/*初始化带着keyId取回图片*/
		$post.getKaptcha(keyId).then(function(ele){
			var result=ele.data.data.img;
			$scope.imgSrc=result;
		});
		$scope.imageClick=function () {
				$post.getKaptcha(keyId).then(function(ele){
					var result=ele.data.data.img;
					$scope.imgSrc=result;
				});
		}
	
		$scope.successClick=function () {		
			var keyId=JSON.parse(sessionStorage.getItem('key')).key;
		
		/*
		 * =================注册验证==============================
		 *   time:2017-3-27 afternoon  author:csw 
		 * 1:账号验证 
		 * 2:密码验证 
		 * 3:图片验证码验证
		 * ====================================================
		 */
			var nameRe= $https.loginMessage($scope.register.user_name);
			var pass= $https.userPassworld($scope.register.passwd);
			var kaptcha= $https.kaptcha($scope.register.kaptcha);
		
			/*将密码转换成md5和字母v小写*/
			$scope.Md5=Md5.hex_md5($scope.register.passwd);
			$scope.LowerCase=($scope.register.kaptcha).toLowerCase();
			var data={
				user_name:$scope.register.user_name,
			    passwd:$scope.Md5,
				kaptcha:$scope.LowerCase
			};
			if(nameRe && pass && kaptcha){	
				$post.postMessage(data, keyId).then(function(data){	
					console.log(data);
					var dataUser=data.data;
					if(dataUser.code=='0' && dataUser.data.success ){
							//注册成功获取token 春初token 页面跳转
							var token=dataUser.data.token;
							sessionStorage.setItem('tokens',JSON.stringify({'token':token}));
							$state.go('succeed');
					}else{
						console.log(dataUser)
						var kaptcha=dataUser.data.errors.kaptcha;
							var user_name=dataUser.data.errors.user_name;
							var passwd=dataUser.data.errors.passwd;
								$scope.nameError=user_name;
								$scope.kaptchaError=kaptcha;	
								$post.getKaptcha(keyId).then(function(ele){
									var result=ele.data.data.img;
									$scope.imgSrc=result;
								});
						var description=dataUser.description;
						var reason=dataUser.reason;
						console.log(reason);
						
					}					
				})
	    	}		


			if(!nameRe){
				$scope.nameError='*账号输入错误';
				$scope.borderColor=true;
			}else{
				$scope.nameError='';
				$scope.borderColor=false;
			};
			
			
			if(!pass) {
				$scope.passE='*密码输入错误';
				$scope.passColor=true;
			}else{
				$scope.passE='';
				$scope.passColor=false;
			};
			
			if(!kaptcha) {
				$scope.kaptchaError='*验证码错误';
				$scope.kaptchaColor=true;
			}else{
				$scope.kaptchaError='';
				$scope.kaptchaColor=false;
			}	
		}
		$scope.registerFocus=function () {
			$scope.borderColor=false;
			$scope.nameError='';
		}
		
		$scope.registerPassFocus=function(){
			$scope.passE='';
			$scope.passColor=false;
		}
		
		$scope.registerKaptchaFocus=function () {
			$scope.kaptchaError='';
				$scope.kaptchaColor=false;
		}	
}])
'use strict';

angular.module('app')
.controller('companys',['$scope','https','$state','$interval','$post','$http','$rootScope','Md5', function($scope, $https,$state,$interval,$post,h,$rootScope,Md5){
		/*   ==============企业信息完善逻辑=====================
		 *   time:2017-3-27 afternoon  author:csw 
		 * 1:账号验证 
		 * 2:密码验证 
		 * 3:图片验证码验证
		 * ================================================
		 */
		if(!$https.tokenInit()){
			$state.go('login');
		};
		$scope.companys={
			token:'',
			full_name: '',
			short_name: '',
			industry_type: '',
			province: ''
			
		};
		
		$scope.companyClick=function () {
			var token=$https.token();
			console.log(token);
			var companyAll=$https.companyFullName($scope.companys.full_name);
			var company=$https.companyS($scope.companys.short_name);
			var industryType=$scope.companys.industry_type;
			var province=$scope.companys.province;
			
			if(companyAll && company && province!='') {
				//企业信息和 key    
				var compangMessage={
					token:token,
					full_name: $scope.companys.full_name,
					short_name: $scope.companys.short_name,
					industry_type: $scope.companys.industry_type,
					province: $scope.companys.province
				};
				var key=JSON.parse(sessionStorage.getItem('key')).key;
				$post.postCompangMessage(compangMessage,key).then(function(data){
					
					var result=data.data;
					console.log(result);
					if(result.code=='0' && result.data.success){
						$state.go('personM');
					}else{
						console.log(result);
						$scope.companysError=result.data.errors.full_name;
					}
					
				})
 				
			}
			
			//前端验证csw
			if(!companyAll) {
				$scope.companysError='*公司名称输入错误';
				$scope.companyAllColor=true;
			}else{
				$scope.companysError='';
				$scope.companyAllColor=false;
			}
			
			if(!company) {
				$scope.companyError='*公司简称输入错误';
				$scope.companyColor=true;
			}else{
				$scope.companyError='';
				$scope.companyColor=false;
			}
			if(industryType==''){
				$scope.IndustryColor=true;
				$scope.Industry='请选择行业';
			}
			
			if(province=='') {
				$scope.companyAddress=true;
				$scope.province='请选择公司所在城市';
			}
			
		}
		//事件改变样式
		$scope.companyAllFocus=function(){
			$scope.companysError='';
			$scope.companyAllColor=false;
		}
		
		$scope.companyFocus=function () {
			$scope.companyError='';
			$scope.companyColor=false;
		}
		$scope.industryF=function(){
			$scope.IndustryColor=false;
			$scope.Industry='';
		}
		
		$post.getJson().then(function(data){
		   //获取所在行业信息
			$scope.json=data.data;
		})
	 	//定义要聚焦的索引
        $scope.focusIndex=0;
        //更改要聚焦的tab
        $scope.focus=function(index){
            $scope.focusIndex=index;
       }
        
			       		/*      所在行业  
			       		 *   显示隐藏切换与选择行业
			       		 *	 
			       		 */
        /*    
         * 1.切换条件
         * 2.初始图片与切换
         * 3.换图片的条件 
         */
        $scope.toggleMessage=false;
		var ff=true;
		$scope.toggleM=false;
		var choseF=true;
		$scope.toggleS=function () {
			$scope.toggleM=false;
			$scope.toggleMessage=!$scope.toggleMessage;
			if(ff) {
				$scope.check=true;
				ff=false;
			}else{
				$scope.check=false;
				ff=true;
			}
		};
		
		
		
		$scope.chooseItem=function(ele,index){
			$scope.indexs=index;
			$scope.toggleMessage=false;
			$scope.check=false;
			$scope.companys.industry_type=ele;
		};
		 
		 /* 
		  * 公司所在地改变
		  */
		$scope.toggle=function () {
			$scope.province='';
			$scope.companyAddress=false;
			$scope.toggleMessage=false;
			$scope.toggleM=!$scope.toggleM;
			if(choseF) {
				$scope.checkF =true;
				choseF=false;
			}else{
				choseF=true;
				$scope.checkF =false;
			}
		};
		$scope.cityClick=function(city) {
			$scope.companys.province=city;
			$scope.toggleM=false;
			$scope.checkF =false;
		}
		
	}])
'use strict';

angular.module('app')

.controller('information',['$scope','https','$state','$interval','$post','$http','$rootScope','Md5', function($scope, $https,$state,$interval,$post,h,$rootScope,Md5){
	/*======================================================
		 *  联系人信息
		 * =====================================================
		 */
		
		if($https.tokenInit()){
			var token=$https.token();
		}else{
			$state.go('login');
		}
	
		$scope.contact={
			mobile: '' ,                      
	        linkman: '',                    
	        sms_code: '',                     
	        sex: '',                                  
	        token:token
		};
		$scope.radioSex=function(sex) {
			$scope.peopleError='';
			$scope.contact.sex=sex;
			if(sex=='1') {
				$scope.Mr=true;
				$scope.Mrs=false;
			}else {
				$scope.Mrs=true;
				$scope.Mr=false;
			}
		};
		$scope.messageClick=function () {
			console.log('-=======');
			console.log($scope.contact.sex);
			var nameM=$https.companyS($scope.contact.linkman);
			var phone=$https.phoneMessage($scope.contact.phone);
			var code=$https.phoneCode($scope.contact.sms_code);
			var sex=$scope.contact.sex;
			
			 var contact={
				mobile:$scope.contact.phone  ,                      
		        linkman:$scope.contact.linkman,                    
		        sms_code: $scope.contact.sms_code,                     
		        sex:sex,                                  
		        token:token
			};
			if( nameM && phone && code && sex!='' ){				
				$post.postAddPerson(contact).then(function(data){
					var result=data.data;
					if(result.code=='0' && result.data.success){
						$state.go('login');
					}else if(result.code=='0' && result.data.success==false){
						$scope.phoneNumberError=result.data.errors.mobile;
					}
					if(data.data.code=='400'){
						$scope.phoneCodeError=data.data.reason;
						
					}
				})
			}
			if(sex==''){
				$scope.peopleError='请选择性别';
			}
			
			if(!nameM){
				$scope.contactUserColor=true;
				$scope.peopleError='请输入联系人'
			}else{
				$scope.contactUserColor=false;
			}
			
			if(!phone) {
				$scope.phoneNumber=true;
				$scope.phoneNumberError='请输入正确的手机号码'
			}else{
				$scope.phoneNumber=false;
			}
			
			if(!code) {
				$scope.phoneCode=true;
				$scope.phoneCodeError='手机验证码错误'
			}else{
				$scope.phoneCode=false;
			}
		}
		/*================聚焦=======================*/
		$scope.userFocus=function(){
			$scope.contactUserColor=false;
			$scope.peopleError='';
		}
		$scope.phoneFocus=function(){
			$scope.phoneNumber=false;
			$scope.phoneNumberError='';
		}
		$scope.codeFocus=function(){
			$scope.phoneCode=false;
			$scope.phoneCodeError='';
		}
		
		
         /*==========发送验证码goo==============*/	
  
		$scope.f=false;
		$scope.time='发送验证码'
		$scope.phoneCodes=function () {
			var phone=$https.phoneMessage($scope.contact.phone);
			var phoneCode={
				mobile:$scope.contact.phone
			};
			console.log(phoneCode);
			if(!phone) {
				$scope.phoneNumber=true;
				$scope.phoneNumberError='手机号输入不合法';
			}else{		
				 $post.postPersonCode(phoneCode).then(function(code){
				 	console.log(phoneCode);
						var countdown=60; 
				    	 function settime() { 
								if (countdown == 0) {
									$scope.f=false;
									countdown=60;
									$scope.time="重新发送(" + 60 + ")"; 
									$interval.cancel(timer);
								} else { 
									$scope.time="重新发送(" + countdown + ")"; 
									countdown--; 
								}
							}
							$scope.f=true;
							if(countdown==60) {
								var timer=$interval(function() { 
								settime() 
								},1000) 
							}
						 })			 
				}	
			}
		
		
		$post.getJson().then(function(data){
			$scope.json=data.data;
		})

}])
