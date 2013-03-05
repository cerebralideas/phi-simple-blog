/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'entypo\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-mobile' : '&#x2395;',
			'icon-pencil' : '&#x270e;',
			'icon-paperclip' : '&#x23cd;',
			'icon-drawer' : '&#x2b13;',
			'icon-reply' : '&#x21b6;',
			'icon-forward' : '&#x21b7;',
			'icon-user' : '&#x265f;',
			'icon-star' : '&#x2605;',
			'icon-export' : '&#x238b;',
			'icon-comment' : '&#x275e;',
			'icon-printer' : '&#x25a9;',
			'icon-search' : '&#x26b2;',
			'icon-house' : '&#x2617;',
			'icon-cog' : '&#x2638;',
			'icon-tools' : '&#x2692;',
			'icon-lifebuoy' : '&#x25cc;',
			'icon-eye' : '&#x233e;',
			'icon-clock' : '&#x233d;',
			'icon-calendar' : '&#x2b12;',
			'icon-earth' : '&#x2689;',
			'icon-browser' : '&#x25a2;',
			'icon-code' : '&#x2390;',
			'icon-screen' : '&#x25a6;',
			'icon-login' : '&#x2348;',
			'icon-logout' : '&#x2347;',
			'icon-minus' : '&#x2d;',
			'icon-plus' : '&#x2b;',
			'icon-cross' : '&#x2613;',
			'icon-checkmark' : '&#x2611;',
			'icon-cross-2' : '&#x2612;',
			'icon-info' : '&#x69;',
			'icon-help' : '&#x3f;',
			'icon-warning' : '&#x21;',
			'icon-retweet' : '&#x21cc;',
			'icon-folder' : '&#x25db;',
			'icon-trash' : '&#x26b0;',
			'icon-install' : '&#x27f1;',
			'icon-upload' : '&#x27f0;',
			'icon-arrow-left' : '&#x25c2;',
			'icon-arrow-down' : '&#x25be;',
			'icon-arrow-up' : '&#x25b4;',
			'icon-arrow-right' : '&#x25b8;',
			'icon-menu' : '&#x2666;',
			'icon-resize-enlarge' : '&#x21f1;',
			'icon-resize-shrink' : '&#x2327;',
			'icon-arrow-right-2' : '&#x2192;',
			'icon-arrow-up--upload' : '&#x2191;',
			'icon-arrow-left-2' : '&#x2190;',
			'icon-arrow-down-2' : '&#x2193;',
			'icon-github' : '&#x25fe;',
			'icon-twitter' : '&#x25fd;',
			'icon-facebook' : '&#x26e4;',
			'icon-googleplus' : '&#x26e3;',
			'icon-dribbble' : '&#x26ea;',
			'icon-pinterest' : '&#x26d1;',
			'icon-disk' : '&#x73;',
			'icon-layout' : '&#x2637;',
			'icon-list' : '&#x2630;',
			'icon-document' : '&#x25af;',
			'icon-cart' : '&#x26d2;',
			'icon-gauge' : '&#x2365;',
			'icon-tag' : '&#x25b0;',
			'icon-location' : '&#x25bc;',
			'icon-popup' : '&#x274f;',
			'icon-blocked' : '&#x2300;',
			'icon-bookmark' : '&#x25ae;',
			'icon-archive' : '&#x2339;',
			'icon-paperplane' : '&#x25ee;',
			'icon-map' : '&#x25eb;',
			'icon-palette' : '&#x2762;',
			'icon-camera' : '&#x25ce;',
			'icon-flag' : '&#x2691;',
			'icon-star-2' : '&#x2606;',
			'icon-network' : '&#x273a;',
			'icon-brush' : '&#x2712;',
			'icon-credit-card' : '&#xe008;',
			'icon-box' : '&#xe009;',
			'icon-tumblr' : '&#xe00a;',
			'icon-flickr' : '&#xe00b;',
			'icon-vimeo' : '&#xe00c;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};