$(document).ready(() => {
    const socket = io()
    $("input[name='cef']").hide()
    $("input[name='login_password']").change(() => {
        const email = $("input[name='login_email']").val()
        const password = $("input[name='login_password']").val()
        const hash = CryptoJS.MD5(password)
        $("input[name='cef']").val(hash)
        socket.emit('check_email_login', {
            email: email,
            hash_password: $("input[name='cef']").val()
        })
    })

    socket.on('require_tfa', data => {
        $('#check_login').html(data)
        $("input[name='tfa']").prop("required", true)
    })

    $("input[name='tfa']").change(() => {
        const email = $("input[name='login_email']").val()
        const tfa = $("input[name='tfa']").val()
        if (tfa.length !== 6){
            $('#check_login').html('* The entered code is not available')
        } else {
            socket.emit('check_tfa', {
                email: email,
                tfa: tfa
            })
        }
    })

    socket.on('exist_login_email', data => {
        $('#check_login').html(data)
        if (data == ''){
            $('#login').prop("disabled", false)
        }
    })
})