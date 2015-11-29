var myapp = angular.module('schoolModule', ["paymyServiceModule","ionic"]);
myapp.controller('schoolController',['$scope','paymyService','$state','$ionicPopup', function($scope,paymyService,$state,$ionicPopup) {
      
    $scope.save = function(){
        paymyService.saveSchoolStudent($scope.content).then(function(response){
              $state.go("app.schoolDashboard");
              
        },function(response){            
            $scope.showAlert("student registration failed");
        })
    }
    $scope.studentlist = [ {
      "id": 3,
      "firstname": "Senthilkumar1",
      "lastname": "Vaithiyanathan",
      "city": "Chennai",
      "verified": "N",
      "picture": "http://www.studentnoodles.co.uk/wp-content/uploads/2014/03/avatar.png"
    }];
    $scope.loadStudentsDetails = function(){
        paymyService.loadrecipients().then(function(response){
              
              
        },function(response){            
            $scope.showAlert("student listing failed");
        })
        
    }
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
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


myapp.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});