angular.module('loginModule', ["paymyServiceModule","ionic"])
.controller('loginController',['$scope','paymyService','$state','$ionicPopup', function($scope,paymyService,$state,$ionicPopup) {

    $scope.data = {
        'username':'',
        'password':'',
        'userType':2
    }
    $scope.login = function(){        
        paymyService.login($scope.data).then(function(response){
              $state.go("app.studentRegister");
              
        },function(response){            
            $scope.showAlert("Username/password combination is wrong");
        })
    };
    
    $scope.register = function(){              
        paymyService.register($scope.data).then(function(response){
           $state.go("app.studentRegister");
        },function(response){
            $scope.showAlert("Registration failed");
        })
    };
    // An alert dialog
    $scope.showAlert = function(data) {
       var alertPopup = $ionicPopup.alert({
         title: 'Info',
         template: data
       });
       alertPopup.then(function(res) {
         console.log('Thank you for not eating my delicious ice cream cone');
       });
       };
    
}]);