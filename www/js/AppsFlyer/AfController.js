'use strict';

app.controller('AppsFlyerCtrl', function (
        $scope,   
        //$timeout,
         AppsFlyerService)
{

    function run() {

        console.log('start AppsFlyerCtrl');

        var options = {
           devKey:  'WdpTVAcYwmxsaQ4WeTspmh'
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
        
        // $timeout(function () {
        //     run();
        // }, 8000);
        
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