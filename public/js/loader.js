function Loader(){this.images=[],this.alternates=[],this.general=["./images/sections/myself.jpg","./images/sections/lights.jpg","./images/sections/branding.jpg"],this.manifesto=["./images/hero/header.jpg"],this.lights=["./images/sections/lights.jpg","./images/resources/gradient.png","./images/details/branding/first.jpg","./images/details/branding/second.jpg","./images/details/branding/third.jpg","./images/details/branding/fourth.jpg","./images/details/branding/parallax/first.png","./images/details/branding/process/first.jpg","./images/details/branding/process/second.jpg","./images/details/branding/attempt/first.jpg","./images/details/branding/attempt/second.jpg"],this.branding=["./images/sections/branding.jpg","./images/resources/gradient.png","./images/details/lights/first.jpg","./images/details/lights/second.jpg","./images/details/lights/third.jpg","./images/details/lights/fourth.jpg","./images/details/lights/fifth.jpg","./images/details/lights/parallax/first.png","./images/details/lights/parallax/second.png","./images/details/lights/process/first.jpg","./images/details/lights/process/second.jpg","./images/details/lights/attempt/first.jpg","./images/details/lights/attempt/second.jpg","./images/details/lights/attempt/third.jpg"],this.loaded=[],this.alternatesLoaded=[],this.amount=0,this.alternatesAmount=0,this.actualPercentage=0,this.sides="right 0.15s linear, left 0.3s ease",this.opacity="opacity 0.3s ease",this.transformation="transform 0.3s ease",this.preload=function(t){function s(){function t(){setTimeout(function(){o.innerHTML=e+"%",e+=1,e<=s&&t()})}r.amount=r.amount+1;var s=100*r.amount/r.images.length;n.style.right=100-s+"%";var e=Math.floor(r.actualPercentage);r.actualPercentage=Math.floor(s),t(),r.amount===r.images.length&&(storageSupported()&&(window.sessionStorage.loaded=!0),setTimeout(function(){i()},350))}function i(s){s=void 0===s||s;(new Date).getTime();s&&(a.style.opacity=0,n.style.left="100%",g.style.transform="translate(-50%, 500%)",o.style.transform="translateX(200px)"),setTimeout(function(){a.style.display="none",setTimeout(function(){t()},0)},s?200:0)}function e(){setTimeout(function(){var t=new Image;t.src=r.images[l],t.addEventListener("load",function(){s()}),t.addEventListener("error",function(){s()}),r.loaded[l]=t,l+=1,l<r.images.length&&e()},0)}if("/"==window.location.pathname||"/index"==window.location.pathname)this.images=this.general,this.alternates=this.manifesto.concat(this.lights,this.branding);else if("/manifesto"==window.location.pathname)this.images=this.manifesto,this.alternates=this.general.concat(this.lights,this.branding);else if("/lights"==window.location.pathname)this.images=this.lights,this.alternates=this.general.concat(this.manifesto,this.branding);else{if("/branding"!=window.location.pathname)return;this.images=this.branding,this.alternates=this.general.concat(this.manifesto,this.lights)}var a=((new Date).getTime(),document.id("loader")),n=document.class("bar"),g=document.class("link-wrapper"),o=document.class("percentage"),r=this;if(a.style.transition=this.opacity,n.style.transition=this.sides,g.style.transition=this.transformation,o.style.transition=this.transformation,storageSupported()&&void 0!=sessionStorage.loaded)return void i(!1);g.style.transform="translate(-50%, 0%)",o.style.transform="translateX(0px)",o.innerHTML="0%";var l=0;setTimeout(function(){e()},250)}}