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
	/*资源库调用*/
	/*通过资源库添加原始6个链接*/
	for (var i = 0; i <= 5; i++) {
		$('[class*="nav-"]').eq(i).removeClass().addClass(link.category[i].class);
		var tb_body_title='<div class="navtitle">'+link.category[i].name+'</div>';
		$('.navlist').eq(i).html(tb_body_title);

		/*用户自定义模块*/
		if (i==0) {
			var navedit_list='<a class="navhelp">帮助</a><a class="navedit">编辑</a><div class="navlist-a">';
			$('.navtitle').after(navedit_list);
			$('.navhelp').attr({
				'href':'https://bencky1017.github.io/nav/README/help',
				'target':'_blank',
			})
			var ndd_table='<a style="display:none;"><div class="nav_add">添加</div></a><div class="ndd-table-mask" style="display: none;"><div class="ndd-table" style="display: none;"><div class="ndd-t-name">名称：<input type="search" value=""  placeholder="名称(5字以内)" onkeyup="value=value.replace(/[\\s*]/g,\'\')" maxlength="5" class="ndd-t-input nti-name"></div><div class="ndd-t-url">网址：<input type="search" value="" placeholder="网址链接" onkeyup="value=value.replace(/[\\s*]/g,\'\')" class="ndd-t-input nti-url"></div><div class="ndd-t-btn"><input type="button" value="取消" class="btn-button btn-cancel"><input type="button" value="确认" class="btn-button btn-sure"></div></div></div>';
			$('.navlist').append(ndd_table);
		}

		/*原始6个盒子对应列表，设置限制*/
		var numlimit=11;
		var numcurrent=link.category[i].list.length - 1;

		/*用户自定义模块显示*/
		if (i==0&numcurrent>11) {
			for (var m = 0; m <= numcurrent; m++) {
				 let tb_body_list='<a href="'+link.category[0].list[m].url+'"><div class="nav_d">'+link.category[0].list[m].name+'</div></a>';
				 $('.navlist-a').append(tb_body_list);
			}
			for (var k = 12; k <= numcurrent; k++) {
				$('.navlist-a a').eq(k).css('display','none');
			}
		}else{
			numlimit=(numlimit>numcurrent)?numcurrent:numlimit;
			for (var j = 0; j <= numlimit; j++) {
				var tb_body_list='<a href="'+link.category[i].list[j].url+'"><div class="nav_d">'+link.category[i].list[j].name+'</div></a>';
				if (i==0) {
					/*用户自定义模块*/
					// numlimit=numcurrent;/*解除限制令*/
					$('.navlist-a').append(tb_body_list);
				}else{
					/*其他默认显示*/
					$('.navlist').eq(i).append(tb_body_list);
				}
			}
		}

		/*缓存默认列表*/
		if (i==0) {
			$('.navlist-a a').attr('onclick','return false;');
			window.localStorage.setItem('bk_default',$('.navlist-a').html());
		}

		/*条件下显示更多按钮*/
		var nav_a1='<a><div class="nav_a1">更多</div></a>';
		var nav_a='<a><div class="nav_a">更多</div></a>';/*限制令*/
		var nav_an='<a><div class="nav_an" style="display:none;">更多</div></a>';/*限制令*/
		if (i==0) {
			$('.navlist-a').after(nav_an);/*限制令*/
			if (window.localStorage.getItem("bk_user") != null&window.localStorage.getItem("bk_user") != "") {
				$('.navlist-a').html(window.localStorage.getItem("bk_user"));continue;
			}
		}
		if (numlimit<link.category[i].list.length - 1) {
			if (i==0) {$('.nav_an').css('display','');continue;}
			if (i==2) {$('.navlist').eq(i).after(nav_a);continue;}/*限制令*/
			$('.navlist').eq(i).after(nav_a1);
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
			$('.navlist').eq(i).after(nav_a2);
		}

		/*加入'收起'按钮*/
		if (i==link.category.length - 1) {
			var btn_hide='<div class="morebtn-hide" style="display: none;">收起</div>';
			$('.toolbox-nav').append(btn_hide);
		}
	}

	/*更多按钮点击展开效果*/
	$('.nav_a1,.nav_a2').on('click',function(){
		var get_a1=$(this).attr('class')=='nav_a1';
		var ck_index=$(this).parents('[class*="nav-"]').index();
		ck_index=(get_a1)?ck_index:ck_index+6;
		if ($(this).text()=='更多') {
			for (var j = 12; j <= link.category[ck_index].list.length - 1; j++) {
				var tb_body_list='<a href="'+link.category[ck_index].list[j].url+'"><div class="nav_d">'+link.category[ck_index].list[j].name+'</div></a>';
				$(this).parents('[class*="nav-"]').find('.navlist').append(tb_body_list);
			}
			$(this).html('收起').css('background-color','#fa0');
		}else if ($(this).text()=='收起') {
			var crtnum=$(this).parents('[class*="nav-"]').find('a').length;
			for (var i = crtnum - 2; i >=12 ; i--) {
				$(this).parents('[class*="nav-"]').find('a').eq(i).remove();
			}
			$(this).html('更多').css('background-color','#369');
		}
	});

	/*用户自定义模块更多按钮*/
	$('.nav_an').on('click',function (){
		var nav_anlength=$('.navlist-a a').length - 1;
		if ($(this).text()=='更多') {
			for (var j = 12; j <= nav_anlength; j++) {
				$('.navlist-a a').eq(j).css('display','');
			}
			$(this).html('收起').css('background-color','#fa0');
		}else if ($(this).text()=='收起') {
			for (var j = 12; j <= nav_anlength; j++) {
				$('.navlist-a a').eq(j).css('display','none');
			}
			$(this).html('更多').css('background-color','#369');
		}
	});

	/*限制令*/
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
	message.setting("showTime", "3000");
	$('.nav_a').click(function() {
		if ($('.m-message').children().hasClass('c-message-notice')) {
		}else{
			var msgtitle=$(this).parent().prev().find('.navtitle').text();
			message.add(msgtitle+" 为会员功能，不给你看","warning");

			/*移除全屏提示条c-message-notice*/
			setTimeout(function(){$('.c-message-notice').remove();},5000);
		}
	});
});
$(function(){
	/*用户自定义模块*/
	$(".navedit").on('click',function(){
		if ($(this).text()=='编辑') {
			$(".navedit").text('保存');
			$('.nav_add').parent().css('display','');//*显示添加按钮*
			$(".navlist-a").sortable("enable");
			$(".navlist-a").css({'background':'#0007'});
			$('.navlist-a a').attr('onclick','return false;'); //*禁止点击*
			$('.nav_an').css('display','none');//*隐藏更多按钮*
			$('.navlist-a a').css('display','');//*显示列表全部*

			$('.nav_add').parent().after('<div class="nav_reset" style="color:#ddd;display:block;width:80px;margin:0px auto;">恢复默认</div>');
			$('.nav_reset').hover(function(){
				$('.nav_reset').css({'color':'#fff','cursor':'pointer'});
			},function(){
				$('.nav_reset').css({'color':'#ddd'});
			});
			$('.nav_reset').off('click').on('click',function(){
				$('.navlist-a').html(window.localStorage.getItem('bk_default'));
				/*恢复后可删除*/
				$('.nav_d').off('dblclick').on('dblclick',function(){
					let delconfirm=confirm('确认删除 “'+$(this).text()+'” 吗？');
					if (delconfirm) {$(this).parent().remove();}
				})
			});

		}else if ($(this).text()=='保存') {
			$(".navedit").text('编辑');
			$('.nav_add').parent().css('display','none');//*隐藏添加按钮*
			$(".navlist-a").sortable("disable");
			$(".navlist-a").css('background','');
			$('.navlist-a a').removeAttr('onclick'); //*允许点击*
			$('.nav_reset').remove();


			/*检测用户自定义模块是否需要收起*/
			var nav_da=$('.navlist-a a');
			if(nav_da.length>12){
				for (var q = 12; q <= nav_da.length - 1; q++) {
					nav_da.eq(q).css('display','none');
				}
				$('.nav_an').css('display','');//*显示更多按钮*
			}

			/*localStorage存储方法*/
			var bk_user_value=($('.navlist-a').html());
			window.localStorage.setItem("bk_user",bk_user_value);
		}
	});

	/*可排序插件*/
	$(".navlist-a").sortable({
		containment: "parent",
		opacity: 0.7,
		tolerance: "pointer",/*鼠标指针重叠在其他项目上*/
		// tolerance: "intersect",/*项目至少50%重叠在其他项目上*/
		placeholder: ".ui-state-hover",
		cursorAt:{ left:60,top:20},
		start: function( event, ui ) {},
		stop: function( event, ui ) {}
	}).sortable("disable");
});
$(function(){
	/*用户自定义模块内容功能*/
	/*添加链接*/
	$('.nav_add').on('click',function(){
		$('.nti-name,.nti-url').val('');
		$('.nti-name').attr('placeholder','名称(5字以内)');
		$('.nti-url').attr('placeholder','网址链接');
		$('.ndd-table').css('display','');
		$('.ndd-table-mask').css({'display':'','background-color':'rgb(0, 0, 0, 0.8)'});
	});

	/*取消添加*/
	$('.btn-cancel').on('click',function(){
		$('.ndd-table').css('display','none');
		$('.ndd-table-mask').css('display','none');
	});

	/*确认添加*/
	$('.btn-sure').on('click',function(){
		var name=$('.nti-name');
		var url=$('.nti-url');
		var reg=/^[http|https|file|chrome]{4,}:\/\/[\S]*/;//*匹配表达式*
		if (name.val()=='') {name.attr('placeholder','名称未填写');}
		if (url.val()=='') {url.attr('placeholder','链接未填写');}
		else if (!reg.test(url.val())) {
			url.val('').attr('placeholder','链接定义错误');
		}
		if (name.val()!=''&url.val()!=''&reg.test(url.val())){
			var link='<a href="'
			+url.val()+'" onclick="return false;"><div class="nav_d">'
			+name.val()+'</div></a>';
			$('.ndd-table').css('display','none');
			$('.ndd-table-mask').css('display','none');
			$('.navlist-a').append(link);
			$('.nav_d').off('dblclick').on('dblclick',function(){
				let delconfirm=confirm('确认删除 “'+$(this).text()+'” 吗？');
				if (delconfirm) {$(this).parent().remove();}
			})
		}
	});

	/*删除网址*/
	$('.nav_d').on('dblclick',function(){
		let delconfirm=confirm('确认删除 “'+$(this).text()+'” 吗？');
		if (delconfirm) {$(this).parent().remove();}
	})
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
	
	/*底部footer点击伸缩效果*/
	$('.footer-head,.footer-body').on('click',function(){
		$('.footer-body').slideToggle(200);
	})
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