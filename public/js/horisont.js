function prepareDocument(){HTMLDocument.prototype.id=function(t){return this.getElementById(t)},HTMLDocument.prototype.classes=function(t){return convert(this.getElementsByClassName(t))},HTMLDocument.prototype.class=function(t){return this.classes(t)[0]},HTMLDocument.prototype.tags=function(t){return convert(this.getElementsByTagName(t))},HTMLDocument.prototype.tag=function(t){return this.tags(t)[0]},HTMLElement.prototype.tags=function(t){return convert(this.getElementsByTagName(t))},HTMLElement.prototype.tag=function(t){return this.tags(t)[0]}}function abs(t){return Math.abs(t)}function setupAnalytics(){!function(t,e,n,o,r,i,a){t.GoogleAnalyticsObject=r,t[r]=t[r]||function(){(t[r].q=t[r].q||[]).push(arguments)},t[r].l=1*new Date,i=e.createElement(n),a=e.getElementsByTagName(n)[0],i.async=1,i.src=o,a.parentNode.insertBefore(i,a)}(window,document,"script","./js/analytics.js","ga"),ga("create","UA-83429673-1","auto"),ga("send","pageview")}function encryptCorreu(t){for(var e=document.classes(t),n=0;n<e.length;n++){var o=e[n];o.addEventListener("click",function(){var t=decode("znvygb:enzba@tvynoreg.qrfvta"),e=decode("Lb! :)"),n=t+"?subject="+e;window.location.href=n})}}function decode(t){return t.replace(/[a-zA-Z]/g,function(t){return String.fromCharCode((t<="Z"?90:122)>=(t=t.charCodeAt(0)+13)?t:t-26)})}function exists(t){return!(document.tags("body").length<=0)&&document.tag("body").id===t}function convert(t){return[].map.call(t,function(t){return t})}function slice(t,e){var n,o,r=[];for(n=0,o=t.length;n<o;n+=e)r.push(t.slice(n,n+e));return r}function toggle(t,e,n){n?t.classList.remove(e):t.classList.add(e)}function getTransform(t){var e=getComputedStyle(t),n=e.transform||e.webkitTransform,o=n.match(/^matrix3d\((.+)\)$/);return o?parseFloat(o[1].split(", ")[13]):(o=n.match(/^matrix\((.+)\)$/),o?parseFloat(o[1].split(", ")[5]):0)}function iterate(t,e,n,o){function r(){setTimeout(function(){n(t[i]),i+=1,i<t.length&&r()},150+5*i)}o&&t.reverse();var i=0;setTimeout(function(){r()},e)}function positionOffset(t){var e=t.clientHeight,n=0;do isNaN(t.offsetTop)||(n+=t.offsetTop);while(t=t.offsetParent);return n-.2*window.innerHeight-e}function isDetail(){return document.body.classList.contains("detail")}function storageSupported(){var t="storage",e=window.sessionStorage;try{return e.setItem(t,"true"),e.removeItem(t),!0}catch(t){return!1}}var empty=function(){};window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};