window.addEventListener("load",function(){function e(r){window.setTimeout(function(){i.src=n,window.setTimeout(function(){i.src=t,e(!1)},9e3)},r?(new Date).getTime()-o>2e3?0:2e3:1e3)}prepareDocument(),setupAnalytics(),encryptCorreu("email");var n="./images/errors/404.gif",t="./images/errors/404-frame.jpg",i=document.body.tag("img"),o=(new Date).getTime(),r=new Image;r.src=n,r.addEventListener("load",function(){e(!0)})});