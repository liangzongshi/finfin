/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

var handleVectorMap = function(data) {
	if (('#world-map').length !== 0) {
		var wHeight = $(window).height();
		$('#world-map').css('height', wHeight);

		$(window).resize(function() {
			var wHeight = $(window).height();
			$('#world-map').css('height', wHeight);
		});
		$('#world-map').vectorMap({
			map: 'world_mill',
			scaleColors: [COLOR_DARK_TRANSPARENT_2, COLOR_DARK_TRANSPARENT_5],
			normalizeFunction: 'polynomial',
			hoverOpacity: 0.5,
			hoverColor: false,
			markerStyle: {
				initial: {
					fill: COLOR_GREEN,
					stroke: 'transparent',
					r: 3
				}
			},
			regionStyle: {
				initial: {
					fill: COLOR_DARK_LIGHTER,
					"fill-opacity": 1,
					stroke: 'none',
					"stroke-width": 0.4,
					"stroke-opacity": 1
				},
				hover: {
					"fill-opacity": 0.8
				},
				selected: {
					fill: 'yellow'
				},
				selectedHover: { }
			},
			focusOn: {
				x: 0.5,
				y: 0.5,
				scale: 2
			},
			backgroundColor: COLOR_DARK_DARKER,
			markers: data
		});
	}
};

var MapVector = function (data) {
	"use strict";
	
	return {
		//main function
		init: function (data) {
			handleVectorMap(data);
		}
	};
}();

$(document).ready(function() {
	const socket = io()
	MapVector.init([])
    socket.on("create_map", data=>{
		var mapObject = $("#world-map").vectorMap("get", "mapObject")
		mapObject.addMarkers(data.dataMap, []);
		var htmlNew = ""
		data.dataInfo.forEach((item)=>{
			htmlNew += `
				<tr>
					<td>${item.country}</td>
					<td><span class="text-success">${item.total}</i></span></td>
				</tr>
			`
		})
		$("#map_info").html(htmlNew)
    })
});