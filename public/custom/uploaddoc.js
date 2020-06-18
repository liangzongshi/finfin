$(document).ready(()=>{ 
    const socket = io()
    socket.on('connect', () => {})
    var siofu = new SocketIOFileUpload(socket);
    siofu.listenOnSubmit(document.getElementById("btn_docs_file"), document.getElementById("upload_file_docs")); 
    siofu.addEventListener("start", function(event){
        socket.emit("uploading_docs", "doc")
    });

    $("#btn_docs_content").click(()=>{
        
        const sub = $("#docs_sub").val()
        const type = $("#docs_type").val()
        if(sub != ""){
            socket.emit("upload_docs_content", {
                sub: sub,
                typeDoc: type
            })
        } else {
            $(".upload_doc_check").removeClass("d-none")
            setTimeout(()=>{
                $(".upload_doc_check").addClass("d-none")
            }, 3000)
        }
        
    })
    socket.on("upload_docs_content_success", data=>{
        const docId = data
        $("#docs_text").addClass("d-none")
        $("#docs_file").removeClass("d-none")
        $("#btn_docs_file").data("dfid", docId) 
    })
    socket.on("upload_docs_file_img_success", data=>{
        $("#docs_text").removeClass("d-none")
        $("#docs_file").addClass("d-none")
        $.notify("upload New Document success", "success")
        socket.emit("end_upload_docs", {
            id: $("#btn_docs_file").data("dfid"),
            fileName: data
        })
    })
});