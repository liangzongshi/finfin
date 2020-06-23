$(document).ready(() => {
    const socket = io()
    socket.on('connect', () => {})

    $('#btn_edit_profile').click((e) => {
        $("#update_name_profile").addClass("d-inline")
        $("#update_mobile_profile").addClass("d-inline")
        $("#update_job_profile").addClass("d-inline")
        $("#update_village_profile").addClass("d-inline")
        $("#update_district_profile").addClass("d-inline")
        $("#update_about_profile").addClass("d-inline")
        $("#update_city_profile").addClass("d-inline")

        $("#btn_submit_country").addClass("d-inline")
        $("#post_country_profile").addClass("d-none")
        $("#update_country_profile").addClass("d-inline")

        $("#btn_submit_gender").addClass("d-inline")
        $("#post_gender_profile").addClass("d-none")
        $("#update_gender_profile").addClass("d-inline")

        $("#btn_submit_bd").addClass("d-inline")
        $("#post_bd_profile").addClass("d-none")
        $("#select_bd_form").addClass("d-inline")

        $("#update_gender_profile").attr("disabled", false)
        $("#update_day_bd_profile").attr("disabled", false)
        $("#update_month_bd_profile").attr("disabled", false)
        $("#update_year_bd_profile").attr("disabled", false)
        $("#btn_cancel_profile").addClass("d-inline")
        $("#btn_edit_profile").addClass("d-none")
    })
    $('#btn_cancel_profile').click((e) => {
        $("#update_name_profile").removeClass("d-inline")
        $("#update_mobile_profile").removeClass("d-inline")
        $("#update_job_profile").removeClass("d-inline")
        $("#update_address_profile").removeClass("d-inline")
        $("#update_about_profile").removeClass("d-inline")
        $("#update_city_profile").removeClass("d-inline")

        $("#btn_submit_country").removeClass("d-inline")
        $("#post_country_profile").removeClass("d-none")
        $("#update_country_profile").removeClass("d-inline")

        $("#btn_submit_gender").removeClass("d-inline")
        $("#post_gender_profile").removeClass("d-none")
        $("#update_gender_profile").removeClass("d-inline")

        $("#btn_submit_bd").removeClass("d-inline")
        $("#post_bd_profile").removeClass("d-none")
        $("#select_bd_form").removeClass("d-inline")

        $("#update_gender_profile").attr("disabled", true)
        $("#update_day_bd_profile").attr("disabled", true)
        $("#update_month_bd_profile").attr("disabled", true)
        $("#update_year_bd_profile").attr("disabled", true)
        $("#btn_cancel_profile").removeClass("d-inline")
        $("#btn_edit_profile").removeClass("d-none")
    })
    //mobile
    $("#submit_add_mobile").click((e)=>{
        e.preventDefault()
        const phoneCode = $("#add_mobile_code").val()
        const phoneVal = $("#add_mobile_val").val().replace(/^0+/, '')
        if(phoneVal){
            socket.emit("add_mobile_event", (phoneCode + "-" + phoneVal))
        }        
    })

    socket.on("add_mobile_success", data=>{
        $("#add_mobile_profile").addClass("d-none")
        $(`
            <span id="get_mobile">${data}</span> 
            <a id="update_mobile_profile" href="javascript:;" class="m-l-5 d-none">Edit</a>
        `).appendTo("#td_mobile")
        $("#add_mobile_md").modal("hide")
    })

    $("#submit_update_mobile").click((e)=>{
        e.preventDefault()
        const phoneCode = $("#update_mobile_code").val()
        const phoneVal = $("#update_mobile_val").val().replace(/^0+/, '')  
        if(phoneVal){
            socket.emit("update_mobile_event", (phoneCode + "-" + phoneVal))
        }      
    })

    socket.on("update_mobile_success", data=>{
        $("#td_mobile").html(`
            <i class="fa fa-mobile fa-lg m-r-5"></i>
            <span id="get_mobile">${data}</span> 
            <a id="update_mobile_profile" href="javascript:;" class="m-l-5 d-none" data-toggle="modal" data-target="#update_mobile_md">Edit</a>
            `)
        $("#update_mobile_md").modal("hide")
    })
    //village
    $("#submit_add_village").click((e)=>{
        e.preventDefault()
        const villageVal = $("#add_village_val").val()  
        if(villageVal){
            socket.emit("add_village_event", villageVal)
        }     
    })

    socket.on("add_village_success", data=>{
        $("#add_village_profile").addClass("d-none")
        $(`
            <span id="get_village">${data}</span> 
            <a id="update_village_profile" href="javascript:;" class="m-l-5 d-none" data-toggle="modal" data-target="#update_village_md">Edit</a>
        `).appendTo("#td_village")
        $("#add_village_md").modal("hide")
    })

    $("#submit_update_village").click((e)=>{
        e.preventDefault()
        const villageval = $("#update_village_val").val()   
        if(villageval){
            socket.emit("update_village_event", villageval)
        }  
    })

    socket.on("update_village_success", data=>{
        $("#td_village").html(`
            <i class="fa fa-home fa-lg m-r-5"></i>
            <span id="get_village">${data}</span> 
            <a id="update_village_profile" href="javascript:;" class="m-l-5 d-none" data-toggle="modal" data-target="#update_village_md">Edit</a>
            `)
        $("#update_village_md").modal("hide")
    })
    //district
    $("#submit_add_district").click((e)=>{
        e.preventDefault()
        const districtVal = $("#add_district_val").val()  
        if(districtVal){
            socket.emit("add_district_event", districtVal)
        }     
    })

    socket.on("add_district_success", data=>{
        $("#add_district_profile").addClass("d-none")
        $(`
            <span id="get_district">${data}</span> 
            <a id="update_district_profile" href="javascript:;" class="m-l-5 d-none" data-toggle="modal" data-target="#update_district_md">Edit</a>
        `).appendTo("#td_district")
        $("#add_district_md").modal("hide")
    })

    $("#submit_update_district").click((e)=>{
        e.preventDefault()
        const districtval = $("#update_district_val").val()   
        if(districtval){
            socket.emit("update_district_event", districtval)
        }  
    })

    socket.on("update_district_success", data=>{
        $("#td_district").html(`
            <i class="fa fa-home fa-lg m-r-5"></i>
            <span id="get_district">${data}</span> 
            <a id="update_district_profile" href="javascript:;" class="m-l-5 d-none" data-toggle="modal" data-target="#update_district_md">Edit</a>
            `)
        $("#update_district_md").modal("hide")
    })
    //description
    $("#submit_add_about").click((e)=>{
        e.preventDefault()
        const aboutVal = $("#add_about_val").val()  
        if(aboutVal){
            socket.emit("add_about_event", aboutVal)
        }     
    })

    socket.on("add_about_success", data=>{
        $("#add_about_profile").addClass("d-none")
        $(`
            <span id="get_about">${data}</span> 
            <a id="update_about_profile" href="javascript:;" class="m-l-5 d-none" data-toggle="modal" data-target="#update_about_md">Edit</a>
        `).appendTo("#td_about")
        $("#add_about_md").modal("hide")
    })

    $("#submit_update_about").click((e)=>{
        e.preventDefault()
        const aboutval = $("#update_about_val").val()     
        if(aboutval){
            socket.emit("update_about_event", aboutval)
        }
    })

    socket.on("update_about_success", data=>{
        $("#td_about").html(`
            <i class="fa fa-home fa-lg m-r-5"></i>
            <span id="get_about">${data}</span> 
            <a id="update_about_profile" href="javascript:;" class="m-l-5 d-none" data-toggle="modal" data-target="#update_about_md">Edit</a>
            `)
        $("#update_about_md").modal("hide")
    })
    //city
    $("#submit_add_city").click((e)=>{
        e.preventDefault()
        const cityVal = $("#add_city_val").val()   
        if(cityVal){
            socket.emit("add_city_event", cityVal)
        }    
    })

    socket.on("add_city_success", data=>{
        $("#add_city_profile").addClass("d-none")
        $(`
            <span id="get_city">${data}</span> 
            <a id="update_city_profile" href="javascript:;" class="m-l-5 d-none" data-toggle="modal" data-target="#update_city_md">Edit</a>
        `).appendTo("#td_city")
        $("#add_city_md").modal("hide")
    })

    $("#submit_update_city").click((e)=>{
        e.preventDefault()
        const cityVal = $("#update_city_val").val()
        if(cityVal){
            socket.emit("update_city_event", cityVal)
        }     
    })

    socket.on("update_city_success", data=>{
        $("#td_city").html(`
            <i class="fa fa-home fa-lg m-r-5"></i>
            <span id="get_city">${data}</span> 
            <a id="update_city_profile" href="javascript:;" class="m-l-5 d-none" data-toggle="modal" data-target="#update_city_md">Edit</a>
            `)
        $("#update_city_md").modal("hide")
    })
    //job
    $("#submit_add_job").click((e)=>{
        e.preventDefault()
        const jobVal = $("#add_job_val").val()  
        if(jobVal){
            socket.emit("add_job_event", jobVal)
        }     
    })

    socket.on("add_job_success", data=>{
        $("#add_job_profile").addClass("d-none")
        $(`
            <span id="get_job">${data}</span> 
            <span id="update_job_profile" class="d-none"><a href="" class="btn btn-xs btn-warning" data-toggle="modal" data-target="#update_job_md">Edit Job</a></span>
            `).appendTo("#td_job")
        $("#add_job_md").modal("hide")
    })

    $("#submit_update_job").click((e)=>{
        e.preventDefault()
        const jobVal = $("#update_job_val").val()  
        if(jobVal){
            socket.emit("update_job_event", jobVal)
        }   
    })

    socket.on("update_job_success", data=>{
        $("#td_job").html(`
            <span id="get_job">${data}</span> 
            <span id="update_job_profile" class="d-none"><a href="" class="btn btn-xs btn-warning" data-toggle="modal" data-target="#update_job_md">Edit Job</a></span>
            `)
        $("#update_job_md").modal("hide")
    })
    //name
    $("#submit_add_name").click((e)=>{
        e.preventDefault()
        const nameVal = $("#add_name_val").val()  
        if(nameVal){
            socket.emit("add_name_event", nameVal)
        }     
    })

    socket.on("add_name_success", data=>{
        $("#add_name_profile").addClass("d-none")
        $(`
            <span id="get_name">${data.toUpperCase()}</span> 
            <small id="update_name_profile" class="d-none"><a href="javascript:;" class="m-l-5" data-toggle="modal" data-target="#update_name_md">Edit Name</a></small>
            `).appendTo("#td_name")
        $("#add_name_md").modal("hide")
    })

    $("#submit_update_name").click((e)=>{
        e.preventDefault()
        const nameVal = $("#update_name_val").val()  
        if(nameVal){
            socket.emit("update_name_event", nameVal)
        }   
    })

    socket.on("update_name_success", data=>{
        $("#td_name").html(`
            <span id="get_name">${data.toUpperCase()}</span> 
            <small id="update_name_profile" class="d-none"><a href="javascript:;" class="m-l-5" data-toggle="modal" data-target="#update_name_md">Edit Name</a></small>
            `)
        $("#update_name_md").modal("hide")
    })
    //country
    $("#btn_submit_country").click((e)=>{
        e.preventDefault()
        const countryVal = $("#update_country_profile").val()     
        socket.emit("update_country_event", countryVal)
    })
    socket.on("update_country_success", data=>{
        $("#btn_submit_country").removeClass("d-inline")
        $("#update_country_profile").removeClass("d-inline")
        $("#post_country_profile").html(data).removeClass("d-none")
    })
    //gender
    $("#btn_submit_gender").click((e)=>{
        e.preventDefault()
        const genderVal = $("#update_gender_profile").val()     
        socket.emit("update_gender_event", genderVal)
    })
    socket.on("update_gender_success", data=>{
        $("#btn_submit_gender").removeClass("d-inline")
        $("#update_gender_profile").removeClass("d-inline")
        $("#post_gender_profile").html(data).removeClass("d-none")
    })
    //birthday
    $("#btn_submit_bd").click((e)=>{
        e.preventDefault()
        const bdVal = $("#update_month_bd_profile").val()+ "-" + $("#update_day_bd_profile").val() + "-" + $("#update_year_bd_profile").val()   
        console.log(bdVal);
        socket.emit("update_bd_event", bdVal)
    })
    socket.on("update_bd_success", data=>{
        $("#btn_submit_bd").removeClass("d-inline")
        $("#select_bd_form").removeClass("d-inline")
        $("#post_bd_profile").html(data).removeClass("d-none")
    })
    //change password
    $("#submit_change_pass").click((e)=>{
        e.preventDefault()
        const oldPass = $("#old_pass_val").val()
        const newPass = $("#new_pass_val").val()
        const re_newPass = $("#re_new_pass_val").val()
        const hash1 = CryptoJS.MD5(oldPass)
        const hash2 = CryptoJS.MD5(newPass)
        const hash3 = CryptoJS.MD5(re_newPass)
        $("#cef_old").val(hash1)
        $("#cef_new").val(hash2)
        $("#cef_re_new").val(hash3)
        socket.emit("change_pass_event", {
            oldPass: $("#cef_old").val(),
            newPass: $("#cef_new").val(),
            re_newPass: $("#cef_re_new").val()
        })
    })
    socket.on("change_pass_err", data=>{
        $.notify(data, "error")
        $("#old_pass_val").val("")
        $("#new_pass_val").val("")
        $("#re_new_pass_val").val("")
    })
    socket.on("change_pass_event_success", data=>{
        $.notify(data, "success")
        $("#old_pass_val").val("")
        $("#new_pass_val").val("")
        $("#re_new_pass_val").val("")
        $("#change_pass_md").modal("hide")
    })
    socket.on("change_pass_confirm_error", data=>{
        $.notify(data, "error")
        $("#old_pass_val").val("")
        $("#new_pass_val").val("")
        $("#re_new_pass_val").val("")
        
    })
})
