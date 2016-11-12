<img src="https://www.appsflyer.com/wp-content/themes/ohav-child/images/logo.svg"  width="200">

af-cordova-ionic-demo [![Build Status](https://travis-ci.org/af-fess/af-cordova-ionic-demo.svg?branch=master)](https://travis-ci.org/af-fess/af-cordova-ionic-demo)
===================
This is **Cordova+Ionic** project that demonstrates detailed usage of  [AppsFlyer plugin](https://github.com/AppsFlyerSDK/PhoneGap)  with some unitesting (Jasmine)

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


How to build
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

----------

Structure
===================

- 1st tab should display Wifi scan list (as dummy plugin)
- 2nd tab activates Appsflyer SDK with API methods (for now we have `initSDK`)

Genearally Appsflyer initiation should be started on application start but for demo and easy debug we put it in second tab (1st tab is active by default)


We also added several test cases for testing our API (so far only `initSDK`)

How to run tests:
---------
Actually if you still didn't test your cordova application its a good time to start. 

We use simple plugin [cordova-plugin-test-framework](https://github.com/apache/cordova-plugin-test-framework) that most cordova plugins use.

To run `tests.js` under `tests` folder you just need to change:

**For iOS:**
 Go to `config.xml` file under `Staging` folder, see an image:
<img src="https://s26.postimg.org/lfsfvqa2h/Screen_Shot_2016_10_20_at_11_47_30_AM.png"  width="800">

replace `<content src="index.html" />` with `<content src="cdvtests/index.html" />`
No worries, once you run from CLI `cordova build ios` your  `config.xml` will be rebuild. 



**For Android:**
Go to `res/xml/config.xml`, see image:
<img src="https://s26.postimg.org/jp9eu8sjd/Screen_Shot_2016_10_20_at_11_55_28_AM.png "  width="800">

replace `<content src="index.html"/>` with `<content src="cdvtests/index.html" />`




After running, and pressing on `Run` button in Jasmine UI you should get something like:

<img src="https://s12.postimg.org/jjfpbzwrh/Screen_Shot_2016_10_19_at_5_19_48_PM.png"  width="300">


In the future we will expand API usage and unitesting.
