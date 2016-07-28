
$(function(){
	console.log(document.cookie);
	//读取cookie
	function getCookie(){
		var strJson=document.cookie;
		var jsonAttr=strJson.split(';');
		var newArr=$.map(jsonAttr,function(n){
			if(n.indexOf('userinf')!=-1){
				return $.parseJSON(n.substring(n.indexOf('=')+1));
			}
		});	
		return newArr;
	}
	function getName(arr){
		var userName=new Array();
		arr.forEach(function(i){
			userName.push(i.phone);
		});
		return userName;
	}
	function getPass(arr){
		var passWord=new Array();
		arr.forEach(function(i){
			passWord.push(i.pass);
		});
		return passWord;		
	}
	$('.login_sum').on('click',function(){
		var newArr=getCookie();
		var user=getName(newArr);
		var pass=getPass(newArr);
		var $wrong=$('.login_wrong');
		var nameVal=$('.username input').val();
		var passVal=$('.password input').val();
		for(var i=0;i<user.length;i++){
			if(nameVal==user[i]){
				break;
			}
		}
		if(nameVal==' ' || passVal==' '){
			$wrong.html('请填写用户名和密码！').show();
			return;			
		}
		if(i>=user.length){
			$wrong.html('您还没有注册！').show();
			return;
		}
		if(pass!=passVal){
			$wrong.html('您的密码有误').show();
		}else{
			$wrong.html('欢迎登陆！').show();
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+5);//加5天
			var id=100*Math.random();			
			var userinf="denglu"+id;
			userdenglu= {name:nameVal};
		 	document.cookie =userinf+'=' + JSON.stringify(userdenglu)+";expires="+exdate.toGMTString()+'; path=/';
			console.log(document.cookie);
			window.location='../index.html';
		}
		
	});
});
