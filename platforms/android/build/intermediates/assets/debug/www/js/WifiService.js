'use strict';

app.factory('WifiService', function ($rootScope) {
    
    var unique_array = angular.fromJson('[]');

    function win_wifi(e) {
       // alert("Success");
    }

    function fail_wifi(e) {
        //alert("Error");
    }

    function isWifiEnabled(win, fail){
        WifiWizard.isWifiEnabled(win, fail);
    }

    

    function connectWifi(wifi_ssid) {
        WifiWizard.connectNetwork(wifi_ssid, win_wifi, fail_wifi);
    }

    function listHandler(a) {

        var network_array = [];
        for (var i = 0; i < a.length; i++) {
            network_array.push(a[i].SSID);
        }

        unique_array = network_array.filter(function (elem, pos) {
            return network_array.indexOf(elem) == pos;
        });

        // alert("Wifi List Ready!");
         
        $rootScope.$broadcast("onWifiListReady", {});
    }

    function getScanResult() {
        WifiWizard.getScanResults(listHandler, failNetwork);
    }
    
    function getConnectedSSID(ssidHandler, fail) {
        WifiWizard.getCurrentSSID(ssidHandler, fail);
    }

    function successNetwork(e) {
        window.setTimeout(function () {
            getScanResult();
        }, 3000);
    }

    function failNetwork(e) {
        console.error("Network Failure: " + e);
    }

    window.setTimeout(function () {
        WifiWizard.startScan(successNetwork, failNetwork);
    }, 1000);

    return {
        startScan: function(){
          WifiWizard.startScan(successNetwork, failNetwork);
        },
        list: function () {
            return unique_array;
        },
        connectionToWifi: function (name) {
            connectWifi(name);
        },
        getConnectedSSID: function(ssidHandler, fail){
             getConnectedSSID(ssidHandler, fail);
        },
        isWifiEnabled: function(win, fail){
             isWifiEnabled(win, fail);
        }
    };
});