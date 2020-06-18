$(document).ready(() => {
    const socket = io()
    function addCommas(nStr){
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    $("#start_kyc_finance").click(()=>{
        socket.emit("finance_kyc", "true")
    })

    socket.on("finance_kyc_open", data =>{
        console.log(data)
    })


    $("#btn_add_sump").click((e)=>{
        e.preventDefault()
        const type_add = $("#add_sump_type").val()
        const amount = $("#add_sump_amount").val()
        const des = $("#add_sump_des").val()
        const date = $("input[name=add_sump_date]").val()
        var add_sump 
        if(date !== ""){
            add_sump = {
                type: type_add,
                title: des,
                value: amount,
                date: date
            }
        }else {
            add_sump = {
                type: type_add,
                title: des,
                value: amount
            }
        }
        
        socket.emit("add_sump_event", add_sump)
    })
    
    socket.on("add_sump_success", data =>{
        $("#finance_total_value").html(addCommas(data.total))
        $("#finance_sump_value").html(addCommas(data.Sump))
        $("#finance_edu_value").html(addCommas(data.Edu))
        $("#finance_save_value").html(addCommas(data.Save))
        $("#finance_loan_value").html(addCommas(data.Loan))
        $("#finance_debt_value").html(addCommas(data.Debt))
        $("#finance_play_value").html(addCommas(data.Play))
        $("#finance_inv_value").html(addCommas(data.Inv))
        $(
            `
            <tr class="odd gradeX" id="${data.newHistory.hisId}">
                <td id="type_${data.newHistory.hisId}" width="1%" class="with-img">${data.newHistory.type}</td>
                <td id="title_${data.newHistory.hisId}"> ${data.newHistory.title} </td>
                <td id="value_${data.newHistory.hisId}"> ${new Intl.NumberFormat().format(data.newHistory.value)} </td>
                <td id="date_${data.newHistory.hisId}"> ${data.newHistory.date} </td>
                <td> 
                    <a class="btn btn-default" href="javascript: void(0);" data-toggle="modal" data-target="#fix_his_${data.newHistory.hisId}"><i class="fa fa-pen text-blue"></i></a>
                    <a class="btn btn-default" href="javascript: void(0);" data-toggle="modal" data-target="#del_his_${data.newHistory.hisId}"><i class="fa fa-trash text-red"></i></a>	
                </td>
            </tr>
            `
        ).prependTo("#tby_sump")
        $("#add_sump").modal("hide")
    })

    $("#btn_add_loan").click((e)=>{
        e.preventDefault()
        const type_add = $("#add_loan_type").val()
        const amount = $("#add_loan_amount").val()
        const des = $("#add_loan_des").val()
        const date = $("input[name=add_loan_date]").val()
        var add_loan 
        if(date !== ""){
            add_loan = {
                type: type_add,
                title: des,
                value: amount,
                date: date
            }
        }else {
            add_loan = {
                type: type_add,
                title: des,
                value: amount
            }
        }
        socket.emit("add_loan_event", add_loan)
    })
    
    socket.on("add_loan_success", data =>{
        $("#finance_total_value").html(addCommas(data.total))
        $("#finance_sump_value").html(addCommas(data.Sump))
        $("#finance_edu_value").html(addCommas(data.Edu))
        $("#finance_save_value").html(addCommas(data.Save))
        $("#finance_loan_value").html(addCommas(data.Loan))
        $("#finance_debt_value").html(addCommas(data.Debt))
        $("#finance_play_value").html(addCommas(data.Play))
        $("#finance_inv_value").html(addCommas(data.Inv))
        $(
            `
            <tr class="odd gradeX" id="${data.newHistory.hisId}">
                <td id="type_${data.newHistory.hisId}" width="1%" class="with-img">${data.newHistory.type}</td>
                <td id="title_${data.newHistory.hisId}"> ${data.newHistory.title} </td>
                <td id="value_${data.newHistory.hisId}"> ${new Intl.NumberFormat().format(data.newHistory.value)} </td>
                <td id="date_${data.newHistory.hisId}"> ${data.newHistory.date} </td>
                <td> 
                    <a class="btn btn-default" href="javascript: void(0);" data-toggle="modal" data-target="#fix_his_${data.newHistory.hisId}"><i class="fa fa-pen text-blue"></i></a>
                    <a class="btn btn-default" href="javascript: void(0);" data-toggle="modal" data-target="#del_his_${data.newHistory.hisId}"><i class="fa fa-trash text-red"></i></a>	
                </td>
            </tr>
            `
        ).prependTo("#tby_loan_debt")
        $("#add_new_loan").modal("hide")
    })
   
    $("#btn_add_inc").click((e)=>{
        e.preventDefault()
        const amount = $("#add_inc_amount").val()
        const des = $("#add_inc_des").val()
        const date = $("input[name=add_inc_date]").val()
        var add_inc
        if(date !== ""){
            add_inc = {
                type: "INC",
                title: des,
                value: amount,
                date: date
            }
        }else {
            add_inc = {
                type: "INC",
                title: des,
                value: amount
            }
        }
        socket.emit("add_inc_event", add_inc)
    })
    
    socket.on("add_inc_success", data =>{
        $("#finance_total_value").html(addCommas(data.total))
        $("#finance_sump_value").html(addCommas(data.Sump))
        $("#finance_edu_value").html(addCommas(data.Edu))
        $("#finance_save_value").html(addCommas(data.Save))
        $("#finance_loan_value").html(addCommas(data.Loan))
        $("#finance_debt_value").html(addCommas(data.Debt))
        $("#finance_play_value").html(addCommas(data.Play))
        $("#finance_inv_value").html(addCommas(data.Inv))
        $(
            `
            <tr class="odd gradeX" id="${data.newHistory.hisId}">
                <td id="type_${data.newHistory.hisId}" width="1%" class="with-img">${data.newHistory.type}</td>
                <td id="title_${data.newHistory.hisId}"> ${data.newHistory.title} </td>
                <td id="value_${data.newHistory.hisId}"> ${new Intl.NumberFormat().format(data.newHistory.value)} </td>
                <td id="date_${data.newHistory.hisId}"> ${data.newHistory.date} </td>
                <td> 
                    <a class="btn btn-default" href="javascript: void(0);" data-toggle="modal" data-target="#fix_his_${data.newHistory.hisId}"><i class="fa fa-pen text-blue"></i></a>
                    <a class="btn btn-default" href="javascript: void(0);" data-toggle="modal" data-target="#del_his_${data.newHistory.hisId}"><i class="fa fa-trash text-red"></i></a>	
                </td>
            </tr>
            `
        ).prependTo("#inc_history_table")
        $("#add_new_income").modal("hide")
    })

    $("#btn_swap_fund").click((e)=>{
        e.preventDefault()
        const amount = $("#swap_fund_amount").val()
        const fromFund = $("#swap_fund_from").val()
        const toFund = $("#swap_fund_to").val()
        const swap_fund_data = {
            from: fromFund,
            to: toFund,
            value: amount
        }
        socket.emit("swap_fund_event", swap_fund_data)
    })
    
    socket.on("swap_fund_success", data =>{
        $("#finance_total_value").html(addCommas(data.total))
        $("#finance_sump_value").html(addCommas(data.Sump))
        $("#finance_edu_value").html(addCommas(data.Edu))
        $("#finance_save_value").html(addCommas(data.Save))
        $("#finance_loan_value").html(addCommas(data.Loan))
        $("#finance_debt_value").html(addCommas(data.Debt))
        $("#finance_play_value").html(addCommas(data.Play))
        $("#finance_inv_value").html(addCommas(data.Inv))
        $("#swap_fund").modal("hide")
    })
    $(".btn_fix_his").click((e)=>{
        e.preventDefault()
        const targetId = $(e.target).data("fid")
        const fix_his_data = {
            hisId: targetId,
            type: $(`#type_fix_his_${targetId}`).val(),
            des: $(`#des_fix_his_${targetId}`).val(),
            value: $(`#value_fix_his_${targetId}`).val(),
            date: $(`#date_fix_his_${targetId}`).val()
        }
        socket.emit("fix_his_event", fix_his_data)
    })
    
    socket.on("fix_event_success", data =>{
        $("#finance_total_value").html(addCommas(data.total))
        $("#finance_sump_value").html(addCommas(data.Sump))
        $("#finance_edu_value").html(addCommas(data.Edu))
        $("#finance_save_value").html(addCommas(data.Save))
        $("#finance_loan_value").html(addCommas(data.Loan))
        $("#finance_debt_value").html(addCommas(data.Debt))
        $("#finance_play_value").html(addCommas(data.Play))
        $("#finance_inv_value").html(addCommas(data.Inv))
        $(`#${data.newHistory.hisId}`).html(
            `
                <td id="type_${data.newHistory.hisId}" width="1%" class="with-img">${data.newHistory.type}</td>
                <td id="title_${data.newHistory.hisId}"> ${data.newHistory.title} </td>
                <td id="value_${data.newHistory.hisId}"> ${new Intl.NumberFormat().format(data.newHistory.value)} </td>
                <td id="date_${data.newHistory.hisId}"> ${data.newHistory.date} </td>
                <td> 
                    <a class="btn btn-default" href="javascript: void(0);" data-toggle="modal" data-target="#fix_his_${data.newHistory.hisId}"><i class="fa fa-pen text-blue"></i></a>
                    <a class="btn btn-default" href="javascript: void(0);" data-toggle="modal" data-target="#del_his_${data.newHistory.hisId}"><i class="fa fa-trash text-red"></i></a>	
                </td>
            `
        )
        $(`#fix_his_${data.newHistory.hisId}`).modal("hide")
    })
    $(".btn_del_his").click((e)=>{
        e.preventDefault()
        const targetId = $(e.target).data("did")
        const del_his_data = {
            hisId: targetId,
            type: $(`#type_his_${targetId}`).val(),
            des: $(`#des_his_${targetId}`).val(),
            value: $(`#value_his_${targetId}`).val(),
            date: $(`#date_his_${targetId}`).val()
        }
        socket.emit("del_his_event", del_his_data)
    })
    
    socket.on("del_event_success", data =>{
        $("#finance_total_value").html(addCommas(data.total))
        $("#finance_sump_value").html(addCommas(data.Sump))
        $("#finance_edu_value").html(addCommas(data.Edu))
        $("#finance_save_value").html(addCommas(data.Save))
        $("#finance_loan_value").html(addCommas(data.Loan))
        $("#finance_debt_value").html(addCommas(data.Debt))
        $("#finance_play_value").html(addCommas(data.Play))
        $("#finance_inv_value").html(addCommas(data.Inv))
        $(`#${data.newHistory.hisId}`).remove()
        $(`#del_his_${data.newHistory.hisId}`).modal("hide")
    })
})