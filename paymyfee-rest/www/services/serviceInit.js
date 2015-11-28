           
    function init() {        
            //window.init();
    } 

    var app = angular.module('ServiceInitModule', [ ]);
    
    app.controller
        ('ServiceInitCtrl', 
            ['$scope','$rootScope','$window',
                function($scope,$rootScope, $window) {
                    $window.init= function() {     
                    	
                    }            
                }
            ]
        );
    
    