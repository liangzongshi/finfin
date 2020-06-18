$(document).ready(()=>{ 
    const socket = io()
    socket.on('connect', () => {})
    var siofu = new SocketIOFileUpload(socket);
    siofu.listenOnSubmit(document.getElementById("btn_edit_docs_file"), document.getElementById("edit_file_docs")); 
    siofu.addEventListener("start", function(event){
        socket.emit("uploading_edit_docs", "edit-doc")
    });

    $("#btn_edit_docs_content").click(()=>{
        const docId = $("#btn_edit_docs_content").data("docid")
        const sub = $("#edit_docs_sub").val()
        const type = $("#edit_docs_type").val()
        if(sub != ""){
            socket.emit("edit_docs_content", {
                docId: docId,
                sub: sub,
                typeDoc: type
            })
        } else {
            $(".edit_doc_check").removeClass("d-none")
            setTimeout(()=>{
                $(".edit_doc_check").addClass("d-none")
            }, 3000)
        }
        
    })
    socket.on("edit_docs_content_success", data=>{
        const docId = data
        $("#edit_docs_text").addClass("d-none")
        $("#edit_docs_file").removeClass("d-none")
        $("#btn_edit_docs_file").data("dfid", docId) 
    })
    socket.on("edit_docs_file_success", data=>{
        $("#edit_docs_text").removeClass("d-none")
        $("#edit_docs_file").addClass("d-none")
        $.notify("Edit The Document Success", "success")
        socket.emit("end_edit_docs", {
            docId: $("#btn_edit_docs_file").data("dfid"),
            fileName: data
        })
    })
});