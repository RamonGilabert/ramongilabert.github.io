function Parallax(){this.elements=[],this.images=[],this.method=empty,this.headerText="",this.quote="",this.figure="",this.prepare=function(){if(isDetail()){this.method=this.detail.bind(this);for(var t=document.classes("image-wrapper"),e=exists("lights")?2:1,i=0;i<e;i++){var s,a,l,r,h,n,o=document.createElement("img");exists("lights")?(s="./images/details/lights/parallax/first.png",a="55%",h="-15px",r="auto",l="14%",n=0,1==i&&(s="./images/details/lights/parallax/second.png",l="12%",n=2)):exists("branding")&&(s="./images/details/branding/parallax/first.png",a="75%",l="12.5%",r="auto",h="100px",n=1),o.src=s,o.classList.add("parallax"),o.style.position="absolute",o.style.width=a,o.style.top=h,o.style.right=r,o.style.left=l,t[n].appendChild(o)}this.images=document.classes("parallax"),this.figure=document.class("hero").tag("figure"),this.headerText=document.class("hero-text-wrapper"),this.quote=document.class("quoter")}},this.detail=function(){var t=window.innerHeight,e=window.pageYOffset;if(e<t){var i=-50+100*e/t;this.headerText.style.transform="translate3d(0, "+i+"%, 0)"}if(void 0!==this.quote){var s=positionOffset(this.quote)-100;if(s<=e&&s+this.quote.clientHeight+t>=e){var i=50*(e-s)/(t+this.quote.clientHeight);this.quote.style.transform="translate3d(0, "+i+"%, 0)"}}for(var a=0;a<this.images.length;a++){var l=this.images[a],s=positionOffset(l);if(s<=e&&s+l.clientHeight+t>=e){var i=20*(e-s)/(t+l.clientHeight);l.style.transform="translate3d(0, "+i+"%, 0)"}}}}