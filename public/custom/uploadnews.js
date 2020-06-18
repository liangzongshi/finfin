$(document).ready(()=>{ 
    const socket = io()
    socket.on('connect', () => {})
    var siofu = new SocketIOFileUpload(socket);
    siofu.maxFileSize = 1024*1024*5
    siofu.listenOnSubmit(document.getElementById("btn_news_img"), document.getElementById("upload_img_news")); 
    siofu.addEventListener("start", function(event){
        var fileData  = document.getElementById("upload_img_news").files[0];
        var math = ["image/png", "image/jpg", "image/jpeg"];
        if($.inArray(fileData.type, math) === -1) {
            $.notify("File not valid, require PNG/JPG/JPEG", "error", 5);
            $("#upload_img_news").val(null)
        }else{
            socket.emit("uploading_news", "news")
        }
    });
    siofu.addEventListener("error", function(data){
        if (data.code === 1) {
            $.notify("Don't upload such a big file");
        }
    });
    $("#upload_img_news").change(function () {
        var fileData  = document.getElementById("upload_img_news").files[0];
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
                    "alt": "News"
                }).appendTo(previewImgBounce);
            };
            previewImgBounce.style.display = "block";
            fileReader.readAsDataURL(fileData)
        }
    })
    $("#btn_news_content").click(()=>{
        const title = $("#news_title").val()
        const des = $("#news_des").val()
        const content1 = $("#news_content1").val()
        const content2 = $("#news_content2").val()
        const content3 = $("#news_content3").val()
        const content4 = $("#news_content4").val()
        socket.emit("upload_news_content", {
            sub: title,
            description: des,
            content1: content1,
            content2: content2,
            content3: content3,
            content4: content4
        })
    })
    socket.on("upload_content_success", data=>{
        const newsId = data
        $("#news_text").addClass("d-none")
        $("#news_img").removeClass("d-none")
        $("#btn_news_img").data("nid", newsId) 
    })
    socket.on("upload_news_img_success", data=>{
        $("#news_text").removeClass("d-none")
        $("#news_img").addClass("d-none")
        $("#news_title").val("")
        $("#news_des").val("")
        $("#news_content1").val("")
        $("#news_content2").val("")
        $("#news_content3").val("")
        $("#news_content4").val("")
        $.notify("upload New Post success", "success")
        socket.emit("end_upload_news", {
            id: $("#btn_news_img").data("nid"),
            fileName: data
        })
    })
});