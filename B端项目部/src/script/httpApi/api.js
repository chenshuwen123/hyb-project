'use strict';
angular.module('app')
        .service('www',['$http',function($http){
        	
        	this.api=function() {
        		//公共接口
        		var api='http://59.110.164.152';
        		return  api;
        	}
        	
        }])

