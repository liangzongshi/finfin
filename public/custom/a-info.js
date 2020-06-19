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

})
