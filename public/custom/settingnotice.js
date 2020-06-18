$(document).ready(()=>{ 
    const socket = io()
    socket.on('connect', () => {})
    //phone
    $("#phone_notice_setting").change(()=>{  
        if($("#phone_notice_setting").val() == "on"){
            $("#phone_notice_setting").prop("checked", true)
        }else{
            $("#phone_notice_setting").prop("checked", false)
        }
        $("#phone_notice_setting_md").modal("show")
    })
    $("#btn_phone_notice_setting_md").click(()=>{
        if($("#phone_notice_setting").val() == "on"){
            $("#phone_notice_setting").val("off")
        }else{
            $("#phone_notice_setting").val("on")
        }
        socket.emit("change_phone_notice_setting", $("#phone_notice_setting").val())
        $("#phone_notice_setting_md").modal("hide")
    })
    socket.on("change_phone_notice_setting_success", (data)=>{
        if(data == false){
            $("#phone_notice_setting").prop("checked", false)
            $("#status_phone_notice_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#phone_notice_setting").prop("checked", true)
            $("#status_phone_notice_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //messenger
    $("#messenger_notice_setting").change(()=>{  
        if($("#messenger_notice_setting").val() == "on"){
            $("#messenger_notice_setting").prop("checked", true)
        }else{
            $("#messenger_notice_setting").prop("checked", false)
        }
        $("#messenger_notice_setting_md").modal("show")
    })
    $("#btn_messenger_notice_setting_md").click(()=>{
        if($("#messenger_notice_setting").val() == "on"){
            $("#messenger_notice_setting").val("off")
        }else{
            $("#messenger_notice_setting").val("on")
        }
        socket.emit("change_messenger_notice_setting", $("#messenger_notice_setting").val())
        $("#messenger_notice_setting_md").modal("hide")
    })
    socket.on("change_messenger_notice_setting_success", (data)=>{
        if(data == false){
            $("#messenger_notice_setting").prop("checked", false)
            $("#status_messenger_notice_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#messenger_notice_setting").prop("checked", true)
            $("#status_messenger_notice_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //telegram
    $("#telegram_notice_setting").change(()=>{  
        if($("#telegram_notice_setting").val() == "on"){
            $("#telegram_notice_setting").prop("checked", true)
        }else{
            $("#telegram_notice_setting").prop("checked", false)
        }
        $("#telegram_notice_setting_md").modal("show")
    })
    $("#btn_telegram_notice_setting_md").click(()=>{
        if($("#telegram_notice_setting").val() == "on"){
            $("#telegram_notice_setting").val("off")
        }else{
            $("#telegram_notice_setting").val("on")
        }
        socket.emit("change_telegram_notice_setting", $("#telegram_notice_setting").val())
        $("#telegram_notice_setting_md").modal("hide")
    })
    socket.on("change_telegram_notice_setting_success", (data)=>{
        if(data == false){
            $("#telegram_notice_setting").prop("checked", false)
            $("#status_telegram_notice_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#telegram_notice_setting").prop("checked", true)
            $("#status_telegram_notice_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //website
    $("#website_notice_setting").change(()=>{  
        if($("#website_notice_setting").val() == "on"){
            $("#website_notice_setting").prop("checked", true)
        }else{
            $("#website_notice_setting").prop("checked", false)
        }
        $("#website_notice_setting_md").modal("show")
    })
    $("#btn_website_notice_setting_md").click(()=>{
        if($("#website_notice_setting").val() == "on"){
            $("#website_notice_setting").val("off")
        }else{
            $("#website_notice_setting").val("on")
        }
        socket.emit("change_website_notice_setting", $("#website_notice_setting").val())
        $("#website_notice_setting_md").modal("hide")
    })
    socket.on("change_website_notice_setting_success", (data)=>{
        if(data == false){
            $("#website_notice_setting").prop("checked", false)
            $("#status_website_notice_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#website_notice_setting").prop("checked", true)
            $("#status_website_notice_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
   
});