    var paymyServiceModule = angular.module('paymyServiceModule', [])
    paymyServiceModule.service('paymyService', function ($q, $location, $window,$http) {    
        this.serverURLPrefix="http://192.168.116.255:3000/v1/";
        $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
         $http.defaults.headers.post['dataType'] = 'json';
        this.loadrecipients = function(){
                var deferred = $q.defer();   
                    var url= this.serverURLPrefix+"recipients";
                    $http({
                        method: 'GET',
                        url: url
                        }).then(function successCallback(response) {
                            console.log(response);
                            alert(response);
                            deferred.resolve(respone);
                        }, function errorCallback(response) {
                            console.log(response);
                            deferred.reject(respone);
                        });
                return deferred.promise;    
        };
        
        
        this.login = function(data){
              var deferred = $q.defer(); 
                    var url= this.serverURLPrefix+"register";              
                    $http({
                        method: 'POST',
                        data: data,
                        url: url,
                        headers: { "Content-Type": "application/json" }
                        }).then(function successCallback(response) {
                            console.log(response);
                            alert(response);
                            deferred.resolve(respone);
                        }, function errorCallback(response) {
                            console.log(response);
                            deferred.reject(respone);
                        });
                return deferred.promise;  
        }
        this.register = function(data){
            var deferred = $q.defer(); 
                    var url= this.serverURLPrefix+"register";              
                    $http({
                        method: 'POST',
                        data:  JSON.stringify(data),
                        dataType: 'json', 
                        crossDomain:true,
                        url: url
                        }).then(function successCallback(response) {
                            console.log(response);
                            alert(response);
                            deferred.resolve(respone);
                        }, function errorCallback(response) {
                            console.log(response);
                            deferred.reject(respone);
                        });
                return deferred.promise;  
        }
    });