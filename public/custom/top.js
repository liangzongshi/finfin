var handleDataTableDefault = function() {
	"use strict";
    
	if ($('#top_invest_tb').length !== 0) {
		$('#top_invest_tb').DataTable({
			responsive: true
		});
	}
	if ($('#top_sale_tb').length !== 0) {
		$('#top_sale_tb').DataTable({
			responsive: true
		});
	}
	if ($('#top_group_tb').length !== 0) {
		$('#top_group_tb').DataTable({
			responsive: true
		});
	}
};

var TableManageDefault = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleDataTableDefault();
		}
	};
}();

$(document).ready(function() {
	TableManageDefault.init();
});