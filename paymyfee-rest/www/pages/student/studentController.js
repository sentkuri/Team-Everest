var myapp = angular.module('studentModule', ["paymyServiceModule","ionic"]);
myapp.controller('studentController',['$scope','paymyService','$state','$ionicPopup', function($scope,paymyService,$state,$ionicPopup) {

    $scope.data = 
        {"firstname":"Senthilkumar","lastname":"Vaithiyanathan","email":"sendmailtosenthil@gmail.com","contactnumber":"8940059376","address_line1":"L&T Eden park","address_line2":"Siruseri","city":"Chennai","area":null,"state":"Tamilnadu","pincode":"603103","verified":"N","moneyrequired":25000,"singleparent":"Y","marks":90,"picture":"http://www.studentnoodles.co.uk/wp-content/uploads/2014/03/avatar.png"};    
        
    $scope.data = 
        {"firstname":"","lastname":"","email":"","contactnumber":"","address_line1":"","address_line2":"","city":"","area":null,"state":"","pincode":"","verified":"","moneyrequired":0,"singleparent":"","marks":90,"picture":""};        
    $scope.save = function(){
        paymyService.saveStudent($scope.data).then(function(response){
              $state.go("app.studentDashboard");
              
        },function(response){            
            $scope.showAlert("student registration failed");
        })
    }
    $scope.login = function(){        
        paymyService.login($scope.data).then(function(response){
              $state.go("app.studentRegister");
              
        },function(response){            
            $scope.showAlert("Username/password combination is wrong");
        })
    };
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
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