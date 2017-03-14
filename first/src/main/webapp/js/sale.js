
      var countryApp = angular.module('countryApp', ['ngAnimate','ui.bootstrap','angularUtils.directives.dirPagination']);
  
      countryApp.controller('CountryCtrl',function ($scope, $http, $uibModal,$window,$rootScope){
        
          $scope.currentPage=1;
       
    	  $rootScope.$on("CallParentMethod", function(){
              $scope.getlist();
           });

    	  
    	  $scope.getlist=function(){
        	  
       	   $http.post("/first/mcSale/getCustomList.do").success(function(data) {
       	         
       	          console.log(data);
       	          $scope.customers = data.list;
       	          $scope.sortField="GRADE";
       	          $scope.reverse=false;
       	          });
       	      
          }
    	  
    	 
    	          
    	  
    	  $http.post("/first/mcSale/getCustomList.do").success(function(data) {
         
          console.log(data);
          $scope.customers = data.list;
          $scope.sortField="GRADE";
          $scope.reverse=false;
          });
          
          $scope.sort = function(keyname){
          $scope.sortField = keyname;   //set the sortKey to the param passed
          $scope.reverse = !$scope.reverse; //if true make it false and vice versa
         
          }
         
         
         
            
         //Modal Open 작업 
           $scope.animationsEnabled = true;

      
          
          $scope.openLog=function(customer,size){
            //console.log(customer);
                    var modalInstance = $uibModal.open({
                       animation: $scope.animationsEnabled,
                       templateUrl: 'modalSaleLog.html',
                       controller: 'modalSaleLogCtrl',
                       size: size,
                       resolve: {
                         items: function () {
                           return customer;
                         }
                       }
                     }); //End of ModalInstance

           }; //End of open
          

           $scope.open = function (customer,size) {

                     var modalInstance = $uibModal.open({
                       animation: $scope.animationsEnabled,
                       templateUrl: 'modalHospitalInfo.html',
                       controller: 'ModalInstanceCtrl',
                       size: size,
                       resolve: {
                         items: function () {
                           return customer;
                         }
                       }
                     }); //End of ModalInstance

           }; //End of open

          }); //End of Controller

         // Please note that $modalInstance represents a modal window (instance) dependency.
         // It is not the same as the $uibModal service used above.

         angular.module('countryApp').controller('ModalInstanceCtrl', function ($scope,$rootScope,$http,$window,$uibModalInstance,items) {
        	 
        	
        	 $scope.getList = function() {
                 $rootScope.$emit("CallParentMethod", {});
             }
        	 
        	 
           if(angular.isObject(items)){
            
            var myData= new Object();
             myData.CID = items.CID;
             myData.C_NAME = items.C_NAME;
             myData.C_LOCAL= items.C_LOCAL;
             myData.GRADE = items.GRADE;    
             myData.PEOPLE1 = items.PEOPLE1; 
             myData.PEOPLE2 = items.PEOPLE2;  
             myData.PEOPLE3= items.PEOPLE3;  
             myData.PEOPLE4= items.PEOPLE4; 
             myData.EMPOLYEE= items.EMPOLYEE;
             myData.AGRR_DATE= items.AGRR_DATE;
             myData.AGR_COST= items.AGR_COST;
             myData.CHECKUP_AMT= items.CHECKUP_AMT;
             myData.SA_WON= items.SA_WON;  
             myData.CONDITION= items.CONDITION;  
             myData.MEMO=items.MEMO;
             myData.Jobtype="Update";
             
             $scope.myData=myData;
         
          }else{

                var myData= new Object();
                     myData.CID = "";
                     myData.C_NAME =items; 
                     myData.C_LOCAL= "";
                     myData.GRADE = "";
                     myData.PEOPLE1 = "";
                     myData.PEOPLE2 = "";
                     myData.PEOPLE3= "";
                     myData.PEOPLE4="";
                     myData.EMPOLYEE=""; 
                     myData.AGRR_DATE=""; 
                     myData.AGR_COST="";
                     myData.CHECKUP_AMT="";
                     myData.SA_WON= "";
                     myData.MEMO= "";
                     myData.Jobtype="Save";
                     
                     $scope.myData=myData;
         
          };

           $scope.ok = function (item) {
             $uibModalInstance.close();
             
           };


           $scope.dataSave = function(myData) {
               //console.log("upDate:"+myData);
              console.log("$param:"+$.param(myData));
                if(myData.Jobtype=="Update"){
                 var request=$http({
                          method  : 'POST',
                          url     : '/mcSale/customerUpdate.bo',
                          data    : $.param(myData),  // pass in data as strings
                          headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                      });
                      request.success(function(data) {
                              console.log(data);
                              $uibModalInstance.close();
                              
                              //데이터만 갱신
                              $scope.getList();
                              
                      });
               
                }else{
                console.log("Data insert")
                var request=$http({
                         method  : 'POST',
                         url     : '/mcSale/customerInsert.bo',
                         data    : $.param(myData),  // pass in data as strings
                         headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
                     });
                     request.success(function(data) {
                             console.log(data);
                              $uibModalInstance.close();
                              $scope.getList();
                              //console.log("reload");
                     });
                }
               
              };
              

           $scope.delData = function(myData) {
                        console.log(myData);
                           var request=$http({
                                    method  : 'POST',
                                    url     : '/mcSale/customerDelete.bo',
                                    data    : $.param(myData),  // pass in data as strings
                                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                                });
                                request.success(function(data) {
                                        console.log(data);
                                        $uibModalInstance.close();
                                       
                                        $scope.getList();
                                       
                                });
                        };  
           $scope.cancel = function () {
             $uibModalInstance.dismiss('cancel');
           };

                              
            $scope.Reload=function(){
              $window.location.reload();
           };

         }); //End of modal controller
         


        //Second Modal Controller 
        angular.module('countryApp').controller('modalSaleLogCtrl', function ($scope,$rootScope,$http,$window,$uibModalInstance,items) {
          
        	
        	 $scope.getList = function() {
                 $rootScope.$emit("CallParentMethod", {});
             }
        	 
          $scope.c_name=items.C_NAME;
          //$scope.cid=items.CID;
          $scope.logData = new Object();
          $scope.logData.CID=items.CID;

          //console.log(items);

          $scope.getLogList=function(){
        	  
        	  var request=$http({
                  method  : "POST",
                  url     : "/mcSale/customerLogData.bo",
                  data    : $.param(items),  // pass in data as strings
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
              });
              request.success(function(data) {
                     
                      $scope.cuslogs = data;
              });
          }
          
          
           var request=$http({
                    method  : "POST",
                    url     : "/mcSale/customerLogData.bo",
                    data    : $.param(items),  // pass in data as strings
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                });
                request.success(function(data) {
                       
                	    console.log(data);
                        $scope.cuslogs = data;
                        
                        //$uibModalInstance.close();
                        //$scope.Reload();
                        //console.log("reload");
                        //$scope.getList();
                       
                  	  
                });


              $scope.logSave = function(data) {
                
            		//$('#logdata').val().replace(/\n/g, "<br>");
            		//text = text.replaceAll("<br>", "\r\n");
                    //textarae줄 바끔 처리
            	   data.LOG=data.LOG.replace(/\n/g, "<br>");
            	   //console.log(data.LOG);
                   
            	   var request=$http({
                             method  : 'POST',
                             url     : '/mcSale/customerLogSave.bo',
                             data    : $.param(data),  // pass in data as strings
                             headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                         });
                         request.success(function(data) {
                            
                        	
                        	 //jaquery 작업
                        	
                        	 var lastnum= $('#logtable tr:last-child td:first-child').text();
                        	 var date = new Date();
                        	   
                             var year  = date.getFullYear();
                             var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
                             var day   = date.getDate();
                        	 
                        	 var newnum= parseInt(lastnum)+1;
                        	  $('#logtable > tbody:last').append('<tr><td>'+newnum+'</td><td>'+ $scope.logData.LOG+'</td><td>'+month+'/'+day+'</td>');
                        	  $scope.logData.LOG="";
                        	 
                         });
                 };

           $scope.cancel = function () {
             $uibModalInstance.dismiss('cancel');
           };

            $scope.Reload=function(){
              $window.location.reload();
            
            $scope.fncBrlog=function(brlog){
            	
            	$scope.brlog=data;
            	consile.log($scope.brlog);
            }
            	
            	
           };

         });
         //End of Second Modal

 //보안 때문에 태그 안에 html삽입을 원천거으로 봉쇄 하고 있는 것 같음         
angular.module('countryApp').filter('to_trusted', ['$sce', function($sce){
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }]);
    