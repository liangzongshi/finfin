$(document).ready(()=>{ 
    const socket = io()
    socket.on('connect', () => {})
    $(".iputs").keyup(function () {
        if (this.value.length == this.maxLength) {
        $(this).next('.iputs').focus();
        }
    });
    $("#upload_kyc_front").change(function () {
        var fileData  = document.getElementById("upload_kyc_front").files[0];
        var math = ["image/png", "image/jpg", "image/jpeg"];
        var limit = 1048576; // 1MB
        if(typeof(FileReader) != "undefined"){
            var imagePreview1 = document.getElementById("preview_front_img1");
            while(imagePreview1.firstChild){
                imagePreview1.removeChild(imagePreview1.firstChild)
            }
            var fileReader = new FileReader();
            fileReader.onload = function(element) {
                $("<img>", {
                    "src": element.target.result,
                    "class": "preview_img_kyc1",
                    "width": "400",
                    "alt": "avatar"
                }).appendTo(imagePreview1);
            };
            imagePreview1.style.display = "block";
            fileReader.readAsDataURL(fileData)
        }
    })
    $("#upload_kyc_back").change(function () {
        var fileData1  = document.getElementById("upload_kyc_back").files[0];
        var math = ["image/png", "image/jpg", "image/jpeg"];
        var limit = 1048576; // 1MB
        if(typeof(FileReader) != "undefined"){
            var imagePreview2 = document.getElementById("preview_front_img2");
            while(imagePreview2.firstChild){
                imagePreview2.removeChild(imagePreview2.firstChild)
            }
            var fileReader = new FileReader();
            fileReader.onload = function(element) {
                $("<img>", {
                    "src": element.target.result,
                    "class": "preview_img_kyc2",
                    "width": "400",
                    "alt": "avatar"
                }).appendTo(imagePreview2);
            };
            imagePreview2.style.display = "block";
            fileReader.readAsDataURL(fileData1)
        }
    })
    $("#upload_kyc_selfie").change(function () {
        var fileData  = document.getElementById("upload_kyc_selfie").files[0];
        var math = ["image/png", "image/jpg", "image/jpeg"];
        var limit = 1048576; // 1MB
        if(typeof(FileReader) != "undefined"){
            var imagePreview3 = document.getElementById("preview_front_img3");
            while(imagePreview3.firstChild){
                imagePreview3.removeChild(imagePreview3.firstChild)
            }
            var fileReader = new FileReader();
            fileReader.onload = function(element) {
                $("<img>", {
                    "src": element.target.result,
                    "class": "preview_img_kyc3",
                    "width": "400",
                    "alt": "avatar"
                }).appendTo(imagePreview3);
            };
            imagePreview3.style.display = "block";
            fileReader.readAsDataURL(fileData)
        }
    })
    socket.on("upload_kyc_success", data=>{
        
            if(data < 3){
                setTimeout(function(){ 
                    document.getElementById(`kyc_${data+1}_btn`).style.display = 'inline';
                    document.getElementById(`stage${data+1}`).classList.add('d-none');
                    $(`#wizard ul li:nth-child(${data+2})`).removeClass("active")
                    $(`#wizard ul li:nth-child(${data+3})`).addClass("active")
                    $(`#step-${data +2}`).removeClass("d-block")
                    $(`#step-${data +3}`).addClass("d-block")
                }, 10000);
            } else {
                setTimeout(function(){
                    $("#content").html(
                        `
                        <ol class="breadcrumb float-xl-right">
                            <li class="breadcrumb-item"><a href="javascript:;">Profile</a></li>
                            <li class="breadcrumb-item active">KYC</li>
                        </ol>
                        <h1 class="page-header">KYC</small></h1>
                        <h3>You Completed KYC</h3>
                        `
                    )
                    socket.emit("kyc_complete", true)
                }, 20000);
            }
  
    })
    socket.on("upload_kyc_faile", data=>{
        setTimeout(function(){ 
            $("#notiFalse").modal("show")
            setTimeout(function(){
                $("#notiFalse").modal("hide")
            }, 3000)
            $(`#wizard ul li:nth-child(${data+2})`).removeClass("active")
            $(`#wizard ul li:nth-child(1)`).addClass("active")
            $(`#step-${data +2}`).removeClass("d-block")
            $("#step-1").removeClass("d-none")
            $("#upload_kyc_front").val("")
            $("#upload_kyc_back").val("")
            $("#upload_kyc_selfie").val("")
            document.getElementById(`kyc_1_btn`).style.display = 'inline';
            document.getElementById(`stage1`).classList.add('d-none');
            document.getElementById(`kyc_2_btn`).style.display = 'inline';
            document.getElementById(`stage2`).classList.add('d-none');
            document.getElementById(`kyc_3_btn`).style.display = 'inline';
            document.getElementById(`stage3`).classList.add('d-none');
            $(".preview_img_kyc1").attr("src", "../assets/default.png");
            $(".preview_img_kyc2").attr("src", "../assets/default.png");
            $(".preview_img_kyc3").attr("src", "../assets/default.png");
        }, 6000);
    })

    $("#kyc_info_btn").click((e)=>{
        e.preventDefault()
        const Fname = $("#firstname_kyc_page").val()
        const Lname = $("#lastname_kyc_page").val()
        const phone = $("#kyc_mobile_code").val() + "-" + $("#phone_kyc_page").val().replace(/^0+/, '')
        const gender = $("#male_kyc_page").val()
        const job = $("#job_kyc_page").val()
        const village = $("#village_kyc_page").val()
        const district = $("#district_kyc_page").val()
        const city = $("#city_kyc_page").val()
        const country = $("#country_kyc_page").val()
        const bd = $("#month_kyc_page").val() + "/" + $("#day_kyc_page").val() + "/" + $("#year_kyc_page").val()
        if(Fname === "" || Lname === "" || job === "" || "-" + $("#phone_kyc_page").val().replace(/^0+/, '') === "-" || district === "" || village === "" || city === ""){
            $(".notiInfo").removeClass("d-none")
            setTimeout(()=>{
                $(".notiInfo").addClass("d-none")
            }, 3000)
        } else {
            const infoKyc = {
                Fname: Fname,
                Lname: Lname,
                job: job,
                phone: phone,
                gender: gender,
                village: village,
                district: district,
                city: city,
                country: country,
                bd: bd
            }
            socket.emit("add_kyc_info_event", infoKyc)
        }
    })
    $("#kyc_finance_btn").click((e)=>{
        e.preventDefault()
        const Saving = $("#saving_kyc_page").val()
        const Fiat = $("#fiat_kyc_page").val()
        const Fixed = $("#fixed_kyc_page").val()
        if(Saving === "" || Fiat === "" || Fixed === ""){
            $(".notiInfo").removeClass("d-none")
            setTimeout(()=>{
                $(".notiInfo").addClass("d-none")
            }, 3000)
        } else {
            const infoKycFinance = parseInt(Saving) + parseInt(Fiat) + parseInt(Fixed)
            console.log(infoKycFinance)
            socket.emit("add_kyc_finance_event", infoKycFinance)
        }
    })
    socket.on("step2_success", data=>{
        $("#wizard ul li").removeClass("active")
        $("#wizard ul li:nth-child(3)").addClass("active")
        $("#step-2").removeClass("d-block")
        $("#step-3").addClass("d-block")
    })
    socket.on("step1_success", data=>{
        $("#wizard ul li").removeClass("active")
        $("#wizard ul li:nth-child(2)").addClass("active")
        $("#step-1").addClass("d-none")
        $("#step-2").addClass("d-block")
    })
 
});