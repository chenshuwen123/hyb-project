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

