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
	const socket = io()
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
	$(".btn_join_group").click((e)=>{
		const groupId = $(e.target).data("group")
		socket.emit("join_group", groupId)
	})
	socket.on("join_group_error", data=>{
		$.notify(data, "error")
	})
	socket.on("join_group_success", data=>{
		$.notify(data.note, "error")
		$("#join_group").remove()
		$("#content").append(`
		<!-- joined a group -->
		<div class="row" id="info_group">
			<!-- begin col-6 -->
			<div class="col-xl-9 col-lg-9">
				<!-- begin card -->
				<div class="card border-0 mb-3 overflow-hidden " style="min-height: 150px;">
					<!-- begin card-body -->
					<div class="card-body">
						<!-- begin row -->
						<div class="mb-3 text-greyn text-center">
							<b>GROUP INFORMATION</b>
						</div>
						<div class="row">
							<!-- begin col-7 -->
							
							<div class="col-xl-4 col-lg-4">
								<div class="d-flex">
									<h5 class="f-s-14 text-gray">Group Id: &nbsp;&nbsp;&nbsp;<span class="text-grey">${listMem.team.code}</span></h5>
								</div>
								<div class="d-flex">
									<h5 class="f-s-14 text-gray">Name: &nbsp;&nbsp;&nbsp;<span class="text-grey">Tulpo</span> &nbsp;&nbsp;&nbsp;<input id="edit_name_group" type="button" class="btn btn-xs btn-outline-grey d-none"value="Edit Name" data-toggle="modal" data-target="#edit_name_group_md"></h5>
								</div>
								<div class="d-flex">
									<h5 class="f-s-14 text-gray">Members: &nbsp;&nbsp;&nbsp;<span class="text-grey">${listMem.team.members}</span></h5>
								</div>
							</div>
							<div class="col-xl-4 col-lg-4">
								<div class="d-flex">
									<h5 class="f-s-14 text-gray">Group Link: &nbsp;&nbsp;&nbsp;<span class="text-grey">${listMem.team.chat}</span></h5>
								</div>
								<div class="d-flex">
									<h5 class="f-s-14 text-gray">Zoom Room: &nbsp;&nbsp;&nbsp;<span class="text-grey">${listMem.team.meeting}</span></h5>
								</div>
							</div>
							<div class="col-xl-4 col-lg-4">
								<div class="d-flex">
									<h5 class="f-s-14 text-gray">Area: &nbsp;&nbsp;&nbsp;<span class="text-grey">${listMem.team.local}</span></h5>
								</div>
								<div class="d-flex">
									<h5 class="f-s-14 text-gray">Offline Location: &nbsp;&nbsp;&nbsp;<span class="text-grey">${listMem.team.offline}</span> &nbsp;&nbsp;&nbsp;<input id="edit_location_group" type="button" class="btn btn-xs btn-outline-grey d-none"value="Edit Offline Location" data-toggle="modal" data-target="#edit_location_group_md"></h5>
								</div>
								<div class="d-flex">
								<h5 class="f-s-14 text-gray">Offline Time: &nbsp;&nbsp;&nbsp;<span class="text-grey">${listMem.team.time.toISOString().split("T")[0] + " " + listMem.team.time.toISOString().split("T")[1].slice(0,8)}</span> &nbsp;&nbsp;&nbsp;<input id="edit_time_group" type="button" class="btn btn-xs btn-outline-grey d-none"value="Edit Offline Times" data-toggle="modal" data-target="#edit_time_group_md"></h5>
								</div>

							</div>
							<!-- end col-7 -->
						</div>
						<!-- end row -->
					</div>
					<!-- end card-body -->
				</div>
				<!-- end card -->
			</div>
			<!-- end col-6 -->
			<!-- begin col-6 -->
			<div class="col-xl-3 col-lg-3">
				<!-- begin card -->
				<div class="card border-0 mb-3 overflow-hidden " style="min-height: 150px;">
					<!-- begin card-body -->
					<div class="card-body">
						<!-- begin row -->
						<div class="row">
							<!-- begin col-7 -->
							<div class="col-xl-12 col-lg-12">
								<!-- begin title -->
								<div class="mb-3 text-grey text-center">
									<b>TOTAL SALES</b>
								</div>
								<!-- end title -->
								<!-- begin title -->
								<div class="mb-3 text-grey text-center">
									<h2><span>${listMem.salesGroup}</span> $</h2>
									<p class="text-grey">= <span>60000</span> FFT</p>
								</div>
								<!-- end title -->
							</div>
							<!-- end col-7 -->
						</div>
						<!-- end row -->
					</div>
					<!-- end card-body -->
				</div>
				<!-- end card -->
			</div>
			<!-- end col-6 -->
		</div>
		<div class="row" id="mem_list">
			<!-- begin col-10 -->
			<div class="col-xl-12">
				<div class="panel panel-inverse">
					<h4 class="p-10">MEMBERS</h4>
					<!-- begin panel-body -->
					<div class="panel-body">
						<table id="member_group_tb" class="table table-striped table-bordered table-td-valign-middle text-center">
							<thead>
								<tr>
									<th width="1%"></th>
									<th class="text-nowrap">Id</th>
									<th class="text-nowrap">Name</th>
									<th class="text-nowrap">Email</th>
									<th class="text-nowrap">Phone</th>
									<th class="text-nowrap">Job</th>
									<!-- if(role = leader){ -->
									<th class="text-nowrap">Action</th>
									<!-- } -->
								</tr>
							</thead>
							<tbody>
								${listMem.mem.forEach(function(item){
									`<tr class="odd gradeX" id="tr-currency.symbol">
										<td width="1%" class="f-s-600 text-inverse">1</td>
										<td>${item.id}</td>
										<td>${item.info.first_name} ${item.info.last_name}</td>
										<td>${item.info.email}</td>
										<td>${item.info.phone}</td>
										<td>${item.info.job}</td>
										<!-- if(role == "leader"){ -->
										<td><input type="button" class="btn_remove_mem btn btn-danger" value="Delete" data-id="${item.id}"></td><!-- add id member here-->
										<!-- } -->
									</tr>`
								})}
							</tbody>
						</table>
						
					</div>
					<!-- end panel-body -->
				</div>
			</div>
			<!-- end col-10 -->
		</div>
		
		`)
	})
	$(".btn_remove_mem").click((e)=>{
		e.preventDefault()
		const userId = $(e.target).data("id")
		const groupId = $("#mem_list").data("gid")
		socket.emit("remove_mem", {userId, groupId})
	})
	socket.on("remove_mem_success", data => {
		$(`r_${data}`).remove()
		$.notify("Remove User From Group Success", "success")
	})
	socket.on("remove_mem_err", data => {
		$.notify(data, "error")
	})
});