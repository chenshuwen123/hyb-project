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