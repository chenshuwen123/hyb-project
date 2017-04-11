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