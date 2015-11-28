angular.module('NGOModule', ["paymyServiceModule"])
.controller('NGOController',['$scope','paymyService', function($scope,paymyService) {

    $scope.fetchData = function(){
        alert("siva");
        paymyService.loadrecipients();
    };
    
}]);