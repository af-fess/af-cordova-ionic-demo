'use strict';

app.controller('AppsFlyerCtrl', function (
        $scope,
        $rootScope,
        $ionicModal,
        $log,
        $timeout,
        AppsFlyerService)
{

    function run() {

        console.log('start AppsFlyerCtrl');

//        var appsFlyerOptions = [];
//        var devKey = 'd3Ac9qPnrpXYZxfWmCdpwL';//'WdpTVAcYwmxsaQ4WeTspmh';
//        appsFlyerOptions.push(devKey);
//
//
//        if (ionic.Platform.isIOS()) {
//
//            var appId = "1008237086";
//            appsFlyerOptions.push(appId);
//        }
//
//        console.log('appId != null ' + (appId !== null));
//
//        if (ionic.Platform.isAndroid() || (appId !== null)) {
//            console.log('Initialised appsFlyer');
//            window.plugins.appsFlyer.initSdk(appsFlyerOptions);
//        }

        var options = {
           devKey:  'WdpTVAcYwmxsaQ4WeTspmh'//'WdpTVAcYwmxsaQ4WeTspmh',
          // isDebug: false // (optional, default - true)
        };
        
        if (ionic.Platform.isIOS()) {
            options.appId = "1231267676";
        }

       
        if (ionic.Platform.isAndroid() || (options.appId !== null)) {
            console.log('Initialised appsFlyer');
            window.plugins.appsFlyer.initSdk(options, 
            function successCB(_response){
                console.log(_response);
            },
            function errorCB(_error){
                console.error(_error);
            }
            );
        }
        
        
        
        
    }

    $scope.$on("ionicPlatformReady", function () {
        run();
    });
    
    document.addEventListener('onInstallConversionDataLoaded', function(e){
            var attributionData = (JSON.stringify(e.detail));
            alert(attributionData);
        }, false);

    if (window.plugins.appsFlyer) {
        run();
    }

});