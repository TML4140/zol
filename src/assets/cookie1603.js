//encodeURIComponent:汉字编码，




/*************************encodeURIComponent*******************************/
//添加cookie;
//参数：
//键
//值
//有效期（整数），单位是天；
//返回值：无
function saveCookie(key,value,count){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+count);//加5天
	//document.cookie = encodeURIComponent(key+"="+value+";expires="+exdate.toGMTString());
	document.cookie = key+"="+value+";expires="+exdate.toGMTString();
}

//添加cookie;
//参数：
//键
//值
//有效期（整数），单位是天；
//返回值：无
function saveCookieUsingCN(key,value,count){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+count);//加5天
	document.cookie =key+"="+value+";expires="+exdate.toGMTString();
}


//获取cookie
//参数：
//键
//返回值：键对应的值；

function getCookie(key){
	//1、获取cookie字符串
	//var cookieStr = decodeURIComponent(document.cookie);
	//alert(cookieStr);
	//var cookieStr = decodeURIComponent(document.cookie); "key=a; username=jzm; pass=123; _asdf"
	var cookieStr = document.cookie; "key=a; username=jzm; pass=123; _asdf"
	//2、转成数组
	var cookieArr = cookieStr.split("; ");
	//3、循环数组，从数组中找到对应的元素，对元素截取；
	for(var i=0;i<cookieArr.length;i++){
		if(cookieArr[i].indexOf(key+"=")==0){
			return cookieArr[i].substring(key.length+1);
		}
	}
	return null;//如果给的键不存在，就返回null。
}

//删除cookie;
//参数：
//键；
//返回值：true：删除成功！false：没有该键，所以，删除失败；
function removeCookie(key){
	//1、查找
	if(getCookie(key)!=null){
		//2、如果找到，就删除（就可以调用saveCookie）
		saveCookie(key,"abc",-5);
		return true;
	}
	return false;
}

//修改：
//参数：
//键；
//值；
//有效期（整数），单位是天；
//返回值：如果键存在（则能修改成功），返回true；如果键不存在，相当于修改失败，返回false；
function modifyCookie(key,value,count){
	//1、查找
	if(getCookie(key)!=null){
		//2、如果找到，就修改（就可以调用saveCookie）
		saveCookie(key,value,count);
		return true;
	}
	return false;
}

