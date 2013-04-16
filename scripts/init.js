/* Normalized hide address bar for iOS & Android (c) Scott Jehl, scottjehl.com MIT License */
(function(a){var b=a.document;if(!location.hash&&a.addEventListener){window.scrollTo(0,1);var c=1,d=function(){return a.pageYOffset||b.compatMode==="CSS1Compat"&&b.documentElement.scrollTop||b.body.scrollTop||0},e=setInterval(function(){if(b.body){clearInterval(e);c=d();a.scrollTo(0,c===1?0:1)}},15);a.addEventListener("load",function(){setTimeout(function(){if(d()<20){a.scrollTo(0,c===1?0:1)}},0)})}})(this);

/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT License.*/
(function(m){var l=m.document;if(!l.querySelector){return}var n=l.querySelector("meta[name=viewport]"),a=n&&n.getAttribute("content"),k=a+",maximum-scale=1",d=a+",maximum-scale=10",g=true,j,i,h,c;if(!n){return}function f(){n.setAttribute("content",d);g=true}function b(){n.setAttribute("content",k);g=false}function e(o){c=o.accelerationIncludingGravity;j=Math.abs(c.x);i=Math.abs(c.y);h=Math.abs(c.z);if(!m.orientation&&(j>7||((h>6&&i<8||h<8&&i>6)&&j>5))){if(g){b()}}else{if(!g){f()}}}m.addEventListener("orientationchange",f,false);m.addEventListener("devicemotion",e,false)})(this); 

(function(w){
	var sw = document.body.clientWidth,
		sh = document.body.clientHeight,
		breakpoint = 670,
		speed = 800,
		mobile = true;
		
	$(document).ready(function() {
		checkMobile();
		setNav();
	});
		
	$(w).resize(function(){ //Update dimensions on resize
		sw = document.body.clientWidth;
		sh = document.body.clientHeight;
		checkMobile();
	});
	
	//Check if Mobile
	function checkMobile() {
		mobile = (sw > breakpoint) ? false : true;
		
		if (!mobile) { //If Not Mobile
			$('#navbar').show(); //Show navigation
		} else { //Hide 
			if(!$('#navbar-toggle a').hasClass('active')) {
				$('#navbar').hide();
			}
		}
	}
	
	//Toggle navigation for small screens
	function setNav() {
		var $anchorLink = $('#navbar-toggle').find('a');
		$anchorLink.click(function(e){
			e.preventDefault();
			var $this = $(this),
				thisHref = $this.attr('href');
			if($this.hasClass('active')) {
				$this.removeClass('active');
				$(thisHref).slideUp().hide();
				//$(thisHref).removeClass('nav-active');
			} else {
				$this.addClass('active');
				$(thisHref).slideDown().show();
				//$(thisHref).addClass('nav-active');
			}
		});
	}
})(this);