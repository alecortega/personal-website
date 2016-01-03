"use strict";jQuery(function(e){function t(e,t,o){var r;return function(){var n=this,i=arguments,a=function(){r=null,o||e.apply(n,i)},s=o&&!r;clearTimeout(r),r=setTimeout(a,t),s&&e.apply(n,i)}}function o(){e(window).width()<768&&(h.toggleClass("active"),e(".js-mobile-links").stop().fadeToggle(300,"linear"))}var r,n,i=e("html, body"),a=e(".submit-button"),s=e(".submit-button i"),l=e(".submit-button span"),c=e("#browser-designer-element"),u=e("#resume-element"),g=e(".envelope-bottom"),d=e(".envelope-top"),h=e(".js-navbar-hamburger"),m=e(".nav-trigger").outerHeight(),f=e(".resume-trigger"),p=function(){g.css("bottom",d.height()-g.height()/2.6)},b=function(){return e("#browser-developer-trigger").outerHeight()+e("#browser-developer-element").outerHeight()},w=function(){return e("#browser-designer-trigger").outerHeight()+e("#browser-designer-element").outerHeight()},v=function(){return f.outerHeight()+u.outerHeight()/60},S=function(){return-m-50-c.height()},T=function(){return-m-50-u.outerHeight()},C=function(){return e(".recommendation-trigger").outerHeight()-e(".recommendation").outerHeight()},k=function(){return e("#resume").outerHeight()-m},E=function(){return e("#about").outerHeight()+e("#developer").outerHeight()+e("#designer").outerHeight()-m},H=function(){return e("#contact").outerHeight(!0)},M=new ScrollMagic.Controller({globalSceneOptions:{offset:-(m+1),pushFollowers:!1,reverse:!0,triggerHook:0}});new ScrollMagic.Scene({triggerElement:"#about"}).setClassToggle(".nav-trigger","nav-trigger-in").addTo(M),new ScrollMagic.Scene({duration:E,triggerElement:"#about"}).setClassToggle(".about-link","highlight").addTo(M),new ScrollMagic.Scene({duration:k,triggerElement:"#resume"}).setClassToggle(".resume-link","highlight").addTo(M),new ScrollMagic.Scene({duration:H,triggerElement:"#contact"}).setClassToggle(".contact-link","highlight").addTo(M);var y=new ScrollMagic.Controller({globalSceneOptions:{pushFollowers:!1,reverse:!0,triggerHook:"onLeave"}});e("#browser-designer-element").one("load",function(){new ScrollMagic.Scene({duration:b,offset:-m-50,triggerElement:"#browser-developer-trigger"}).setPin("#browser-developer-element").addTo(y)}).each(function(){(this.complete||e(this).height()>0)&&e(this).load()}),e("#browser-designer-element").one("load",function(){r=new ScrollMagic.Scene({duration:w,offset:S(),triggerElement:"#browser-designer-trigger"}).setPin("#browser-designer-element").addTo(y)}).each(function(){(this.complete||e(this).height()>0)&&e(this).load()}),e("#resume-element").one("load",function(){n=new ScrollMagic.Scene({duration:v,offset:T(),triggerElement:".resume-trigger"}).setPin("#resume-element").addTo(y)}).each(function(){(this.complete||e(this).height()>0)&&e(this).load()});var j=function(){var e=new ScrollMagic.Controller({globalSceneOptions:{duration:C,offset:-m-50,pushFollowers:!1,reverse:!0,triggerHook:"onLeave"}});new ScrollMagic.Scene({triggerElement:".recommendation-trigger.left",tweenChanges:!1}).setPin(".recommendation.left").addTo(e),new ScrollMagic.Scene({triggerElement:".recommendation-trigger.right",tweenChanges:!1}).setPin(".recommendation.right").tweenChanges(!0).addTo(e)};e(window).on("resize",t(function(){n.offset(T()),r.offset(S()),p(),e(".js-mobile-links").one().stop().fadeOut(),h.removeClass("active")},60));var x=function(){s.removeClass().addClass("fa fa-paper-plane"),a.prop("disabled",!1),l.text(" SEND MESSAGE"),e("textarea").height("initial"),document.getElementById("contact-form").reset()};e("#contact-form").submit(function(t){t.preventDefault(),a.prop("disabled",!0),s.removeClass().addClass("fa fa-spin fa-cog"),l.text(" SENDING");var o=e(this).serializeArray();e.ajax({url:"/",type:"POST",data:o,success:function(){s.removeClass().addClass("fa fa-check"),l.text(" SENT!"),setTimeout(x,3e3)},error:function(){s.removeClass().addClass("fa fa-times"),l.text(" ERROR SENDING"),setTimeout(x,3e3)}})}),e(document).on("click",".resume-button-download",function(){e.ajax({url:"/resume",type:"GET"})}),e(".about-link, .resume-link, .contact-link, .js-get-started, .js-brand-name, .hero-arrow").click(function(){var t=e.attr(this,"href");return i.stop().animate({scrollTop:e(t).offset().top-m},1500),!1}),e("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup touchstart",function(e){(e.which>0||"mousedown"===e.type||"mousewheel"===e.type||"touchstart"===e.type)&&i.stop()}),autosize(e("textarea")),e(".about-photo-container > div:gt(0)").hide();var O=function(){e(".about-photo-container > div:first").stop().fadeOut(1e3).next().fadeIn(1e3).end().appendTo(".about-photo-container")},I=setInterval(O,5e3);e(document).on("click",".about-photo-container",function(){O(),clearInterval(I),I=setInterval(O,5e3)}),e(".js-navbar-hamburger, .js-mobile-links a").click(o),e(document).ready(function(){j()}),e(window).load(function(){e(".quote").dotdotdot({after:"a.readmore",height:210,watch:"window"}),p()})});