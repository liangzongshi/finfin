var handleDataTableDefault = function() {
	"use strict";
    
	if ($('#new_group_tb').length !== 0) {
		$('#new_group_tb').DataTable({
			responsive: true
		});
	}
	if ($('#member_group_tb').length !== 0) {
		$('#member_group_tb').DataTable({
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
	$("#edit_group").click(()=>{
		$("#edit_group").addClass("d-none")
		$("#cancel_edit_group").removeClass("d-none")
		$("#edit_name_group").removeClass("d-none")
		$("#edit_location_group").removeClass("d-none")
		$("#edit_time_group").removeClass("d-none")
	})
	$("#cancel_edit_group").click(()=>{
		$("#edit_group").removeClass("d-none")
		$("#cancel_edit_group").addClass("d-none")
		$("#edit_name_group").addClass("d-none")
		$("#edit_location_group").addClass("d-none")
		$("#edit_time_group").addClass("d-none")
	})
});