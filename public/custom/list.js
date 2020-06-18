var handleDataTableDefault = function() {
	"use strict";
    
	if ($('#list_tb').length !== 0) {
		$('#list_tb').DataTable({
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