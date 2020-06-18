$(document).ready(() => {
    const socket = io()
    socket.on('connect', () => {})
    //click notification
    $(".click_noti").click((e)=>{
        const targetId = $(e.target).data("nid")
        socket.emit("click-noti-event", targetId)  
    })
    socket.on("click-noti-success", data=>{
        $(`#watch_color_${data}`).removeClass("text-green")
        $(`#watch_color_${data}`).addClass("text-grey")
        $(`#noti_header_${data}`).remove()
    })
})
