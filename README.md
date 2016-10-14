

af-cordova-ionic-demo
===================
This is Cordova+Ionic project that demonstrates detailed usage of  [AppsFlyer plugin](https://github.com/AppsFlyerSDK/PhoneGap) 




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



API Methods
===================
#### `initSdk(options, onSuccess?, onError?): void`
Establishes connection with the remote host.

| parameter   | type                        | description |
| ----------- |-----------------------------|--------------|
| `options`   | `List`                      | |
| `onSuccess` | `() => void`                | Success callback - not supported (optional)|
| `onError`   | `(message: string) => void` | Error callback - not supported  (optional)|

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



