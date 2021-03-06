---
[![npm version](https://badge.fury.io/js/malta-mocha.svg)](http://badge.fury.io/js/malta-mocha)
[![npm downloads](https://img.shields.io/npm/dt/malta-mocha.svg)](https://npmjs.org/package/malta-mocha)
[![npm downloads](https://img.shields.io/npm/dm/malta-mocha.svg)](https://npmjs.org/package/malta-mocha)  
---  

This plugin can be used on: **.js** files and even on **.coffee** and **.ts** files after using the right plugin  

The plugin will run mocha on the testfolder found in the execution path.  



Sample usage:  
```
malta app/script/main.js public/js -plugins=malta-mocha
```
or in the .json file :  
```
"app/script/main.js" : "public/js -plugins=malta-mocha"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/script/main.js',
    'public/js',
    '-plugins=malta-mocha'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```