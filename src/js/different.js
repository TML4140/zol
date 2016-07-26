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
	$('.chose_area_box').hover(function(){
		$(this).find('span').eq(0).addClass('area_span_hover');
		$(this).find('i').addClass('area_i_hover');
		$.getJSON('http://localhost:3000/data/city.json',function(json){
   		 	$('.city_many').html('');
   		 	showCity(json);
   		});
   		$('.citybox').show();
	},function(){
		$(this).removeClass('area_span_hover');
		$(this).find('i').removeClass('area_i_hover');
		$('.citybox').hide();
	});
	function showCity(data){
		$('.city_many').html(' ');
		$.each(data.regions,function(){
			$('<a/>').html(this.name).appendTo($('.city_many'));
		});
		$('.city_many').show();
		addClick(data.regions);
	}
	//所有的大城市都可以点，选中后，
	//隐藏大城市的div，
	//显示小城市，并将ul的值改变了
	//并把大城市的值添加到ul的b_city li中
	function addClick(data){
		$('.city_many').find('a').each(function(){
			$(this).on('click',function(){
				$('.city_many').hide();
				$('.b_city').html($(this).html());
				$('.l_city').removeClass('unactive').show();
				showSmallCity(data[$(this).index()]);
				$('.b_city').addClass('unactive');
			});
		});
	}
	$('.b_city').html('重庆');
	//城市的选项卡
	$('.cityclassfy').find('li').on('click',function(){
		$(this).removeClass('unactive');
		$(this).siblings().addClass('unactive');
		if($(this).index()==0){
			$('.city_many').show();
			$('.city_small').hide();
		}else{
			$('.city_many').hide();
			$('.city_small').show();
		}
	});
	//显示小城市的div
	function showSmallCity(data){
		//data是点击的大城市的对象
		//smallCity是一个数组；存的是所有小城市的对象
		var smallCitys=data.regions[0].regions
		$('.city_small').html(' ')
		$.each(smallCitys,function(){
			$('<a/>').html(this.name).appendTo($('.city_small'));
		});
		$('.city_small').show();
		addClickToSmall(hideBig);
	}
	function hideBig(){
		$('.b_city').addClass('unactive');
	}
	//所有的小城市添加点击事件
	//小城市选取后l_city中的值为当前点击的小城市的值
	function addClickToSmall(hideBig){
		$('.city_small').find('a').each(function(){
			$(this).click(function(){
				$('.l_city').html($(this).html()).show();
				$('.l_city').removeClass('unactive');
				$('.chose_area_box').find('em').html($('.b_city').html()+"   "+$('.l_city').html());
			});
		});
		hideBig();
	}
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
	/**************************加入购物***********************/
	//判断用户知否登录
	//如果已经登录
	//1.弹出购物车详细信息框
	//2.将商品详细信息存入cookie；
	//否则弹出提示框，提示是否登录；
	$('.cart').on('click',function(){
		if(1){
			$('.cartInf').show();
			//商品信息存入cookie
			//存入的信息有商品的编号，用户选择的商品的信息；
			//存入的时候如果该编号已经在cookie中出现过了，则在原有数量上加1
			var exdate=new Date();
			 exdate.setDate(exdate.getDate()+5);//加5天
			 var userinfo = {user:'tml',gender:'nv',myip:'23'};
		 	 document.cookie = 'userInfo=' + JSON.stringify(userinfo)+";expires="+exdate.toGMTString();
		}	
	});
	$('.cartInf,.chose a').on('click',function(){
		$('.cartInf').hide();
	});

});