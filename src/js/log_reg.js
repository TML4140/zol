$(function(){
	//hover的时候改变背景图片的位置
	$('.submit').find('input').hover(function(){
		$(this).css({'backgroundPosition':'0 -40px'});
			},function(){
		$(this).css({'backgroundPosition':'0 0'});
	});
	//点击的时候该表器内部的。。。
	$('.submit').find('input').click(function(){
		$(this).val('登录中....');
	});
	//给快速登录的a加背景图片
	$('.fast-login-list a').each(function(idx){
		//console.log('0px '+(-idx*38)+'px');
		$(this).css({
			'backgroundPosition':'0px '+(-idx*37)+'px',
		});
	});
	
	
	
/****************************用户注册验证****************************/
	//用户名；
	$('.phone').find('input').on('blur',function(){
		var strPhone=$('.phone').find('input').val();
		if(/^1[34578]\d{9}$/.test(strPhone)){
			if($(this).next('i').hasClass('wrong')){
				$(this).next('i').removeClass();
			}
			$(this).next('i').addClass('right').html(' ').show();
		}else{
			$(this).next('i').html(' ').addClass('wrong').html('请填写有效的11位手机号码').show();
		}
	});
	
	//密码
	$('.passW').find('input').on('blur',function(){
		var strPass=$('.passW').find('input').val();
		if(strPass.length>=6 && strPass.length<=16 && /\w/.test(strPass)){
			if($(this).next('i').hasClass('wrong')){
				$(this).next('i').removeClass();
			}
			$(this).next('i').addClass('right').html(' ').show();			
		}else{
			$(this).next('i').html(' ').addClass('wrong').html('6-16位数字和字母，不能使用特殊字符').show();
		}
	});
	
	//确认密码
	$('.checkPass').find('input').on('blur',function(){
		var strPass=$('.passW').find('input').val();
		var checkPass=$('.checkPass').find('input').val();
		if(strPass==checkPass){
			if($(this).next('i').hasClass('wrong')){
				$(this).next('i').removeClass();
			}
			$(this).next('i').addClass('right').html(' ').show();			
		}else{
			$(this).next('i').html(' ').addClass('wrong').html('密码不一致,请重新输入').show();
		}
	});
	var num;
	num=Math.floor(5*Math.random());
	//console.log(num);
	var picStr;
	var picStr=yanArr[num].src;
	$('.pic_ma').find('img').attr('src','../img/'+picStr);
	//图片验证
	$('.pic_yan').find('input').on('blur',function(){
		var strMa=$(this).val();
		if(strMa==yanArr[num].strMa){
			$('.pic_yan').find('.wrong').html('').hide();
			$('.pic_yan').find('.right').show();			
		}else{
			num=Math.floor(5*Math.random());
			picStr=yanArr[num].src;
			$('.pic_ma').find('img').attr('src','../img/'+yanArr[num].src);
			$('.pic_yan').find('.right').hide();
			$('.pic_yan').find('.wrong').html('').html('验证码不正确，请重新输入').show();
		}
	});
	//提交
	
	$('.reg_sub').find('input').on('click',function(){
		
		console.log($('.phone_reg').find('input').length);
		console.log($('.phone_reg').find('.right').length);
	});
});