$(function(){
	/*检索条类型选择并切换choose状态，修改input占位符*/
	var type=0;	/*重要属性*/
	$('.type-list td').on('click',function(){
		$(this).addClass('choose').siblings().removeClass();
		type=$(this).index();
		$('.website').eq(type).css('display','').siblings().css('display','none');
		$('.list-arrow td').eq(type).css('opacity','1').siblings().css('opacity','0');
		$('.frame-input').attr('placeholder',$('.website').eq(type).find('.active').attr('data-dec'));
		url1=$('.website').eq(type).find('.active').attr('data-s');
	});

	/*网址条选择并切换choose状态，修改input占位符*/
	$('.website td').on('click',function(){
		$(this).addClass('active').siblings().removeClass();
		url1=$(this).attr("data-s");
		$('.frame-input').attr('placeholder',$('.website').eq(type).find('.active').attr('data-dec'));
	});

	var url1=$('.website').eq(type).find('.active').attr('data-s');/*链接头*/
	var url2='';/*输入框数据*/
	var href='';/*完整链接*/

	/*回车绑定事件*/
	$('input[name=searchtext]').keypress(function(event){
		var eCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
		if(eCode == "13"){
        	$(".frame-icon").triggerHandler('click');
        	location.href = href;
        	return false;
	    }
	});

	/*获取输入框内容并组合搜索链接*/
	$(".frame-icon").on('click',function(){
		url2=$('input').val();
		href=url1+url2;
		$(this).attr('href',href);
	});
});
$(function(){
	
});