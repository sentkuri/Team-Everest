    var collageServiceModule = angular.module('collageServiceModule', [])
    collageServiceModule.service('collageService', function ($q, $location, $window) { 
    	
        //var ROOT = $location.protocol()+'://'+$window.location.host+'/_ah/api';  
        var ROOT = $location.protocol()+'://192.168.3.34:9081/_ah/api';
        
        this.init=function () {   
                            var deferred = $q.defer();                                  
                            gapi.client.load('eventAPI','v1',function() {deferred.resolve();},ROOT);                            
                            gapi.client.load('userRegistration','v1',function() {deferred.resolve();},ROOT);
                            return deferred.promise;
                        };                
        this.listEvents = function () {          			
                    var deferred = $q.defer();            
                    gapi.client.eventAPI.listEvents(                    		
                    	).execute(                    
                        function(respone){
                            console.log(respone);
                            deferred.resolve(JSON.parse(respone.response));
                        }
                );
                return deferred.promise;
        }; 
		
        this.deleteEvents = function (id) {
        	rec=new eventBMO();
			rec.id=id;
            var deferred = $q.defer();            
            gapi.client.eventAPI.deleteEvent(rec
            	).execute(                    
                function(respone){
                    console.log(respone);
                    deferred.resolve(respone.response);
                	}
            	);
            return deferred.promise;
        }; 
		
        this.getEvents = function (id) {
        	rec=new eventBMO();
			rec.id=id;
            var deferred = $q.defer();            
            gapi.client.eventAPI.getEvents(
            		rec
            	).execute(                    
                function(respone){
                    console.log(respone);
                    deferred.resolve(JSON.parse(respone.response));
                	}
            	);
            return deferred.promise;
        };
        
        
        this.updateEvents = function (rec) {     
            var deferred = $q.defer();            
            gapi.client.eventAPI.updateEvents(rec).execute(                    
                function(respone){
                    console.log(respone);
                    deferred.resolve(JSON.parse(respone.response));
                	}
            	);
            return deferred.promise;
        };
        
		});