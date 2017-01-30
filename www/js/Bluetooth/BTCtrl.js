'use strict';

app.controller('BTCtrl', function ($scope,$timeout)
{
console.log('BTCtrl ...');


   $scope.theModel = {
       isEnabled: false,
       status: "not connected",
       isConnected: false,
       bluetoothList: [],
       bluetoothUnpairedList: [],
       message: "ssid=\"shustik\";password=\"manishtana\""
   };

    function run(){
        console.log('BTCtrl :: BTCtrl is started');
        
        
        $scope.isEnabled();
        
         $timeout(function(){
           $scope.isConnected(function(){
            $scope.getList();
        });
        },1000);
        
        
        
        
    }
    
    function setStatus(_status){
        
         $timeout(function(){
            $scope.theModel.status = _status;
        },1);
    }
  
  $scope.getList = function(){
      bluetoothSerial.list(function(_list) {
        console.log("BTCtrl :: Bluetooth list: " + JSON.stringify(_list));
        
      $timeout(function(){
           $scope.theModel.bluetoothList = _list;
        },1); 
        
         
    },
    function() {
        console.log("BTCtrl :: Bluetooth list failed");
    });
  };
  
    $scope.discoverUnpaired = function () {
        bluetoothSerial.discoverUnpaired(function (_devices) {
            console.log("BTCtrl :: Bluetooth list: " + JSON.stringify(_devices));

            $timeout(function () {
                $scope.theModel.bluetoothUnpairedList = _devices;
            }, 1);
        }, function () {
            console.log("BTCtrl :: Bluetooth list failed");
        });
        
        
        bluetoothSerial.setDeviceDiscoveredListener(function(device) {
            console.log('Found: '+device.id);
        });
        
    }
 
  function onDisconnect(){
     
        console.log("BTCtrl :: Bluetooth is *not* connected");
         $timeout(function(){
             setStatus("Disconnected");
           $scope.theModel.isConnected = false;
        },1); 
  }
    
  $scope.disconnect = function(){
      setStatus("Disconnecting...");
      bluetoothSerial.disconnect(onDisconnect);
  }
  
  $scope.onBluetoothClick = function(_bluetooth){
      
      bluetoothSerial.connect(_bluetooth.id,  function() {
        console.log("BTCtrl :: Bluetooth is connected");
        
        setStatus("Connected.");
        
         $timeout(function(){
           $scope.theModel.isConnected = true;
        },1); 
         
    },
    onDisconnect
      );
      
  }
  
  
  $scope.isConnected = function(_onIsConnected){
       bluetoothSerial.isConnected(
    function() {
        console.log("BTCtrl :: Bluetooth is connected");
         $timeout(function(){
           $scope.theModel.isConnected = true;
           
           if(_onIsConnected){
               _onIsConnected();
           }
           
        },1); 
         
    },
    function() {
        console.log("BTCtrl :: Bluetooth is *not* connected");
         $timeout(function(){
           $scope.theModel.isConnected = false;
           
           if(_onIsConnected){
               _onIsConnected();
           }
        },1); 
         
    }
);
  }
  
  
  $scope.isEnabled = function(){
      bluetoothSerial.isEnabled(
            function() {
                
                $scope.theModel.isEnabled = true;
                
                console.log("BTCtrl :: Bluetooth is enabled");
            },
            function() {
                $scope.theModel.isEnabled = false;
                console.log("BTCtrl :: Bluetooth is *not* enabled");
            }
        );
  }
  
    $scope.write = function () {

        if (event.charCode === 13) {
            bluetoothSerial.write($scope.theModel.message,
                    function onSuccess() {
                        console.log("BTCtrl :: Bluetooth write success");

                        $timeout(function () {
                            $scope.theModel.onMessage = "Bluetooth write success";
                        }, 1);



                    }, function onFailure() {
                console.log("BTCtrl :: Bluetooth write failed");
            });
        }


    }
    
      $scope.$on("ionicPlatformReady", function () {        
        run();
    });
    
  });
  
 