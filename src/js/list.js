$(function(){
	//列表页的数据分页显示；
	var pageNo=1;
	var pageCount=5;
	var pageLen=1;
	//ajax全局设置，即为ajax函数的默认的参数
	$.ajaxSetup({
				url:'http://localhost:3000/ajax/huawei',
				data:{pageNo:1,pageCount:pageCount},
				dataType:'json',
				success:function(res){
					//console.log(res);
					showHuaWei(res.data);
					// 计算分页数量 
					pageLen = Math.ceil(res.total/res.pageCount);
				//	console.log(pageLen);
					$('.pagelist').find('a').remove();
					for(var i=0;i<pageLen;i++){
						$('<a/>').html(i+1).insertBefore($('.nextone'));
					}
					//让当前页面的的序号显示高亮
					$('.pagelist').find('a').each(function(){
						if(($(this).index())==pageNo){
							$(this).css({'background':'#c40000','color':'#fff'});
						}
					});
				}
			});
			// 服务根据传参的不同，返回不同的数据
			$.ajax();
	function showHuaWei(data){
		console.log($('.goodslist').find('li').css('display'));
		$('.goodslist').find('li').each(function(){
			console.log($(this).css('display'));
			if($(this).css('display')!='none'){

				$(this).remove();
			}
		});
		$.each(data,function(i,item){
			var $newLi=$('.goodslist li').first().clone(true);
			//从json中将数据显示克隆来的li中
			$newLi.find('.img img').attr({"src":item.src});
			$newLi.appendTo($('.goodslist')).show();
		});
	}
	//根据每次点击获取当前的按钮的值；
	$('.pagelist').on('click','a',function(){
		//自己的样式改变
		//$(this).addClass('aclick');
		//$(this).siblings().removeClass('aclick');
		pageNo=parseInt($(this).text());
		var data={pageNo:pageNo};
		//ajax,在下次调用的时候会传入参数，而且参数是会覆盖原默认参数的
		$.ajax({
			data:data
		});
	});
	$('.nextone').on('click',function(){
		pageNo++;
		if(pageNo>=pageLen){
			pageNo=pageLen;
		}
		var data={pageNo:pageNo};
		$.ajax({
			data:data
		});
	});
	$('.prevone').on('click',function(){
		pageNo--;
		if(pageNo<=1){
			pageNo=1;
		}
		var data={pageNo:pageNo};
		$.ajax({
			data:data
		});
	});
  //所有的li都有hover事件
  $('.goodslist').find('li').each(function(){
  	    $(this).hover(function(){
  	    	$(this).addClass('lihover');
  	    	$('.jiaoyi').show();
  	    },function(){
  	    	$(this).removeClass('lihover');
  	    	$('.jiaoyi').hide();
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
	$('.right_bar').css({'height':$(window).height()});
	/********************列表页面的品牌滚动*****************/
	//滚动是，不会自动滚动，
	//点击<向左滚动，点击>向右滚动；
	//console.log($('.brandlist li').width());
	$('.brandlist').css({
	    'width':$('.brandlist li').width()*$('.brandlist li').length
	});
	$('.brand_carousel .change').each(function(){
			$(this).on('click',function(){
				//点击了向左移动
				if($(this).index()==0){
					var left=parseInt($('.brandlist').css('left'));
					console.log();
					console.log(left);
					if(left<=-2700){
						$('.brandlist').animate({'left':left-0});
					}else{
						$('.brandlist').animate({'left':left-900});
					}
				}else{
					//点击了向右移动
					var left=parseInt($('.brandlist').css('left'));
					if(left>=0){
						$('.brandlist').animate({'left':left+0});
					}else{
						$('.brandlist').animate({'left':left+900});
					}
				}
		});
	});
	/************group在品牌滚动的下面的当前网页的地址************************/
	$('.group').not(':last').each(function(){
		$(this).hover(function(){
			$(this).find('span').addClass('hover');
			$(this).find('.group_list').show();
		},function(){
			$(this).find('.group_list').hide();
			$(this).find('span').removeClass('hover');
		});
	});
	$('.huawei').hover(function(){
		console.log(123);
		$(this).find('span').addClass('hover');
	},function(){
		$(this).find('span').removeClass('hover');
	});
	/****************初始的只显示2个*******************/
	function showlittle(){
		$('.select_item').each(function(){
			if($(this).index()<=1){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	}
	showlittle();
	$('.selector .click').on('click',function(){
		if($(this).hasClass('show_more')){
			$(this).addClass('show_little');
			$(this).removeClass('show_more');
			$(this).find('span').text('收起');
			$('.select_item').show();
		}else{
			$(this).addClass('show_more');
			$(this).removeClass('show_little');
			$(this).find('span').text('更多选项');
			showlittle();
		}
	});
	/*********发货地址**************/
	$('.address').hover(function(){
		$('.citylist').show();
		$(this).addClass('addresshover');
		},function(){
		$('.citylist').hide();
		$(this).removeClass('addresshover');
	});
	$('.addr_list').find('li').each(function(){
		$(this).hover(function(){
			$(this).addClass('addresshover');
		},function(){
			$(this).removeClass('addresshover');
		});
		
	});
});
