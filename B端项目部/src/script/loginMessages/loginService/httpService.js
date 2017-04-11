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
