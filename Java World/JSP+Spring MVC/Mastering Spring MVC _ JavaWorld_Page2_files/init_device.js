// Initialize Device Type based on window width

var IDG = IDG || {};
IDG.DEVICE = {
	breakpoints:{
		'smallmobile': 320,
		'mobile': 568,
		'tablet': 768,
		'tabletLandscape': 769,
		'desktop': 768,
		'wide':970,
		'superwide': 1460	
	},
	type: 'unknown',
	width: function() { return window.innerWidth > 0 ? window.innerWidth : document.documentElement.clientWidth; },
	isMobile: function() {
		return this.type == 'mobile';
	},
	setType: function (width) {
		if (width > this.breakpoints.superwide) {
			return "superwide";
		} else if (width > this.breakpoints.desktop) {
			return "desktop";
		} else if (width > this.breakpoints.mobile){
			return "tablet";
		} else {
			return "mobile";
		}
	},
	init: function() {
		this.type = this.setType(this.width());
	},
}

IDG.DEVICE.init();

// END Initialize Device Type