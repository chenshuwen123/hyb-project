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