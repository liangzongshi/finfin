$(document).ready(()=>{ 
    const socket = io()
    socket.on('connect', () => {})
    //deposit
    $("#deposit_btc_setting").change(()=>{  
        if($("#deposit_btc_setting").val() == "on"){
            $("#deposit_btc_setting").prop("checked", true)
        }else{
            $("#deposit_btc_setting").prop("checked", false)
        }
        $("#deposit_btc_setting_md").modal("show")
    })
    $("#btn_deposit_btc_setting_md").click(()=>{
        if($("#deposit_btc_setting").val() == "on"){
            $("#deposit_btc_setting").val("off")
        }else{
            $("#deposit_btc_setting").val("on")
        }
        socket.emit("change_deposit_btc_setting", $("#deposit_btc_setting").val())
        $("#deposit_btc_setting_md").modal("hide")
    })
    socket.on("change_deposit_btc_setting_success", (data)=>{
        if(data == false){
            $("#deposit_btc_setting").prop("checked", false)
            $("#status_deposit_btc_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#deposit_btc_setting").prop("checked", true)
            $("#status_deposit_btc_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    
    $("#deposit_eth_setting").change(()=>{  
        if($("#deposit_eth_setting").val() == "on"){
            $("#deposit_eth_setting").prop("checked", true)
        }else{
            $("#deposit_eth_setting").prop("checked", false)
        }
        $("#deposit_eth_setting_md").modal("show")
    })
    $("#btn_deposit_eth_setting_md").click(()=>{
        if($("#deposit_eth_setting").val() == "on"){
            $("#deposit_eth_setting").val("off")
        }else{
            $("#deposit_eth_setting").val("on")
        }
        socket.emit("change_deposit_eth_setting", $("#deposit_eth_setting").val())
        $("#deposit_eth_setting_md").modal("hide")
    })
    socket.on("change_deposit_eth_setting_success", (data)=>{
        if(data == false){
            $("#deposit_eth_setting").prop("checked", false)
            $("#status_deposit_eth_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#deposit_eth_setting").prop("checked", true)
            $("#status_deposit_eth_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })

    $("#deposit_bnb_setting").change(()=>{  
        if($("#deposit_bnb_setting").val() == "on"){
            $("#deposit_bnb_setting").prop("checked", true)
        }else{
            $("#deposit_bnb_setting").prop("checked", false)
        }
        $("#deposit_bnb_setting_md").modal("show")
    })
    $("#btn_deposit_bnb_setting_md").click(()=>{
        if($("#deposit_bnb_setting").val() == "on"){
            $("#deposit_bnb_setting").val("off")
        }else{
            $("#deposit_bnb_setting").val("on")
        }
        socket.emit("change_deposit_bnb_setting", $("#deposit_bnb_setting").val())
        $("#deposit_bnb_setting_md").modal("hide")
    })
    socket.on("change_deposit_bnb_setting_success", (data)=>{
        if(data == false){
            $("#deposit_bnb_setting").prop("checked", false)
            $("#status_deposit_bnb_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#deposit_bnb_setting").prop("checked", true)
            $("#status_deposit_bnb_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })

    $("#deposit_usdt_setting").change(()=>{  
        if($("#deposit_usdt_setting").val() == "on"){
            $("#deposit_usdt_setting").prop("checked", true)
        }else{
            $("#deposit_usdt_setting").prop("checked", false)
        }
        $("#deposit_usdt_setting_md").modal("show")
    })
    $("#btn_deposit_usdt_setting_md").click(()=>{
        if($("#deposit_usdt_setting").val() == "on"){
            $("#deposit_usdt_setting").val("off")
        }else{
            $("#deposit_usdt_setting").val("on")
        }
        socket.emit("change_deposit_usdt_setting", $("#deposit_usdt_setting").val())
        $("#deposit_usdt_setting_md").modal("hide")
    })
    socket.on("change_deposit_usdt_setting_success", (data)=>{
        if(data == false){
            $("#deposit_usdt_setting").prop("checked", false)
            $("#status_deposit_usdt_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#deposit_usdt_setting").prop("checked", true)
            $("#status_deposit_usdt_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })

    $("#deposit_fft_setting").change(()=>{  
        if($("#deposit_fft_setting").val() == "on"){
            $("#deposit_fft_setting").prop("checked", true)
        }else{
            $("#deposit_fft_setting").prop("checked", false)
        }
        $("#deposit_fft_setting_md").modal("show")
    })
    $("#btn_deposit_fft_setting_md").click(()=>{
        if($("#deposit_fft_setting").val() == "on"){
            $("#deposit_fft_setting").val("off")
        }else{
            $("#deposit_fft_setting").val("on")
        }
        socket.emit("change_deposit_fft_setting", $("#deposit_fft_setting").val())
        $("#deposit_fft_setting_md").modal("hide")
    })
    socket.on("change_deposit_fft_setting_success", (data)=>{
        if(data == false){
            $("#deposit_fft_setting").prop("checked", false)
            $("#status_deposit_fft_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#deposit_fft_setting").prop("checked", true)
            $("#status_deposit_fft_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //withdraw
    $("#withdraw_btc_setting").change(()=>{  
        if($("#withdraw_btc_setting").val() == "on"){
            $("#withdraw_btc_setting").prop("checked", true)
        }else{
            $("#withdraw_btc_setting").prop("checked", false)
        }
        $("#withdraw_btc_setting_md").modal("show")
    })
    $("#btn_withdraw_btc_setting_md").click(()=>{
        if($("#withdraw_btc_setting").val() == "on"){
            $("#withdraw_btc_setting").val("off")
        }else{
            $("#withdraw_btc_setting").val("on")
        }
        socket.emit("change_withdraw_btc_setting", $("#withdraw_btc_setting").val())
        $("#withdraw_btc_setting_md").modal("hide")
    })
    socket.on("change_withdraw_btc_setting_success", (data)=>{
        if(data == false){
            $("#withdraw_btc_setting").prop("checked", false)
            $("#status_withdraw_btc_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#withdraw_btc_setting").prop("checked", true)
            $("#status_withdraw_btc_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })

    $("#withdraw_eth_setting").change(()=>{  
        if($("#withdraw_eth_setting").val() == "on"){
            $("#withdraw_eth_setting").prop("checked", true)
        }else{
            $("#withdraw_eth_setting").prop("checked", false)
        }
        $("#withdraw_eth_setting_md").modal("show")
    })
    $("#btn_withdraw_eth_setting_md").click(()=>{
        if($("#withdraw_eth_setting").val() == "on"){
            $("#withdraw_eth_setting").val("off")
        }else{
            $("#withdraw_eth_setting").val("on")
        }
        socket.emit("change_withdraw_eth_setting", $("#withdraw_eth_setting").val())
        $("#withdraw_eth_setting_md").modal("hide")
    })
    socket.on("change_withdraw_eth_setting_success", (data)=>{
        if(data == false){
            $("#withdraw_eth_setting").prop("checked", false)
            $("#status_withdraw_eth_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#withdraw_eth_setting").prop("checked", true)
            $("#status_withdraw_eth_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })

    $("#withdraw_bnb_setting").change(()=>{  
        if($("#withdraw_bnb_setting").val() == "on"){
            $("#withdraw_bnb_setting").prop("checked", true)
        }else{
            $("#withdraw_bnb_setting").prop("checked", false)
        }
        $("#withdraw_bnb_setting_md").modal("show")
    })
    $("#btn_withdraw_bnb_setting_md").click(()=>{
        if($("#withdraw_bnb_setting").val() == "on"){
            $("#withdraw_bnb_setting").val("off")
        }else{
            $("#withdraw_bnb_setting").val("on")
        }
        socket.emit("change_withdraw_bnb_setting", $("#withdraw_bnb_setting").val())
        $("#withdraw_bnb_setting_md").modal("hide")
    })
    socket.on("change_withdraw_bnb_setting_success", (data)=>{
        if(data == false){
            $("#withdraw_bnb_setting").prop("checked", false)
            $("#status_withdraw_bnb_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#withdraw_bnb_setting").prop("checked", true)
            $("#status_withdraw_bnb_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })

    $("#withdraw_usdt_setting").change(()=>{  
        if($("#withdraw_usdt_setting").val() == "on"){
            $("#withdraw_usdt_setting").prop("checked", true)
        }else{
            $("#withdraw_usdt_setting").prop("checked", false)
        }
        $("#withdraw_usdt_setting_md").modal("show")
    })
    $("#btn_withdraw_usdt_setting_md").click(()=>{
        if($("#withdraw_usdt_setting").val() == "on"){
            $("#withdraw_usdt_setting").val("off")
        }else{
            $("#withdraw_usdt_setting").val("on")
        }
        socket.emit("change_withdraw_usdt_setting", $("#withdraw_usdt_setting").val())
        $("#withdraw_usdt_setting_md").modal("hide")
    })
    socket.on("change_withdraw_usdt_setting_success", (data)=>{
        if(data == false){
            $("#withdraw_usdt_setting").prop("checked", false)
            $("#status_withdraw_usdt_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#withdraw_usdt_setting").prop("checked", true)
            $("#status_withdraw_usdt_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })

    $("#withdraw_fft_setting").change(()=>{  
        if($("#withdraw_fft_setting").val() == "on"){
            $("#withdraw_fft_setting").prop("checked", true)
        }else{
            $("#withdraw_fft_setting").prop("checked", false)
        }
        $("#withdraw_fft_setting_md").modal("show")
    })
    $("#btn_withdraw_fft_setting_md").click(()=>{
        if($("#withdraw_fft_setting").val() == "on"){
            $("#withdraw_fft_setting").val("off")
        }else{
            $("#withdraw_fft_setting").val("on")
        }
        socket.emit("change_withdraw_fft_setting", $("#withdraw_fft_setting").val())
        $("#withdraw_fft_setting_md").modal("hide")
    })
    socket.on("change_withdraw_fft_setting_success", (data)=>{
        if(data == false){
            $("#withdraw_fft_setting").prop("checked", false)
            $("#status_withdraw_fft_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#withdraw_fft_setting").prop("checked", true)
            $("#status_withdraw_fft_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //login
    $("#login_setting").change(()=>{  
        if($("#login_setting").val() == "on"){
            $("#login_setting").prop("checked", true)
        }else{
            $("#login_setting").prop("checked", false)
        }
        $("#login_setting_md").modal("show")
    })
    $("#btn_login_setting_md").click(()=>{
        if($("#login_setting").val() == "on"){
            $("#login_setting").val("off")
        }else{
            $("#login_setting").val("on")
        }
        socket.emit("change_login_setting", $("#login_setting").val())
        $("#login_setting_md").modal("hide")
    })
    socket.on("change_login_setting_success", (data)=>{
        if(data == false){
            $("#login_setting").prop("checked", false)
            $("#status_login_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#login_setting").prop("checked", true)
            $("#status_login_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //register
    $("#register_setting").change(()=>{  
        if($("#register_setting").val() == "on"){
            $("#register_setting").prop("checked", true)
        }else{
            $("#register_setting").prop("checked", false)
        }
        $("#register_setting_md").modal("show")
    })
    $("#btn_register_setting_md").click(()=>{
        if($("#register_setting").val() == "on"){
            $("#register_setting").val("off")
        }else{
            $("#register_setting").val("on")
        }
        socket.emit("change_register_setting", $("#register_setting").val())
        $("#register_setting_md").modal("hide")
    })
    socket.on("change_register_setting_success", (data)=>{
        if(data == false){
            $("#register_setting").prop("checked", false)
            $("#status_register_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#register_setting").prop("checked", true)
            $("#status_register_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //swap
    $("#swap_setting").change(()=>{  
        if($("#swap_setting").val() == "on"){
            $("#swap_setting").prop("checked", true)
        }else{
            $("#swap_setting").prop("checked", false)
        }
        $("#swap_setting_md").modal("show")
    })
    $("#btn_swap_setting_md").click(()=>{
        if($("#swap_setting").val() == "on"){
            $("#swap_setting").val("off")
        }else{
            $("#swap_setting").val("on")
        }
        socket.emit("change_swap_setting", $("#swap_setting").val())
        $("#swap_setting_md").modal("hide")
    })
    socket.on("change_swap_setting_success", (data)=>{
        if(data == false){
            $("#swap_setting").prop("checked", false)
            $("#status_swap_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#swap_setting").prop("checked", true)
            $("#status_swap_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //hft
    $("#hft_setting").change(()=>{  
        if($("#hft_setting").val() == "on"){
            $("#hft_setting").prop("checked", true)
        }else{
            $("#hft_setting").prop("checked", false)
        }
        $("#hft_setting_md").modal("show")
    })
    $("#btn_hft_setting_md").click(()=>{
        if($("#hft_setting").val() == "on"){
            $("#hft_setting").val("off")
        }else{
            $("#hft_setting").val("on")
        }
        socket.emit("change_hft_setting", $("#hft_setting").val())
        $("#hft_setting_md").modal("hide")
    })
    socket.on("change_hft_setting_success", (data)=>{
        if(data == false){
            $("#hft_setting").prop("checked", false)
            $("#status_hft_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#hft_setting").prop("checked", true)
            $("#status_hft_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //airdrop
    $("#airdrop_setting").change(()=>{  
        if($("#airdrop_setting").val() == "on"){
            $("#airdrop_setting").prop("checked", true)
        }else{
            $("#airdrop_setting").prop("checked", false)
        }
        $("#airdrop_setting_md").modal("show")
    })
    $("#btn_airdrop_setting_md").click(()=>{
        if($("#airdrop_setting").val() == "on"){
            $("#airdrop_setting").val("off")
        }else{
            $("#airdrop_setting").val("on")
        }
        socket.emit("change_airdrop_setting", $("#airdrop_setting").val())
        $("#airdrop_setting_md").modal("hide")
    })
    socket.on("change_airdrop_setting_success", (data)=>{
        if(data == false){
            $("#airdrop_setting").prop("checked", false)
            $("#status_airdrop_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#airdrop_setting").prop("checked", true)
            $("#status_airdrop_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //web
    $("#web_setting").change(()=>{  
        if($("#web_setting").val() == "on"){
            $("#web_setting").prop("checked", true)
        }else{
            $("#web_setting").prop("checked", false)
        }
        $("#web_setting_md").modal("show")
    })
    $("#btn_web_setting_md").click(()=>{
        if($("#web_setting").val() == "on"){
            $("#web_setting").val("off")
        }else{
            $("#web_setting").val("on")
        }
        socket.emit("change_web_setting", $("#web_setting").val())
        $("#web_setting_md").modal("hide")
    })
    socket.on("change_web_setting_success", (data)=>{
        if(data == false){
            $("#web_setting").prop("checked", false)
            $("#status_web_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#web_setting").prop("checked", true)
            $("#status_web_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //dashboard
    $("#dashboard_setting").change(()=>{  
        if($("#dashboard_setting").val() == "on"){
            $("#dashboard_setting").prop("checked", true)
        }else{
            $("#dashboard_setting").prop("checked", false)
        }
        $("#dashboard_setting_md").modal("show")
    })
    $("#btn_dashboard_setting_md").click(()=>{
        if($("#dashboard_setting").val() == "on"){
            $("#dashboard_setting").val("off")
        }else{
            $("#dashboard_setting").val("on")
        }
        socket.emit("change_dashboard_setting", $("#dashboard_setting").val())
        $("#dashboard_setting_md").modal("hide")
    })
    socket.on("change_dashboard_setting_success", (data)=>{
        if(data == false){
            $("#dashboard_setting").prop("checked", false)
            $("#status_dashboard_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#dashboard_setting").prop("checked", true)
            $("#status_dashboard_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
    //delete
    $("#delete_setting").change(()=>{  
        if($("#delete_setting").val() == "on"){
            $("#delete_setting").prop("checked", true)
        }else{
            $("#delete_setting").prop("checked", false)
        }
        $("#delete_setting_md").modal("show")
    })
    $("#btn_delete_setting_md").click(()=>{
        if($("#delete_setting").val() == "on"){
            $("#delete_setting").val("off")
        }else{
            $("#delete_setting").val("on")
        }
        socket.emit("change_delete_setting", $("#delete_setting").val())
        $("#delete_setting_md").modal("hide")
    })
    socket.on("change_delete_setting_success", (data)=>{
        if(data == false){
            $("#delete_setting").prop("checked", false)
            $("#status_delete_setting").html("Disabled").removeClass("text-green").addClass("text-danger")
        }else{
            $("#delete_setting").prop("checked", true)
            $("#status_delete_setting").html("Enabled").removeClass("text-danger").addClass("text-green")
        }
    })
});