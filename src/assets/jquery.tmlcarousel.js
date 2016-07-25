(function($){
	$.fn.tmlCarousel=function(attr,text){
		//1.根据调用的对象的宽高建立轮播的区域
		var defaults={
			'text':true,
		}
		var $this=$(this);
		var parameter = $.extend({},defaults,text);
		var deftext=true;
		var len=attr.length;
		var carList=$('<ul/>');
		var deaCss={'backgroundColor':'#c40000'}
		carList.css(
			{
				'width':$(this).width(),
				'height':$(this).height()
			});
		carList.appendTo($(this));
		$this.css({'position':'relative'});
		//4.创建小圆圈的图片
		var smallList=$('<ul/>');
		smallList.attr({
		});
		smallList.appendTo($(this));
		//2.利用map将图片的src和新生成的li结合
		var newAttr=$.map(attr,function(n){
			return '<li><a href=\'#\'><img src=\'img/'+n+'\'/></a></li>';
		});

		var newSmall=$.map(attr,function(){
			return '<li></li>';
		});
		for(var i=len-1;i>=0;i--){
			carList.append($(newAttr[i]));
			smallList.append($(newSmall[i]));
		}
		//5.给所有的li加样式
		carList.find('li').css({'float':'left'});
		smallList.find('li').css({
			'float':'left',
			'width':'20',
			'height':'20',
			'marginRight':10,
			'backgroundColor':'#606366',
			'color':'#fff',
			'padding':0,
			'border':0,
			'textAlign':'center',
			'borderRadius':30
		});
		if(parameter.text){
			smallList.find('li').each(function(idx){
				$(this).html((idx+1));
			});
		}
		var smallLeft=($(this).width()-smallList.width())/2;
		smallList.css({
			'position':'absolute',
			'top':$(this).height()-smallList.height()-30,
			'left':($(this).width()-len*smallList.find('li').outerWidth())/2
		});
		//6,生成两个<a>,用于左右调控
		var $left=$('<a/>').appendTo($(this));
		var $right=$('<a/>').appendTo($(this));
		$left.html('&lt;');
		$right.html('&gt;');
		var aCss={
			'position':'absolute',
			'fontSize':60,
			'color':'#ccc',
			'height':50,
			'display':'none',
			'width':50,
			'top':($(this).height()-60)/2
		}
		$left.css({'left':0,});
		$right.css({'right':0,});
		$left.css(aCss);
		$right.css(aCss);
		var $li=carList.find('li');
		//固定所有图片的大小
		$li.each(function(){
			$(this).css({
				'padding':0,
				//'paddingTop':-1
			});
			$(this).find('img').css({
				'margin':0,
				'width':$this.width(),
				'height':$this.height()
			});
		});
	/*********************生成元素完毕*****************************/
	/*********************开始轮播*********************************/
		var index=0;
		var timer;
		$left.on('click',function(){
			index--;
			if(index<=0){
				index=len;
			}
			show();
		});
		$right.on('click',function(){
			console.log(123);
			console.log(index);
			index++;
			if(index>=len){
				index=0;
			}
			show();
		});
		
		$(this).on('mouseenter',function(){
				clearInterval(timer);
				$left.show();
				$right.show();	
			}).on('mouseleave',function(){
					$left.hide();
					$right.hide();
					show();
					timer=setInterval(function(){
					index++;
					if(index>=len){
						index=0;
					}
					show();
				},2000);
			}).trigger('mouseleave');
		//小标号hover的时候index变化
		smallList.find('li').each(function(){
			$(this).on('mouseenter',function(){
				index=$(this).index();
				show();
			})
		});
		function show(){
				$li.each(function(){
					if($(this).index()==index){
						$(this).show().siblings().hide();
					}	
				});
				smallList.find('li').each(function(){
					if($(this).index()==index){
						$(this).css({'backgroundColor':'#C40000'});
						$(this).siblings().css({'backgroundColor':'#606366'});
					}
				});
		}
	}
})(jQuery);