(()=>{var t={836:(t,e,r)=>{"use strict";var n,o;t.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(o=r.g.process)?void 0:o.env)?r.g.process:r(307)},307:t=>{!function(){var e={229:function(t){var e,r,n,o=t.exports={};function i(){throw Error("setTimeout has not been defined")}function c(){throw Error("clearTimeout has not been defined")}function u(t){if(e===setTimeout)return setTimeout(t,0);if((e===i||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(r){try{return e.call(null,t,0)}catch(r){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:i}catch(t){e=i}try{r="function"==typeof clearTimeout?clearTimeout:c}catch(t){r=c}}();var s=[],a=!1,l=-1;function f(){a&&n&&(a=!1,n.length?s=n.concat(s):l=-1,s.length&&h())}function h(){if(!a){var t=u(f);a=!0;for(var e=s.length;e;){for(n=s,s=[];++l<e;)n&&n[l].run();l=-1,e=s.length}n=null,a=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===c||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function v(){}o.nextTick=function(t){var e=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];s.push(new p(t,e)),1!==s.length||a||u(h)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(t){return[]},o.binding=function(t){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={exports:{}},c=!0;try{e[t](i,i.exports,n),c=!1}finally{c&&delete r[t]}return i.exports}n.ab="//";var o=n(229);t.exports=o}()}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}},c=!0;try{t[n](i,i.exports,r),c=!1}finally{c&&delete e[n]}return i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{"use strict";var t=r(836);self.fallback=async e=>{let{destination:r,url:n}=e,o={document:"/offline",image:"/static/images/fallback.png",audio:t.env.__PWA_FALLBACK_AUDIO__,video:t.env.__PWA_FALLBACK_VIDEO__,font:t.env.__PWA_FALLBACK_FONT__}[r];return o?caches.match(o,{ignoreSearch:!0}):""===r&&t.env.__PWA_FALLBACK_DATA__&&n.match(/\/_next\/data\/.+\/.+\.json$/i)?caches.match(t.env.__PWA_FALLBACK_DATA__,{ignoreSearch:!0}):Response.error()}})()})();