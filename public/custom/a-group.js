var handleDataTableDefault = function(id) {
	"use strict";
    
	if ($(id).length !== 0) {
		$(id).DataTable({
			responsive: true
		});
	}
};

var TableManageDefault = function () {
	"use strict";
	return {
		//main function
		init: function (id) {
			handleDataTableDefault(id);
		}
	};
}();

$(document).ready(function() {
	TableManageDefault.init('#a_group_tb');
	TableManageDefault.init('#a_leader_tb');
});