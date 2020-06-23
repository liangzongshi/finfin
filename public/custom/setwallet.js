$(document).ready(()=>{ 
    const socket = io()
    socket.on('connect', () => {})
    //T Wallet
    $("#btn_t_wallet_md").click(()=>{  
        $("#t_wallet_md").modal("show")
        $(`<h5 class="text-white">${$("#t_wallet_address").val()}</h5>`).appendTo($("#append_t_wallet"))
    })
    $("#btn_t_wallet_submit_md").click(()=>{
        socket.emit("change_t_wallet", {type: $("#t_wallet_type").val(), address: $("#t_wallet_address").val()})
        $("#t_wallet_md").modal("hide")
    })
    socket.on("change_t_wallet_success", (data)=>{
        $("#t_wallet_address").val("")
        $.notify("Change T Wallet Address Success", "success")
    })
    //M Wallet
    $("#btn_m_wallet_md").click(()=>{  
        $("#m_wallet_md").modal("show")
        $(`<h5 class="text-white">${$("#m_wallet_address").val()}</h5>`).appendTo($("#append_m_wallet"))
    })
    $("#btn_m_wallet_submit_md").click(()=>{
        socket.emit("change_m_wallet", {type: $("#m_wallet_type").val(), address: $("#m_wallet_address").val})
        $("#m_wallet_md").modal("hide")
    })
    socket.on("change_m_wallet_success", (data)=>{
        $("#m_wallet_address").val("")
        $.notify("Change M Wallet Address Success", "success")
    })
    //T Wallet
    $("#btn_l_wallet_md").click(()=>{  
        $("#l_wallet_md").modal("show")
        $(`<h5 class="text-white">${$("#l_wallet_address").val()}</h5>`).appendTo($("#append_l_wallet"))
    })
    $("#btn_l_wallet_submit_md").click(()=>{
        socket.emit("change_l_wallet", {type:$("#l_wallet_type").val(), address: $("#l_wallet_address").val()})
        $("#l_wallet_md").modal("hide")
    })
    socket.on("change_l_wallet_success", (data)=>{
        $("#l_wallet_address").val("")
        $.notify("Change L Wallet Address Success", "success")
    })
   
});