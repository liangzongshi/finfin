$(document).ready(()=>{ 
    const socket = io()
    socket.on('connect', () => {})
    $("#helper_submit_btn").click((e)=>{
        e.preventDefault()
        $("#helper_submit_btn").addClass("d-none")
        $("#helper_fake_btn").addClass("d-block")
        setTimeout(()=>{
            $("#helper_submit_btn").removeClass("d-none")
            $("#helper_fake_btn").removeClass("d-block")
        }, 10000)
        const sub = $("#helper_subject").val()
        const details = $("#helper_details").val()
        if(sub === "" || details === ""){
            $(".helper_check").removeClass("d-none")
            $("#helper_subject").val("")
            $("#helper_details").val("")
            setTimeout(()=>{
                $(".helper_check").addClass("d-none")
            }, 3000)
        }else{  
            socket.emit("send_helper_start", {
                    sub: sub,
                    details: details
                }) 
             
        }
    })
    socket.on("send_helper_success", data=>{
        $("#event_helper_md").modal("show")
        setTimeout(()=>{
            $("#event_helper_md").modal("hide")
        }, 3000)
        $("#helper_subject").val("")
        $("#helper_details").val("")
    })
});