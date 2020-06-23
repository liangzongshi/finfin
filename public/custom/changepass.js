$(document).ready(() => {
    const socket = io()
    socket.on('connect', () => {})
    $("#re_pass_recover").change(() => {
        var pass = $("#pass_recover").val()
        var re_pass = $("#re_pass_recover").val()
        if (re_pass == pass){
            $("#check_pass").html('Password matched')
            $('#change_recover').attr('disabled', false)
            setTimeout(()=>{
                $("#check_pass").html('')
            }, 3000)
        } else {
            $("#check_pass").html('Password does not match')
            setTimeout(()=>{
                $("#check_pass").html('')
            }, 3000)
            $("#pass_recover").val("")
            $("#re_pass_recover").val("")
        }
    })
    $('#change_recover').click((e)=>{
        e.preventDefault()
        const pass = $("#pass_recover").val()
        var password = CryptoJS.MD5(pass)
        $("#cef").val(password)
        password = $("#cef").val()
        const userId = $("#change_recover").data("id")
        socket.emit("change_password_recover", {
            password: password,
            userId: userId
        })
    });
    socket.on("change_password_recover_success", data=>{
        $.notify(data, "success")
        $("#form_recover").addClass("d-none")
        $("#all_recover").prepend(`
                <div class="form-group m-b-30" id="text_recover">
                    <a class="btn btn-primary btn-block btn-lg" href="/login">Sign In</a>
                </div>
            `)
    })
    socket.on("user_not_found", data=>{
        $.notify(data, "error")
        $("#pass_recover").val("")
        $("#re_pass_recover").val("")
    })
})