$(function(){
	//console.log(newArr);
	//购物车页面初始化函数
	unit();
	function unit(){
		//显示cookie的函数
		//读取当前cookie中的所有数据
		var newArr=chuliCookie();
		console.log(chuliCookie().length);
		showCookie(newArr);
		//console.log(newArr.length);
		//页面刷新的时候默认全选
		if($('.title_list').find(':checkbox').prop('checked')){
			$('.shoopcart_list').find(':checkbox').prop('checked','true');
		}
		bigTotal2();
		showLength(newArr.length);
	}
	function chuliCookie(){
		var strJson=document.cookie;
		var jsonAttr=strJson.split(';');
		var newArr=$.map(jsonAttr,function(n){
			if(n.indexOf('goodsinformation')!=-1){
				return $.parseJSON(n.substring(n.indexOf('=')+1));
			}
		});	
		return newArr;
	}
	//
	function showLength(len){
		$('.total p em').html('('+len+'/30)')
	}
	//cookie的长度显示在	
	//将cookie的数据显示在所有的购物车的页面上；
	function showCookie(newArr){
		//应当先将所有清空；
		$('.shop_item').each(function(){
			if($(this).css('display')=='block'){
				$(this).remove();
			}
		});
		var count=0;
		$.each(newArr,function(){
			showtoDoc($(this));	
		});
	}
	//将cookie转换成html显示在页面上
	function showtoDoc($this){
		//每次就克隆第一个就可一了
		var $newClone=$('.shop_item').first().clone(true);
		var $title=$newClone.find('.shoop_inf');
		//console.log($title.find('.shopname a').html());
		var $content=$newClone.find('.shoop_store');
		//店铺的名称
		$title.find('.shopname a').html(($this)[0].storename);//
		//添加商品的信息
		$content.find('.pic img').attr({
			'img':($this)[0].imgsrc,
		});
		$content.find('.price i').html(($this)[0].price);
		$content.find('.text_inf a').eq(0).html(($this)[0].name);
		$content.find('.count .num').html(($this)[0].count);
		$content.find('.yanse i').html(($this)[0].color);
		$newClone.appendTo($('.shoopcart_list')).show();
	}
	//修改cookie
	//每次更改了商品数量，删除了商品的时候调用函数updateCookie
	function del_update(){
		//首先将之前的所有cookie删除
		var jsonAttr=document.cookie.split(';');
		$.each(jsonAttr,function(idx,n){
			if(n.indexOf('goodsinf')!=-1){
				var now = new Date();
				now.setDate(now.getDate()-1);
				document.cookie =n.substring(0,n.indexOf('='))+'=null;expires=' + now;	//
			}
		});	
		updateCookie();
	}
	function updateCookie(){
		$('.shop_item').each(function(){
			if($(this).css('display')=='block'){
				var $title=$(this).find('.shoop_inf');
				var $content=$(this).find('.shoop_store');
				//1.获取数据；
				var name=$content.find('.text_inf a').eq(0).html();
				var imgsrc=$content.find('.pic img').attr('img');
				var count=$content.find('.count .num').html();
				var color=$content.find('.yanse i').html();
				var taocan='官方标配';
				var price=$content.find('.price i').html();
				var storename=$title.find('.shopname a').html();
				goodsinf= {name:name,imgsrc:imgsrc,count:count,color:color,taocan:taocan,storename:storename,price:price};
				//信息cookie
				var exdate=new Date();
				exdate.setDate(exdate.getDate()+5);//加5天
				var id=100*Math.random();
				var goodsinfpr="goodsinf"+id;
				document.cookie =goodsinfpr+'=' + JSON.stringify(goodsinf)+";expires="+exdate.toGMTString();			
			}
		});
	}
	//给所有的能改变商品的数量的span点击事件
	$('.shoopcart_list').find('span').each(function(){
		$(this).on('click',function(){
			//点击到了加减的时候自动选取当前行
			//并判断当前行是否满足全选；
			$(this).parent().parent().find(':checkbox').prop('checked',true);
			choseAllorNot();
			if($(this).hasClass('jiannum')){
				$(this).next('.num').html(parseInt($(this).next('.num').html())-1);
				if(parseInt($(this).next('.num').html())<=1){
					$(this).next('.num').html(1);
				}
			}
			if($(this).hasClass('jiaonum')){
				$(this).prev().html(parseInt($(this).prev('.num').html())+1);
				if(parseInt($(this).prev('.num').html())>=30){
					$(this).prev('.num').html(30);
				}
			}
			//每次点击完成后将总价改变,cookie也跟着更新 
			smallTotal($(this).parent().parent());
			bigTotal2();
			del_update();
		});
	});
	//改变每件商品的总价的函数
	//用当前行的price*count
	function smallTotal($obj){
		var price;
		var count;
		price=parseInt($obj.find('.price i').html());
		count=parseInt($obj.find('.count .num').html());
		$obj.find('.s-total em').html(price*count);
	}
	//给所有的li中的.del_cart添加的删除事件，
	//点击删除事件后，改变当前的总价
	//判断是否满足全选
	//更新cookie
	$('.del_cart').on('click',function(){
		$(this).parents('.shop_item').remove();
		 bigTotal2();
		 choseAllorNot();
		 del_update();
		showLength(chuliCookie().length);
	});
	//给.shoop_cart中所有的checkbox添加点击事件
	//每次点击过后重新计算总价
	$('.shoop_cart').find(':checkbox').each(function(){
		$(this).on('click',function(){
				if(!$(this).hasClass('total_chose')){
					choseAllorNot();
				}else{
					choseAll();
				}
			bigTotal2()
		});
	});
	//每次点击过后重新计算总价（每次计算总价的函数）
	function bigTotal2(){
		var total=0;
		$('.shoop_store').each(function(){
			//total+=parseInt($(this).find('.s-total em').html());
			if($(this).find(':checkbox').prop('checked')){
				total+=parseInt($(this).find('.s-total').find('em').html());
			}
		});
		$('.total-cart-price').html(total);
	}
	//该函数在.shoop_cart中所有的checkbox点击的时候都要重新调用一次
	function choseAll(){
		//如果title_list中的checkbox选中的话，就将所有的checkbox选中
		if($('.total_chose').prop('checked')){
			$('.shoopcart_list').find(':checkbox').prop('checked',true);
		}else{
			$('.shoopcart_list').find(':checkbox').prop('checked',false);
		}
	}
	function choseAllorNot(){	
		//，遍历.shop_item所有的checkbox，如果checkbox的数量和checked的不是，取消全选,
		var  checkboxLen=$('.shop_item').find(':checkbox').length;
		var checkedLen=$('.shop_item').find(':checked').length;
		if(checkboxLen==checkedLen){
			//console.log($('.title_list').find(':checkbox').prop('checked'));
			$('.title_list').find(':checkbox').prop('checked',true);
		}else{
			$('.title_list').find(':checkbox').prop('checked',false);
		}		
	}
});