$(document).ready(() => {
    const validateEmail = (email) => {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email)
    }
    const socket = io()
    socket.on('connect', () => {})
    $("#recover").click((e)=>{
        e.preventDefault()
        const email_recover = $("#email_recover").val()
        if(validateEmail(email_recover)){
            socket.emit("recover_password", email_recover)
            $("#form_recover").addClass("d-none")
            $("#all_recover").prepend(`
                <div class="form-group m-b-30" id="text_recover">
                    <h5>We sent the link to Email <span class="text-green">${email_recover}</span>, please check Email to recover password</h5>
                </div>
            `)
        }else{
            $.notify("Email Is Invalid", "error")
            $("#email_recover").val("")
        }
    })
})