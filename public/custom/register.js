const validateEmail = (email) => {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email)
}

$(document).ready(() => {
    const socket = io()
    socket.on('connect', () => {})
    
    $('#send').click(() => {
        const email = $("input[name='email']").val()
        if (validateEmail(email)) {
            socket.emit('verify_email', email)
            $("#check_register").html('Check your inbox for the verification code')
            setTimeout(()=>{
                $("#check_register").html('')
            },5000)
            $('#send').prop("disabled", true)
            var start = 50
            var count = setInterval(() => {
                start--
                var s = (start < 10) ? '0' + String(start) : start 
                $('#send').html(`<span style="color:white">&nbsp;&nbsp;${s}&nbsp;&nbsp;</span>`)
                if (start == 0){
                    clearInterval(count)
                    $('#send').html("Send")
                    $('#send').prop("disabled", false)
                }
            },1000)
        } else {
            $("#check_register").html('Email is not valid')
            setTimeout(()=>{
                $("#check_register").html('')
            },5000)
        }
    })

    socket.on('exist_email', data => {
        $("#check_register").html(data)
        setTimeout(()=>{
            $("#check_register").html('')
        },5000)
    })

    $("input[name='code']").change(() => {
        if ( $("input[name='code']").val().length == 6 ){
            $("#check_register").html('')
            socket.emit('verify_code', $("input[name='code']").val())
        } else {
            $("#check_register").html('The verification code is not valid')
        }
    })

    socket.on('check_verify_code', data => {
        $("#check_register").html(data)
    })

    $("input[name='password']").change(() => {
        var pass = $("input[name='password']").val()
        if (pass.length < 8){
            $("#check_password").html('The password is too short')
        } else {
            $("#check_password").html('')
        }
    })

    $("input[name='re_password']").change(() => {
        var pass = $("input[name='password']").val()
        var re_pass = $("input[name='re_password']").val()
        if (re_pass == pass){
            $("#check_repassword").html('Password matched')
        } else {
            $("#check_repassword").html('Password does not match')
        }
    })

    $("input[name='referral']").change(() => {
        var ref = $("input[name='referral']").val()
        if (ref.length == 0 || ref.length == 6){
            $("#check_ref").html('')
        } else {
            $("#check_ref").html('The referral code is not valid')
        }
    })

    $('#agreement_checkbox').change(() => {
        if ( $('#agreement_checkbox')[0].checked ){
            var code =  $("#check_register").html()
            var repass = $("#check_repassword").html()
            var ref = $("#check_ref").html()
            if (code == 'Email verification successful' && repass == 'Password matched' && ref == ''){
                var hash = CryptoJS.MD5($("input[name='re_password']").val())
                $("input[name='re_password']").val(hash)
                $('#signup').prop("disabled", false)
            }
        }
    })
})