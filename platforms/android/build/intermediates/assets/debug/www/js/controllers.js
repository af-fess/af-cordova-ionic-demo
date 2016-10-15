app.controller('DashCtrl', function (
        $scope,
        $rootScope,
        $ionicModal,
        $log,
        $timeout,
        WifiService)
{

    $log.debug('start WifiMngrController');

     $scope.wifiList = [];
     
     $scope.wifiStates = [
        {
            value: 'disconnected',
            name: 'Not connected',
            image: 'img/mm/led_disconnected.png',
            ap_name: ''
        },
        {
            value: 'connected',
            name: 'Connected',
            image: 'img/mm/led_connected.png',
            ap_name: ''
        },
        {
            value: 'error',
            name: 'Error',
            image: 'img/mm/led_error.png',
            ap_name: ''
        },
        {
            value: 'inProgress',
            name: 'In progress',
            image: 'img/mm/led_inprogress.png',
            ap_name: 'unknown'
        }
    ];
    

    $scope.config = {
        isConnectedToAP: true,
        isWifiEnabled: true
    };
    $scope.SSID;
    $scope.ios_wifi_not_available = false;

    function run() {
        
        
         if($rootScope.isAndroidReady === true){
             isWifiEnabled();
         }
         else{ // iOS
             
             checkIosNetwork();
             
             loopOncheckIosNetwork();

         }        
    }
    
    function checkIosNetwork() {
        
              
        WifiService.getConnectedSSID(function ssidHandler(_data) {
            console.log('getConnectedSSID success: ' + JSON.stringify(_data));

            $scope.SSID = _data;
            
            $scope.ios_wifi_not_available = false;

            loopOncheckIosNetwork();

        }, function fail(_data) {
            console.error('getConnectedSSID fail: ' + _data);

            $scope.ios_wifi_not_available = true;
            
            loopOncheckIosNetwork();
        });
    }
    
    function loopOncheckIosNetwork() {
        
        console.log('loopOncheckIosNetwork');
        
        $timeout(function () {
            checkIosNetwork();
        }, 5000);
        
        
    }
    
    
    function isWifiEnabled() {
        WifiService.isWifiEnabled(
                function win(_data) {
            console.log('isWifiEnabled: ' + JSON.stringify(_data));
            

            if (_data === false) { // show button: enable wifi
                $scope.config.isWifiEnabled = false;
            } else {
                $scope.config.isWifiEnabled = true;

              
                WifiService.getConnectedSSID(function ssidHandler(_data) {
                    console.log('getConnectedSSID: ' + JSON.stringify(_data));
                    
//                    $scope.SSID = _data;
                    
                    $timeout(function () {
                        $scope.wifiList = WifiService.list();
                    }, 500);
                }, function fail(_data) {
                    console.error(_data);
                });

            }
        },
        function failure(_data) {
            console.error(_data);
        });
    }
  
     $scope.enableWifi = function(){
         WifiWizard.setWifiEnabled(true, function win(_data){
              console.log('isWifiEnabled: win: ' + JSON.stringify(_data));
              
              WifiService.startScan();
              
              $timeout(function () {
                 run();// run again
            }, 1000);
             
              
         }, function fail(_data){
              console.log('enableWifi: fail: ' + JSON.stringify(_data));
         });
     }
  

    
    $scope.current_wifi_state = $scope.wifiStates[3];


   


    $scope.getList = function () {
        $scope.wifiList = WifiService.list();
    }

    $scope.onAPClick = function (_wifi) {
        console.log('_wifi: ' + JSON.stringify(_wifi));
        
          $scope.selectedWifi = _wifi;

        $ionicModal.fromTemplateUrl('partials/aa_main_view/modals/confirm-wifi-password.html', function (modal) {
            $scope.modalConfirmSetWiFiPassword = modal;

            $scope.modalConfirmSetWiFiPasswordModal();
            
            $scope.password = {
                value: ''
            }

        }, {
            scope: $scope,
            animation: 'none',
            focusFirstInput: true
        });

        $scope.modalConfirmSetWiFiPasswordModal = function () {
            $scope.modal_confirm = true;
            $scope.modalConfirmSetWiFiPassword.show();
        };


        $scope.hideModalConfirmSetFavorite = function () {

            $scope.modalConfirmSetWiFiPassword.hide();
            $scope.modalConfirmSetWiFiPassword.remove();

        };

        $scope.applyeModalConfirmSetFavorite = function () {
            //TODO
            $scope.modalConfirmSetWiFiPassword.remove();

            alert('SSID: ' +  $scope.selectedWifi + ' and passwd: ' + $scope.password.value + ' will be stored in BOX');
        };
    }

    $scope.connectWifi = function (name) {
        WifiService.connectionToWifi(name);
    }

    $scope.$on("onWifiListReady", function (event, data) {

        console.log('onWifiListReady');
        //event.stopPropagation();


        $timeout(function () {
            $scope.getList();
        }, 0);


    });
    
    $scope.$on("ionicPlatformReady", function () {        
        run();
    });
    
  });

app.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  
  
});
