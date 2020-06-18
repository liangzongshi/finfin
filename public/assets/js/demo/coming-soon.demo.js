/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

var handleCountdownTimer = function(id, setday) {
	var newYear = new Date();
	newYear = new Date(newYear.getFullYear() , newYear.getMonth(), newYear.getDate() + setday);
	$(id).countdown({until: newYear});
};

var ComingSoon = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleCountdownTimer('#timer_ai_page', 30);
			handleCountdownTimer('#timer_livestream_page', 15);
			handleCountdownTimer('#timer_group_page', 21);
		}
	};
}();


$(document).ready(function() {
	ComingSoon.init();
});