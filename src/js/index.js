$(function(){
	//topbar中有子菜单的li进行遍历
	$('.submenue').each(function(idx,ele){
		$(ele).hover(function(){
			$(this).find('div').show();
			$(this).addClass('show_submenue');
		},function(){
			$(this).find('div').hide();
			$(this).removeClass('show_submenue');
		});
	});
	//侧边导航的li会出现子菜单，li中样式会改变
	$('.left_nav li').each(function(idx,ele){
		$(ele).hover(function(){
			$(this).addClass('left_nav_hover');
			$(this).find('a').css('color','#333')
			$(this).find('div').show();
		},function(){
			$(this).removeClass('left_nav_hover');
			$(this).find('a').css('color','#fff')
			$(this).find('div').hide();
		});
	});
	//精品团购中的li在hover的时候样式变化
	$('.jtuan_list li').each(function(idx,ele){
		$(ele).hover(function(){
			$(this).find('.border').show();
		},function(){
			$(this).find('.border').hide();
		});
	});
	//一元抢购中的li,hover出现二维码
	$('.oneyuan_list li').each(function(){
		$(this).hover(function(){
			$(this).find('.erweima').show();
			$(this).find('span').eq(0).hide();
		},function(){
			$(this).find('span').eq(0).show();
			$(this).find('.erweima').hide();
		});
	});
	//楼层中出去滚动的li,都有动画
	$('.floorList li').not('.carousel').each(function(){
		$(this).hover(function(){
			//$(this).find('img').css({'marginTop':8});
			$(this).find('img').stop().animate({'marginTop':6});
		},function(){
			$(this).find('img').stop().animate({'marginTop':12});
		});
	});
	//品牌栏
	$('.brand_list li').each(function(){
		$(this).hover(function(){
			//console.log(123);
			$(this).addClass('hover');
			
		},function(){
			$(this).removeClass('hover');
		});
	});
});