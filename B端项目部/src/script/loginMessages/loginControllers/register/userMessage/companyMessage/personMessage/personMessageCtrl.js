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
