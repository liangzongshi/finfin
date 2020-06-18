$(document).ready(()=>{
    const viewpath = window.location.href
	$("li.has-sub").removeClass("active")
	$("ul.sub-menu li").removeClass("active")
	$("ul li.has-sub a").each(function(item){
		if($("ul li.has-sub a")[item].href === viewpath){
			$($("ul li.has-sub a")[item]).parent().addClass("active");
			$($("ul li.has-sub a")[item]).parent().parent().parent().addClass("active");
		};
	})
})