/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/


var handleSuperboxSetting = function() {
	$('[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		if ($(e.target).attr('href') == '#profile-photos') {
			$('#profile-photos').attr('data-init', true);
			$('.superbox').SuperBox({
				background : '#242a30',
				border : 'rgba(0,0,0,0.1)',
				xColor : '#a8acb1',
				xShadow : 'embed'
			});
		}
	});
};

var Profile = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleSuperboxSetting();
		}
	};
}();

$(document).ready(function() {
	Profile.init();
});