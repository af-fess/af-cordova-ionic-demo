// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app =angular.module('starter', ['ionic']);

app.run(function($ionicPlatform, $rootScope) {

    $rootScope.isAndroidReady = false;
    $rootScope.isIOSReady = false;

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

      if (ionic.Platform.isAndroid() ) { 
        $rootScope.isAndroidReady = true;
      }
      else if(ionic.Platform.isIOS() ){
         $rootScope.isIOSReady = true;
      }

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    $rootScope.$broadcast("ionicPlatformReady", {});    
    
    
    // $timeout(function(){

             if (window.plugins.appsFlyer !== undefined) {
            
            console.log('appsFlyer 1');
            
            var appsFlyerOptions = [];
            var devKey = 'WdpTVAcYwmxsaQ4WeTspmh';
            appsFlyerOptions.push(devKey);
            
            
            if (ionic.Platform.isIOS()){
                
                console.log('appsFlyer 2');
                
                var appId = "1008237086";
                appsFlyerOptions.push(appId);
            }
            
            console.log('appId != null ' + (appId !== null));

            if (ionic.Platform.isAndroid() || (appId !== null)){
                console.log('Initialised appsFlyer');
                window.plugins.appsFlyer.initSdk(appsFlyerOptions);
            }

        }
            //},5000); 
    
    
  });
});

