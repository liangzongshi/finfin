$(document).ready(()=>{ 
    const socket = io()
    socket.on('connect', () => {})
    var siofu = new SocketIOFileUpload(socket);
    console.log(siofu);
    siofu.listenOnSubmit(document.getElementById("upload_avatar_btn"), document.getElementById("upload_avatar_input")); 
    // Do something on upload progress:
    siofu.addEventListener("start", function(event){
        console.log(event)
        socket.emit("uploading_avatar", "avatar")
    });
    socket.on("upload_avatar_success", data=>{
        $("#upload_file_md").modal("hide")
        $("#avatar_profile").attr("src", `../assets/avatars/${data}`)
        $("#logo_sidebar").attr("src", `../assets/avatars/${data}`)
        $("#avatar_header").attr("src", `../assets/avatars/${data}`)
    })
    $("#upload_avatar_input").change(function () {
        var fileData  = document.getElementById("upload_avatar_input").files[0];
        var math = ["image/png", "image/jpg", "image/jpeg"];
        var limit = 1048576; // 1MB
        if(typeof(FileReader) != "undefined"){
            var imagePreview2 = document.getElementById("previewAvatarBounce");
            while(imagePreview2.firstChild){
                imagePreview2.removeChild(imagePreview2.firstChild)
            }
            var fileReader = new FileReader();
            fileReader.onload = function(element) {
                $("<img>", {
                    "src": element.target.result,
                    "id": "previewAvatar",
                    "width": "200",
                    "alt": "avatar"
                }).appendTo(previewAvatarBounce);
            };
            previewAvatarBounce.style.display = "block";
            fileReader.readAsDataURL(fileData)
        }
    })
 
});