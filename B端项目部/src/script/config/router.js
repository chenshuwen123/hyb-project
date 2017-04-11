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
			       