function Appearance(){this.method=empty,this.run=function(){exists("myself")?(this.method=this.myself,this.method(!0)):exists("manifesto")?(this.method=this.manifesto,this.method(!0)):isDetail()&&(this.method=this.detail,this.method(!0))},this.myself=function(t,e){e=e||empty;var i=document.id("sections"),s=document.id("details"),o=document.tag("nav"),n=document.tag("header"),a=document.classes("title"),l=document.classes("more"),r=i.tags("p"),c=i.tags("figure"),d=abs(getTransform(i))/window.innerHeight,m=t?1:0,g=parseInt(d)%2===0,u=t?"0px":g?"-75px":"75px",f=t?700:0,h=c[d],y=a[d],p=r[d],x=l[d];c.splice(c.indexOf(h),1),a.splice(a.indexOf(y),1),r.splice(r.indexOf(p),1),l.splice(l.indexOf(x),1);for(var v=0;v<a.length;v++)for(var T=[a[v],r[v],l[v],c[v]],O=0;O<T.length;O++){var Y=T[O];Y.style.transition="",Y.style.opacity=m,c.includes(Y)||(Y.style.left=u)}iterate([y,p,x],0,function(t){t.style.transition="left 0.6s ease, opacity 0.6s ease",t.style.left=u,t.style.opacity=m},!t),setTimeout(function(){for(var t="opacity 0.8s ease",e=[n,o,s,h],i=0;i<e.length;i++){var a=e[i];a.style.transition=t,a.style.opacity=m}},f),setTimeout(function(){e()},1300)},this.manifesto=function(t,e){e=e||empty;var i=document.id("hero-image").tag("img"),s=document.id("header"),o=document.id("header-glitches"),n=document.classes("explanation"),a=document.classes("description-line"),l=document.tag("footer"),r=t?0:400,c=t?700:0,d=t?200:0;setTimeout(function(){toggle(i,"loading-hero-image",t)},r),setTimeout(function(){toggle(s,"loading-header",t),toggle(o,"loading-header",t),l.style.transition=t?"":"opacity 0.8s ease",toggle(l,"loading-header",t)},c),iterate(n,0,function(e){e.style.transition=t?"":"opacity 0.8s ease, transform 0.8s ease",e.style.opacity=t?1:0,e.style.transform=t?"translateY(0%)":"translateY(-20%)"}),iterate(a,d,function(e){toggle(e,"loading-hero-line",t)},!t),setTimeout(function(){e()},1200)},this.detail=function(t,e){e=e||empty;var i=document.id("header"),s=document.class("bottom-corner-glitch"),o=document.class("hero-title"),n=document.class("hero").tag("figure"),o=document.class("hero-title"),a=document.class("headers-wrapper").tags("p"),l=document.class("images").tags("img"),r=document.tag("footer"),c=[i,s,n],d="transform 0.8s ease, opacity 0.8s ease",m="opacity 0.8s ease",g="loading-title",u="loading-headers",f="loading-header";setTimeout(function(){o.style.transition=d,toggle(o,g,t),r.style.transition=m,toggle(r,f,t)},0),setTimeout(function(){n.style.transition=m+", background-position 0.1s ease",toggle(n,f,t)},600),iterate(l,0,function(e){e.style.transition=t?"":d,e.style.opacity=t?1:0,e.style.transform=t?"translateY(0%)":"translateY(-20%)"}),iterate(a,0,function(e){e.style.transition=d,toggle(e,u,t)}),iterate(c,850,function(e){e.style.transition=m,toggle(e,f,t)}),setTimeout(function(){e()},1200)}}