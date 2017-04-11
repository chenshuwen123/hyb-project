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