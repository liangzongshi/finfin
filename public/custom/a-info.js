$(document).ready(() => {
    const socket = io()
    socket.on('connect', () => {})

    $('a.submit_kyc').click((e) => {
        e.preventDefault()
        const targetId = $(e.target).data("uid")
        socket.emit("a_submit_kyc", targetId);
    })

    socket.on("a_submit_kyc_success", data => {
        $(`a[data-uid=${data}]`).html(`
            <i class="fa fa-check"></i> KYC
        `).removeClass("btn-warning").addClass("btn-success").addClass("disabled");
    })
    $('a.refuse_kyc').click((e) => {
        e.preventDefault()
        const targetId = $(e.target).data("rid")
        socket.emit("a_refuse_kyc", targetId);
    })

    socket.on("a_refuse_kyc_success", data => {
        $(`a[data-uid=${data}]`).html(`
            <i class="fa fa-window-close"></i> KYC
        `).removeClass("btn-warning").addClass("btn-danger").addClass("disabled");
        $(`a[data-rid=${data}]`).remove();
    })

})
