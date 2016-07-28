$(function(){
	//获取登陆的用户名
	function getCookie(){
		var strJson=document.cookie;
		var jsonAttr=strJson.split(';');
		var newArr=$.map(jsonAttr,function(n){
			if(n.indexOf('denglu')!=-1){
				return $.parseJSON(n.substring(n.indexOf('=')+1));
			}
		});	
		return newArr;
	}
	$('.logininfo').find('span').each(function(i,ele){
		if(i==1){
			$(this).find('a').remove;
			if(getCookie().length!=0){
	 			$(this).html('Hi~<em>'+getCookie()[0].name+'</em>欢迎来到ZOL商城');				
			}

		}
		if(i==2){
			$(this).remove();
		}
	});
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
	//.right_bar
	$(window).resize(function(){
		$('.right_bar').css({'height':$(window).height()});
	});
	$('.right_bar').css({'height':$(window).height()});
	$('.bar_hover').each(function(idx){
		$(this).hover(function(){
			$(this).css(
				{
					'backgroundColor':'#FF3333',
			 		'backgroundImg':'url(img/indexbg.png)',
			 		'backgroundPosition':'0px '+(-37*idx)+'px'
			 	});
			$(this).next().show(400);
			$(this).parent().siblings().find('dd').hide();
			$(this).find('.hide_bar').animate({'width':100});
		},function(){
			$(this).css({
					'backgroundColor':'#2D2D2D',				
			});
			$(this).next().hide();
		});
	});
	$(window).scroll(function(){
		if(($('.content_box').offset().top-$(window).scrollTop())<0){
			$('#top_search').show();
		}else{
			$('#top_search').hide();
		}
	});
	/*************轮播插件的调用****************/
	var imgSrc=['banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg'];
	$('#banner_carousel').tmlCarousel(imgSrc,{"text":true,"indexH":'20'});
	imgSrc=['onefloor1.jpg','onefloor2.jpg','onefloor3.jpg']
	$('#onefloor').tmlCarousel(imgSrc,{"text":false,"indexH":'14'});
	imgSrc=['secondfloor1.png','secondfloor2.png'];
	$('#secondfloor').tmlCarousel(imgSrc,{"text":false,"indexH":'14'});
	$('#threefloor').tmlCarousel(imgSrc,{"text":false,"indexH":'14'});
	imgSrc=['onefloor1.jpg','onefloor2.jpg','onefloor3.jpg']
	$('#fourfloor').tmlCarousel(imgSrc,{"text":false,"indexH":'14'});
});