$(document).ready(()=>{ 
    const socket = io()
    socket.on('connect', () => {})
    var siofu = new SocketIOFileUpload(socket);
    siofu.maxFileSize = 5*1024*1024
    siofu.listenOnSubmit(document.getElementById("btn_event_img"), document.getElementById("upload_img_event")); 
    siofu.addEventListener("start", function(event){
        var fileData  = document.getElementById("upload_img_event").files[0];
        var math = ["image/png", "image/jpg", "image/jpeg"];
        if($.inArray(fileData.type, math) === -1) {
            $.notify("File not valid, require PNG/JPG/JPEG", "error", 5);
            $("#upload_img_news").val(null)
        }else{
            socket.emit("uploading_event", "event")
        }
        
    });
    siofu.addEventListener("error", function(data){
        if (data.code === 1) {
            $.notify("Don't upload such a big file");
        }
    });
    $("#upload_img_event").change(function () {
        var fileData  = document.getElementById("upload_img_event").files[0];
        if(typeof(FileReader) != "undefined"){
            var imagePreview = document.getElementById("previewImgBounce");
            while(imagePreview.firstChild){
                imagePreview.removeChild(imagePreview.firstChild)
            }
            var fileReader = new FileReader();
            fileReader.onload = function(element) {
                $("<img>", {
                    "src": element.target.result,
                    "id": "previewImg",
                    "width": "400",
                    "alt": "Event"
                }).appendTo(previewImgBounce);
            };
            previewImgBounce.style.display = "block";
            fileReader.readAsDataURL(fileData)
        }
    })
    $("#btn_event_content").click(()=>{
        const title = $("#event_title").val()
        const des = $("#event_des").val()
        const content1 = $("#event_content1").val()
        const content2 = $("#event_content2").val()
        const content3 = $("#event_content3").val()
        const content4 = $("#event_content4").val()
        socket.emit("upload_event_content", {
            title: title,
            description: des,
            content1: content1,
            content2: content2,
            content3: content3,
            content4: content4
        })
    })
    socket.on("upload_event_content_success", data=>{
        const eventId = data
        $("#event_text").addClass("d-none")
        $("#event_img").removeClass("d-none")
        $("#btn_event_img").data("eid", eventId) 
    })
    socket.on("upload_event_img_success", data=>{
        $("#event_text").removeClass("d-none")
        $("#event_img").addClass("d-none")
        $.notify("upload Event success", "success")
        socket.emit("end_upload_event", {
            id: $("#btn_event_img").data("eid"),
            fileName: data
        })
    })
    $(".remove-event").click((e)=>{
        const targetId = $(e.target).data("eid")
        socket.emit("remove_event", targetId)
    })
    socket.on("remove_event_success", data=>{
        $.notify("Delete Event success", "warn")
        $("#" + data).remove()
    })
});