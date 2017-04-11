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
							$scope.kaptchaColor=true;
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