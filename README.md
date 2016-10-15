Environment
===================
 `Cordova 6.3.1`
 

platforms
---------
- `Android platform 5.2.2`   
 - Android Studio `2.2` 
    -- Gradle ver. - `3.1`
    --Android Plugin ver. `2.2.0`
- `iOS platform 4.1.1` 
   -  Xcode `8`


Build
---------

 1. install globally ionic and cordova:
`npm install -g cordova ionic`    (may require sudo)
2. install dependances (for ionic):
    `npm install`
 3. `cd to af-cordova-ionic-demo`
 4. add android to platforms list:
 `ionic platform add android`
 5. add ios to platforms list (might drop error that ios is already installed):
 `ionic platform add ios`
 6. build Android and iOS:
`ionic build ios`
`ionic build android`
or both:
`ionic build`
7. check plugin status:
`cordova plugin list`

**Android**
Now you can open project in Visual Studio (target it to `af-cordova-ionic-demo/platforms/android`) 

**iOS**
Open project `af-cordova-ionic-demo/platforms/ios/af-cordova-ionic-demo.xcodeproj` in Xcode

API Methods
===================
#### `initSdk(options, onSuccess?, onError?): void`
Establishes connection with the remote host.

| parameter   | type                        | description |
| ----------- |-----------------------------|--------------|
| `options`   | `List`                      | |


**Example**

```javascript

    if (window.plugins.appsFlyer !== undefined) {               
	    var options = [];
	    var devKey = 'xxxxxxxxxxxxx';
	     options.push(devKey);
	               
	    if (ionic.Platform.isIOS()){ 
	       var appId = "123456789";
	       options.push(appId);
	       }
	          
	       if (ionic.Platform.isAndroid() || (appId !== null)){
	          window.plugins.appsFlyer.initSdk(options);
	       }
     }
   ```




