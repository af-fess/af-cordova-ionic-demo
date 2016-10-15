'use strict';

app.controller('AppsFlyerCtrl', function (
        $scope,
        $rootScope,
        $ionicModal,
        $log,
        $timeout,
        WifiService)
{

    console.log('start AppsFlyerCtrl');
     
     
     function run(){
          if (window.plugins.appsFlyer !== undefined) {
            
            
            
            var appsFlyerOptions = [];
            var devKey = 'WdpTVAcYwmxsaQ4WeTspmh';
            appsFlyerOptions.push(devKey);
            
            
            if (ionic.Platform.isIOS()){
                
                var appId = "1008237086";
                appsFlyerOptions.push(appId);
            }
            
            console.log('appId != null ' + (appId !== null));

            if (ionic.Platform.isAndroid() || (appId !== null)){
                console.log('Initialised appsFlyer');
                window.plugins.appsFlyer.initSdk(appsFlyerOptions);
            }

        }
     }
         
    $scope.$on("ionicPlatformReady", function () {        
        run();
    });
    
  });