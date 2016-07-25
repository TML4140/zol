$(function(){
	/**************************pruoduct页面的***************************************/
	//放大镜选取图片
	//让所有的小图片点击的时候更换当前选中的图片
	$('.small_pic li').each(function(idx){
		$(this).on('click',function(){
			//大图变成当前的图片
			$('.pic_desc').find('img').attr('src','../img/picdec_mid'+(idx+1)+'.jpg');
			$(this).find('i').show();
			$(this).siblings().find('i').hide();
		});
		//默认选中第一张图片
		if(idx==0){
			$(this).trigger('click');
		}
	});
	var $bigDiv=$('<div/>').css({
		'position':'absolute',
		'width':400,
		'height':400,
		'borderColor':'#ededed',
		'borderWidth':1,
		'borderStyle':'solid',
		'display':'none',
		'top':0,
		'left':420,
		'overflow':'hidden',
		'background':'#fff',
		'z-index':3
	});
	$divimg=$('<img/>').css({'position':'absolute'}).attr('src','../img/picdec_big1.jpg');
	$bigDiv.append($divimg);
	var wd=200;
	var $smallDiv=$('<div/>').css({
		'position':'absolute',
		'width':wd,
		'height':wd,
		'backgroundColor':'#fff',
		'opacity':0.3,
		'display':'none',
		'top':0,
		'left':0
	})
	$smallDiv.appendTo($('.pic_desc'));
	$bigDiv.appendTo($('.pic_desc'));

	var scale=$bigDiv.outerWidth()/wd;
		//滑过小图触发事件
	$('.pic_desc').mousemove(function(e){
			//在小图可视区域里面的left，top值;
			//console.log($('.pic_desc').offset().left);
			var divX=e.pageX-$('.pic_desc').offset().left-wd/2;//+wd;
			var divY=e.pageY-$('.pic_desc').offset().top-wd/2;//+wd;
			//在可视区域的活动范围
			var boxLeft=$('.pic_desc').offset().left;
			var	leftside=boxLeft+wd/2;
			var boxRight=$('.pic_desc').offset().left+$('.pic_desc').width();
			var rightside=boxRight-wd/2;
			var boxTop=$('.pic_desc').offset().top;
			var topside=boxTop+wd/2;
			var boxbottom=$('.pic_desc').offset().top+$('.pic_desc').height();
			var bottomside=boxbottom-wd/2;
			//判断显示
			if(e.pageX >= leftside && e.pageX <= rightside &&　e.pageY>=topside && e.pageY <=bottomside){
				
				$smallDiv.css('display','block');
				$bigDiv.css('display','block');
				//小图的移动范围
				$smallDiv.css('left',divX);
				$smallDiv.css('top',divY);
				//图的移动范围
				$bigDiv.find('img').css('left',-divX*scale);
				$bigDiv.find('img').css('top',-divY*scale);
			}
			if(e.pageX<boxLeft || e.pageX>boxRight ||
				e.pageY<boxTop || e.pageY>boxbottom){
				$smallDiv.css('display','none');
				$bigDiv.css('display','none');
			}
		});



	//单品页的地址选取的时候 span hover时
	//背景颜色改变，三角形也改变
	//显示地址选择；
	$('.chose_area_box').find('span').eq(0).hover(function(){
		$(this).addClass('area_span_hover');
		$(this).find('i').addClass('area_i_hover')
	},function(){
		$(this).removeClass('area_span_hover');
		$(this).find('i').removeClass('area_i_hover')
	});
	//加入购物车市，选择购买的时候
	$('.color_list').find('span').each(function(){
		$(this).hover(function(){
			$(this).addClass('hoverspan');
		},function(){
			$(this).removeClass('hoverspan');
		});
	});
	$('.color_list').find('li').each(function(idx){
		$(this).on('click',function(){
			$(this).find('i').show();
			$(this).find('span').addClass('clickspan');
			$(this).siblings().find('i').hide();
			$(this).siblings().find('span').removeClass('clickspan');				
		});
		//如果是第一个的话，就默认选中
		if(idx==0){
			$(this).find('i').show();
			$(this).find('span').addClass('clickspan');
		}
	});
	/********单品页的商品分类的收缩***********/
	$('.sort_title').each(function(){
		$(this).click(function(){
			$(this).next('ul').toggleClass('sort_list_hide');
			$(this).toggleClass('sort_title_hide');
		});
	});
	/*************导航的选项卡切换******/
	$('#right_wrapper_list li').not('.last').each(function(idx){
		$(this).click(function(){
			$(this).find('a').first().addClass('a_click');
			$(this).siblings().find('a').removeClass('a_click');
			$('.tabdiv .tab').hide().eq(idx).show();
			$('.right_nav').hide();
			if(idx==5){
				$('.right_nav').show();
			}
		});
		if(idx==0){
			$(this).find('a').first().addClass('a_click');
			$('.right_nav').show();
			$('.tabdiv .tab').hide().eq(idx).show();
		}
	});
	/***********侧边导航的js,高为屏幕的高*************/
	$(window).resize(function(){
		$('.right_nav').css({'height':$(window).height()-38});
	});
	//窗口滚动的时候右侧的动画
	$(window).scroll(function(){
		if($('.product_wrapper').offset().top - $(window).scrollTop()<0){
			//右侧的导航fixed；
			$('.right_wrapper_nav').addClass('right_wrapper_nav_fixed');
			$('.top-buy').show();

		}else{
			$('.right_wrapper_nav').removeClass('right_wrapper_nav_fixed');
			$('.top-buy').hide();
		}	
		//如果底部出现，侧导航的高度变化
		var footerTop=$('.footer').offset().top;
		var wScrollTop=$(window).scrollTop();
		var clientH=$(window).height();
		var fToW=footerTop-wScrollTop;
		//console.log((clientH-fToW));
		//如果footer到屏幕的距离小于屏幕的高度时
		if(fToW<clientH )
		{
			$('.right_nav').stop().animate({'height':fToW-38});	
		}
		oldScroll=$(window).scrollTop();


		/*************侧导航的楼梯样式*****************///&&$(window).scrollTop()<$(ele).offset().top+$(ele).outerHeight()/2
		$('.xq').each(function(idx,ele){
			if($(window).scrollTop()>$(ele).offset().top  ){
				$('.right_nav_div li').eq(idx).find('a').addClass('right_nav_hover');
				$('.right_nav_div li').eq(idx).siblings().find('a').removeClass('right_nav_hover');
			}
		});
	});
	$('.right_nav').css({'height':$(window).height()-38});

});