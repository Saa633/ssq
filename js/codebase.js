//获取第一个元素
function $(id) {
	return document.querySelector(id);
}

//获取元素集合
function $$(tag) {
	return document.querySelectorAll(tag);
}

//获取对象的样式
function getStyle(obj, names) {
	if(obj.currentStyle) {
		return obj.currentStyle[names];
	} else {
		return obj.getComputedStyle(obj, false)[names];
	}
}

//根据窗口大小变化改变元素大小
function size(objs) {
	window.onresize = function() {
		//可见窗口宽和屏幕分辨率宽的比值
		var rate = document.body.offsetWidth / window.screen.width;
		for(var i = 0; i < objs.length; i++) {
			objs[i].style.transform = 'matrix(' + rate + ',0,0,' + rate + ',0,0)';
			objs[i].style.left = objs.offsetLeft * rate + 'px';
		}
	}
}

function addEvent(obj, sEvt, fn) {
	//var fn=function(){}
	if(obj.addEventListener) {
		obj.addEventListener(sEvt, fn, false);
	} else {
		obj.attachEvent('on' + sEvt, fn);
	}
}

//设置cookie  
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie  
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while(c.charAt(0) == ' ') c = c.substring(1);
		if(c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return "";
}
//清除cookie    
function clearCookie(cname) {
	setCookie(cname, "", -1);
}

//一位数字前面补零
function toTwo(n) {
	return n < 10 ? '0' + n : n;
}

//将不足三位的数字补足三位
function toThree(num) {
	if(num < 100 && num >= 10) {
		return num = '0' + num;
	}
	if(num < 10) {
		return num = '00' + num;
	}
}

//获取n~m的随机数
function rnd(n, m) {
	return parseInt(Math.random() * (m - n + 1) + n);
}

//生成确定长度，确定范围的不重复随机数组 (数组长度，随机数范围)
function RadomNum(Length, start, end) {
	//创建一个空数组
	var numarr = [];
	//判断数组长度小于Length
	while(numarr.length < Length) {
		//设定随机数在start~end，方便检测是否出现重复数字，可随时更改
		var numer = parseInt(Math.random() * (end - start) + start);
		//通过数组方法判断数组中是否已经存在num值，当数组中没有num值时，将num追加到数组中
		if(numarr.indexOf(numer) == -1) {
			numarr.push(numer);
		}
	}
	return numarr;
}


