!function(e){var t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t){importScripts("/js/idb.js");let s="1",n=[];const i=["/","/index.html","/restaurant.html","/css/styles.css","/images/1-200_small.jpg","/images/2-200_small.jpg","/images/3-200_small.jpg","/images/4-200_small.jpg","/images/5-200_small.jpg","/images/6-200_small.jpg","/images/7-200_small.jpg","/images/8-200_small.jpg","/images/9-200_small.jpg","/images/10-200_small.jpg","/images/1-400_mid.jpg","/images/2-400_mid.jpg","/images/3-400_mid.jpg","/images/4-400_mid.jpg","/images/5-400_mid.jpg","/images/6-400_mid.jpg","/images/7-400_mid.jpg","/images/8-400_mid.jpg","/images/9-400_mid.jpg","/images/10-400_mid.jpg","/images/1-100pc_big.jpg","/images/2-100pc_big.jpg","/images/3-100pc_big.jpg","/images/4-100pc_big.jpg","/images/5-100pc_big.jpg","/images/6-100pc_big.jpg","/images/7-100pc_big.jpg","/images/8-100pc_big.jpg","/images/9-100pc_big.jpg","/images/10-100pc_big.jpg","/images/1-100pc_big.webp","/images/2-100pc_big.webp","/images/3-100pc_big.webp","/images/4-100pc_big.webp","/images/5-100pc_big.webp","/images/7-100pc_big.webp","/images/8-100pc_big.webp","/images/9-100pc_big.webp","/images/10-100pc_big.webp","/images/1-400_mid.webp","/images/3-400_mid.webp","/images/5-400_mid.webp","/images/7-400_mid.webp","/images/9-400_mid.webp","/images/10-400_mid.webp","/js/dbhelper.js","/js/main.js","/js/restaurant_info.js"];String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.substr(t,e.length)===e});let r=idb.open("restraurant_db",2,function(e){e.createObjectStore("reviews_store",{keyPath:"store_request"});reviewsStore.createIndex("store_request","store_request")});self.addEventListener("install",function(e){e.waitUntil(caches.keys().then(function(e){return Promise.all(n=e.filter(function(e){return e.startsWith("reviews-v")}))}).then(function(){console.log("install version_num:"+s)})),console.log("SW installing"),e.waitUntil(caches.open("reviews-v"+s).then(function(e){return e.addAll(i)}).then(function(){console.log("SW installed")}))}),self.addEventListener("fetch",function(e){console.log("Fetching"),e.waitUntil(caches.keys().then(function(e){return Promise.all(n=e.filter(function(e){return e.startsWith("reviews-v")}))}).then(function(){console.log("fetch version_num:"+s)})),e.request.json().then(t=>{r.then(function(s){var n=s.transaction("reviews_store","readwrite");return n.objectStore("reviews_store").put({store_request:e.request,store_response:t}),n.complete}).then(e=>{console.log("db success:",e)}).catch(e=>{console.log("db fail:",e)})}),e.respondWith(r.then(function(t){return t.transaction("reviews_get").objectStore("reviews_store").index("store_request").get(e.request)}).then(t=>{if(t)return t;caches.match(e.request).then(function(t){var n=fetch(e.request).then(function(t){if(!e.request.url.startsWith("https://maps.googleapis.com")&&!e.request.url.startsWith("https://maps.gstatic.com")){var n=t.clone();console.log("fetched from network.",e.request.url),caches.open("reviews-v"+s).then(function(t){t.put(e.request,n)}).then(function(){console.log("Response cached.",e.request.url)})}return t},i).catch(i);return console.log("fetched from",t?"cache":"network",e.request.url),t||n;function i(){return console.log("Fetch failed."),new Response("<h1>No Response</h1>",{status:404,statusText:"Resource Not Found",headers:new Headers({"Content-Type":"text/html"})})}})}))}),self.addEventListener("activate",function(e){console.log("Activating SW"),e.waitUntil(caches.keys().then(function(e){return Promise.all(n=e.filter(function(e){return e.startsWith("reviews-v")}))}).then(function(){console.log("activate version_num:"+s)})),e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return e.startsWith("reviews-v")&&!e.endsWith(s)}).map(function(e){return e.delete(e)}))}).then(function(){console.log("SW activated.")}))})}]);