// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ServiceInitModule','NGOModule','loginModule','studentModule','schoolModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'pages/menu/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.NGORegister', {
    url: '/NGORegister',
    controller:'NGOController',
    views: {
      'menuContent': {
        templateUrl: 'pages/NGO/NGORegister.html',
        
      }      
    }
  })
   .state('app.NGODashboard', {
    url: '/NGODashboard',
    views: {
      'menuContent': {
        templateUrl: 'pages/NGO/NGODashboard.html'
      }
    }
  })
 
 
  .state('app.studentRegister', {
    url: '/studentRegister',
    controller:'studentController',
    views: {
      'menuContent': {
        templateUrl: 'pages/student/studentRegister.html'
      }
    }
  })
   .state('app.studentDashboard', {
    url: '/studentDashboard',
    views: {
      'menuContent': {
        templateUrl: 'pages/student/studentDashBoard.html'
      }
    }
  })
 
 .state('app.schoolRegister', {
    url: '/schoolRegister',
    controller:'schoolController',
    views: {
      'menuContent': {
        templateUrl: 'pages/school/schoolRegister.html'
      }
    }
  })
   .state('app.schoolDashboard', {
    url: '/schoolDashboard',
    views: {
      'menuContent': {
        templateUrl: 'pages/school/schoolDashBoard.html'
      }
    }
  })
 
 
  .state('app.login', {
    url: '/login',
    controller:'loginController',
    views: {
      'menuContent': {
        templateUrl: 'pages/login/login.html'
      }
    }
  })


   

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
