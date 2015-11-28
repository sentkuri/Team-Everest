angular.module('loginModule', ["paymyServiceModule"])
.controller('loginController',['$scope','paymyService', function($scope,paymyService) {

    $scope.data = {
        'username':'',
        'password':'',
        'userType':2
    }
    $scope.login = function(){        
        paymyService.login($scope.data);
    };
    
    $scope.register = function(){      
        alert("reg");
        paymyService.register($scope.data);
    };
    
}]);