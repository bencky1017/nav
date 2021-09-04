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
	/*底部footer点击伸缩效果*/
	$('.footer-head,.footer-body').on('click',function(){
		$('.footer-body').slideToggle(200);
	})
});
$(function(){
	/*通过资源库添加原始6个链接*/
	for (var i = 0; i <= 5; i++) {
		$('[class*="nav-"]').eq(i).removeClass().addClass(link.category[i].class);
		var tb_body_title='<div class="navtitle">'+link.category[i].name+'</div>';
		$('.navlist').eq(i).html(tb_body_title);

		/*原始6个盒子对应列表，设置限制*/
		var numlimit=11;
		if (numlimit>link.category[i].list.length - 1) {numlimit=link.category[i].list.length - 1}
		for (var j = 0; j <= numlimit; j++) {
			var tb_body_list='<a href="'+link.category[i].list[j].url+'"><div class="nav_d">'+link.category[i].list[j].name+'</div></a>';
			$('.navlist').eq(i).append(tb_body_list);
		}

		/*条件下显示更多按钮*/
		var nav_a1='<a><div class="nav_a1">更多</div></a>';
		var nav_a='<a><div class="nav_a">更多</div></a>';/*限制令*/
		if (numlimit<link.category[i].list.length - 1) {
			if (i==2) {$('.navlist').eq(i).append(nav_a);continue;}
			$('.navlist').eq(i).append(nav_a1);
		}
	}

	/*通过资源库添加更多链接，从第6个之后开始*/
	for (var i = 6; i <= link.category.length - 1; i++) {
		/*加入'展开'按钮*/
		if (i==6) {
			var btn_show='<div class="morebtn-show">展开</div><div class="toolbox-more"></div>';
			$('.toolbox-nav').append(btn_show);
		}

		/*添加盒子*/
		var tb_head='<div class="'+link.category[i].class+'"><div class="navlist"></div></div>';
		var tb_body_title='<div class="navtitle">'+link.category[i].name+'</div>';
		$('.toolbox-more').append(tb_head);/*内部结尾添加*/
		$('.navlist').eq(i).append(tb_body_title);

		/*对应盒子添加网址列表，设置限制数*/
		var numlimit=11;
		if (numlimit>link.category[i].list.length - 1) {numlimit=link.category[i].list.length - 1;}
		for (var j = 0; j <= numlimit; j++) {
			var tb_body_list='<a href="'+link.category[i].list[j].url+'"><div class="nav_d">'+link.category[i].list[j].name+'</div></a>';
			$('.navlist').eq(i).append(tb_body_list);
		}

		/*条件下显示更多按钮*/
		var nav_a2='<a><div class="nav_a2">更多</div></a>';
		if (numlimit<link.category[i].list.length - 1) {
			$('.navlist').eq(i).append(nav_a2);
		}

		/*加入'收起'按钮*/
		if (i==link.category.length - 1) {
			var btn_hide='<div class="morebtn-hide" style="display: none;">收起</div>';
			$('.toolbox-nav').append(btn_hide);
		}
	}
		if ($(this).parents('nav-v-ana')) {$(this).off('click');}
	

	/*更多按钮点击展开效果*/
	$('.nav_a1,.nav_a2').on('click',function(){
		var get_a1=$(this).attr('class')=='nav_a1';
		var ck_index=$(this).parents('[class*="nav-"]').index();
		ck_index=(get_a1)?ck_index:ck_index+6;
		if ($(this).text()=='更多') {
			for (var j = 12; j <= link.category[ck_index].list.length - 1; j++) {
				var tb_body_list='<a href="'+link.category[ck_index].list[j].url+'"><div class="nav_d">'+link.category[ck_index].list[j].name+'</div></a>';
				$(this).parent().before(tb_body_list);
			}
			$(this).html('收起').css('background-color','#fa0');
		}else if ($(this).text()=='收起') {
			var crtnum=$(this).parent().siblings('a').length;
			for (var i = crtnum - 1; i >=12 ; i--) {
				$(this).parent().siblings('a').eq(i).remove();
			}
			$(this).html('更多').css('background-color','#369');
		}
	});

	/*限制令*/
	// $('.nav_a').on('click',function(){
		// alert('会员功能，不给你看');
		var message = new MyMessage.message({
			/*默认参数，下面为默认项*/
			iconFontSize: "20px", //图标大小,默认为20px
			messageFontSize: "12px", //信息字体大小,默认为12px
			showTime: 3000, //消失时间,默认为3000
			align: "center", //显示的位置类型center,right,left
			positions: { //放置信息距离周边的距离,默认为10px
				top: "300px",
				bottom: "10px",
				right: "10px",
				left: "10px"
			},
			message: "这是一条消息", //消息内容,默认为"这是一条消息"
			type: "normal", //消息的类型，还有success,error,warning等，默认为normal
		});
		message.setting("showTime", "1000");
		$('.nav_a').click(function() {
			let msgtitle=$(this).parents('.navlist').find('.navtitle').text();
			message.add(msgtitle+" 为会员功能，不给你看","warning");
		});
	// });

});
$(function(){
	/*展开收起按钮点击效果*/
	$('.morebtn-show').on('click',function(){
		$('.toolbox-more').slideDown(200);
		$('.morebtn-show').css('display','none');
		$('.morebtn-hide').css('display','');
	});
	$('.morebtn-hide').on('click',function(){
		$('.toolbox-more').slideUp(200);
		$('.morebtn-hide').css('display','none');
		$('.morebtn-show').css('display','');
	});
});
var MyMessage = (function() {
	function message(setting) {
		//合并默认参数
		this.messageContainer = null;
		this.opts = null;
		this._setting(setting);
		this.init();
	}
	/*默认参数*/
	message.DEFAULTS = {
		iconFontSize: "20px", //图标大小
		messageFontSize: "12px", //信息字体大小
		showTime: 3000, //消失时间
		align: "center", //显示的位置
		positions: { //放置信息的范围
			top: "10px",
			bottom: "10px",
			right: "10px",
			left: "10px"
		},
		message: "这是一条消息", //消息内容
		type: "normal", //消息的类型，还有success,error,warning等
	}
	/*设置消息的参数*/
	message.prototype._setting = function(setting) {
		this.opts = $.extend({}, message.DEFAULTS, setting);
	}
	message.prototype.setting = function(name, val) {
		if("object" === typeof name) {
			for(var k in name) {
				this.opts[k] = name[k]
			}
		} else if("string" === typeof name) {
			this.opts[name] = val;
		}
	}
	/*
	 用于添加相应的dom到body标签中
	 * */
	message.prototype.init = function() {
		var domStr = "<div class='m-message' style='top:" +
			this.opts.positions.top +
			";right:" +
			this.opts.positions.right +
			";left:" +
			this.opts.positions.left +
			";width:calc(100%-" +
			this.opts.positions.right +
			this.opts.positions.left +
			");bottom:" + this.opts.positions.bottom +
			"'></div>"
		this.messageContainer = $(domStr);
		this.messageContainer.appendTo($('body'))
	}
	/*
	 用于添加消息到相应的标签中
	 message:具体的消息
	 type:消息的类型
	 * */
	message.prototype.add = function(message, type) {
		var domStr = "";
		type = type || this.opts.type;
		domStr += "<div class='c-message-notice' style='" +
			"text-align:" +
			this.opts.align +
			";'><div class='m_content'><i class='";
		switch(type) {
			case "normal":
				domStr += "icon-bubble";
				break;
			case "success":
				domStr += "icon-check-alt";
				break;
			case "error":
				domStr += "icon-notification";
				break;
			case "warning":
				domStr += "icon-cancel-circle";
				break;
			default:
				throw "传递的参数type错误，请传递normal/success/error/warning中的一种";
				break;
		}
		domStr += "' style='font-size:" +
			this.opts.iconFontSize +
			";'></i><span style='font-size:" +
			this.opts.messageFontSize +
			";'>" + message + "</span></div></div>";
		var $domStr = $(domStr).appendTo(this.messageContainer);
		this._hide($domStr);
	}
	/**
	 * 隐藏消息
	 * $domStr：该消息的jq对象
	 * */
	message.prototype._hide = function($domStr) {
		setTimeout(function() {
			$domStr.fadeOut(1000);
		}, this.opts.showTime);
	}
	return {
		message: message /*对外提供的接口*/
	}
})();