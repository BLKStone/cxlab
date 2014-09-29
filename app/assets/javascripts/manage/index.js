$(document).ready(function(){

	//sidebar 适应屏幕
	$(".sidebar").height($(window.height) - $(".navbar").height());
	
	//iframe 自适应	
	function iframeAutoAdapt() 
	{
		var iframe = $('#main_frame');
		var sidebar_width;
		if($(".sidebar").css("display") == "block") 
			sidebar_width = $('.sidebar').width();
		else 
			sidebar_width = 0;
		var navbar_height = $('.navbar').height();
		var frame_height = $(window).height() - navbar_height - 5;
		var frame_width;
		if($(window).width()>760)
			frame_width = $(window).width() - sidebar_width;
		else 
			frame_width = $(window).width();
		iframe.height(frame_height);
		iframe.width(frame_width);	
	}
	iframeAutoAdapt();
	$(window).resize(function(data){
		iframeAutoAdapt();
		bodyAutoAdapt();
	});
	
	//隐藏sidebar按钮
	var collapsed;
	function bodyAutoAdapt() //body适应sidebar的有无
	{
		var hide = $(".sidebar").css("display");
		if(hide == "block") collapsed = false;
		else collapsed = true;
 		if(collapsed){
 			collapsed = false;
 			$(".body").css("margin-left","0");
 		}
 		else{
 			collapsed = true;
 			$(".body").css("margin-left","225px"); 			
 		}
	}
	bodyAutoAdapt();
 	$("#collapsed-min").click(function(){
 		$(".sidebar").toggle();
		$(".sidebar").height($(window.height) - $(".navbar").height());
 		bodyAutoAdapt();
 		iframeAutoAdapt();
 	});

    //sidebar 滚动条初始化
    $(".sidebar-container").mCustomScrollbar({
        scrollInertia:150
    });

    //滚动条scroller dragger 显示处理
    $(".sidebar-container").hover(function () {
        $(".mCSB_dragger").fadeIn("fast");
    },function () {
        $(".mCSB_dragger").fadeOut("fast");
      });

    //折叠二级菜单
    var ToggleButton = $(".toggle-button");
    var SubNav = $(".sidebar-subnav");
    $(".sidebar-nav > li.sidebar-subnav-list > .sidebar-subnav-button").each(function (i) {
        $(this).click(function () {
            if ($(SubNav[i]).css("display") == "block") {
                $(SubNav[i]).slideUp(300);
                $(ToggleButton[i]).removeClass("fa fa-chevron-down").addClass("fa fa-chevron-left");

            } else {
                for (var j = 0; j < SubNav.length; j++) {
                    $(SubNav[j]).slideUp(300);
                    $(ToggleButton[j]).removeClass("fa fa-chevron-down").addClass("fa fa-chevron-left");
                }
                $(SubNav[i]).slideDown(300);
                $(ToggleButton[i]).removeClass("fa fa-chevron-left").addClass("fa fa-chevron-down");
            }
        });
    });

	var OldHref = location.href;
	var NewHrefBase = OldHref.split("#");
	var BaseHref = NewHrefBase[0];
	var Module = NewHrefBase[1];
    //sidebar 点击更改url
    $(".sidebar-nav > li > a").click(function(){
	    module = $(this).attr("data-mod");
	    location.href = BaseHref + "#" + module;
    });

    //刷新重载iframe
	var Module_url;
    $(".sidebar-nav > li > a").each(function(){
    	var thisModule = $(this).attr("data-mod");
    	if(thisModule == Module)
    		Module_url = $(this).attr("data-url")
    });
    $("#message").text("正在加载.."); 
  	$("iframe").attr("src",Module_url);
  	$("iframe").load(function(){ 
        $("#message").text(""); 
	  	$("iframe").removeClass("iframe");
    }); 


});