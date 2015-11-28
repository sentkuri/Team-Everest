           
    function init() {        
            window.init();
    } 

    var app = angular.module('ServiceInitModule', [ "collageServiceModule"]);
    
    app.controller
        ('ServiceInitCtrl', 
            ['$scope','$rootScope','$window',"collageService",
                function($scope,$rootScope, $window, collageService) {
                    $window.init= function() {     
                    	$rootScope.collageService_init=false;
                    	collageService.init().then(function(){
                            console.log("collageService Service Initialized");
                            $rootScope.collageService_init=true;
                            $rootScope.$broadcast('collageService', 'success');
                            
                        });
                    }            
                }
            ]
        );
    
    