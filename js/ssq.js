//导航栏点击事件
function NavFun() {
	var aNavli = $$('.nav .main ul li');
	for(var i = 0; i < aNavli.length; i++) {
		aNavli[i].onclick = function() {
			for(var i = 0; i < aNavli.length; i++) {
				aNavli[i].className = '';
			}
			this.className = 'active';
		}
	}
}
NavFun();

//投注方式选择
function BetFun() {
	var aBetli = $$('.menubox ul li');
	var obetnav=$('#betnav');
	var otrendbox=$('.trendbox');  //双色球走势图
	var oyucebox=$('.yucebox');    //双色球预测
	var ohelpbox=$('.helpbox');    //帮助中心
	for(var i = 0; i < aBetli.length-1; i++) {
		aBetli[i].index=i;
		aBetli[i].onclick = function() {
			for(var i = 0; i < aBetli.length-1; i++) {
				aBetli[i].className = '';
			}
			this.className = 'active';
			if (this.index==1) {
				obetnav.style.display='block';
				otrendbox.style.display='block';
				oyucebox.style.display='block';
				ohelpbox.style.display='none';
			}else{
				obetnav.style.display='none';
				otrendbox.style.display='none';
				oyucebox.style.display='none';
				ohelpbox.style.display='block';
				
			}
		}
	}
}
BetFun();

//投注剩余时间倒计时
function BetDataFun() {
	var aBetEm = $$('.menubox .countdown p em');
	var betDate = new Date();
	betDate.setFullYear(2018, 1, 14); //设置截止时间！！！
	betDate.setHours(19, 40, 0); //时分秒
	var now = new Date(); //现在时间

	//时间-现在时间，得到毫秒值，转换成秒
	var s = parseInt((betDate.getTime() - now.getTime()) / 1000);
	//提出整天
	var d = parseInt(s / 86400);
	s %= 86400; //s=s%86400
	//提出整小时
	var h = parseInt(s / 3600);
	var str = '' + toTwo(d) + toTwo(h);
	//添加倒计时时间
	for(var i = 0; i < str.length; i++) {
		aBetEm[i].innerHTML = str[i];
	}
}
setInterval(BetDataFun,1000);

//彩票期号
function issueFun(){
	var oissue=$('#issue');
	var now=new Date();
	var startDate=new Date();  //以2018年1月1日为开始
	startDate.setFullYear(2018, 0, 1); //年月日
	startDate.setHours(0, 0, 0); //时分秒
	var s=(now.getTime()-startDate.getTime())/1000;
	var issueNum=parseInt(s /86400/3)+2;

	oissue.innerHTML=''+now.getFullYear()+toThree(issueNum);
}
setInterval(issueFun,1000);

//高级投注导航选择
function BetnavFun(){
	var abetnavli=$$('#betnav ul li');
	for (var i = 0; i < abetnavli.length-1; i++) {
		abetnavli[i].onclick = function() {
		for(var i = 0; i < abetnavli.length-1; i++) {
			abetnavli[i].className = '';
		}
			this.className = 'active';
		}
	}
}
BetnavFun();


//热点导航选项卡
function hotFun(){
	var ahotem=$$('.hot h2 em');
	var ahotP=$$('.hot p');
	
	for (var i = 0; i < ahotem.length; i++) {
		ahotem[i].index=i;
		ahotem[i].onclick=function(){
			for (var i = 0; i < ahotem.length; i++) {
				ahotem[i].className='';
				ahotP[i].style.display='none';
			}
			this.className='active';
			ahotP[this.index].style.display='block';
		}
	}
}
hotFun();

//动态写入小球
var aRedBallbox=$$('.redballbox');  //红色小球盒子
var aBlueBallbox=$$('.blueballbox');  //蓝色小球盒子

function addball(ballbox,num){
	for (var i = 0; i < ballbox.length; i++) {
		var oul=ballbox[i].getElementsByTagName('ul')[0];
		for (var i = 0; i < num; i++) {
			var oli=document.createElement('li');
			oli.innerHTML='<a>'+toTwo(i+1)+'</a>';
			oul.appendChild(oli);
		}
	}
}
addball(aRedBallbox,33);  //动态写入红色小球
addball(aBlueBallbox,16);  //动态写入蓝色小球

var obetbtn=$('.betbtnBox a');  //确认选号按钮

//遍历所有小球点击选中，再次点击取消
var aBallAll=$$('.ballarea ul li a');  //遍历所有小球
function selecBall(){
	for (var i = 0; i < aBallAll.length; i++) {
		aBallAll[i].onclick=function(){
			if (this.className=='') {
				this.className='active';
			} else{
				this.className='';
			}
			betBtn();
		}	
	}
}
selecBall();

//随机选择红蓝色小球
function radomBall(obj){
	obj.onclick=function(){
		//获取下拉选框中选中项的value值
		var num=obj.parentNode.firstElementChild.selectedIndex;
		num=obj.parentNode.firstElementChild[num].value;
		
		//获取随机按钮所在区的所有小球
		var oul=obj.parentNode.parentNode.firstElementChild;	
		var aBall=oul.getElementsByTagName('a');
	
		//创建一个空数组
		var numarr = [];
		//判断数组长度小于【下拉选框中选中项的value值】
		while(numarr.length < num) {
			//设定随机数在0~32，方便检测是否出现重复数字，可随时更改
			var numer = rnd(0, aBall.length-1);
		   //通过数组方法判断数组中是否已经存在num值，当数组中没有num值时，将num追加到数组中
			if(numarr.indexOf(numer) == -1) {
				numarr.push(numer);
			}
		}
		//清除小球样式
		for (var i = 0; i < aBall.length; i++) {
			aBall[i].className='';	
		}  
		//将数组传入小球
		for (var i = 0; i < numarr.length; i++) {
			aBall[numarr[i]].className='active';
		}
		betBtn();
	}
}
//给所有随机按钮   添加随机函数
for (var i = 0; i < $$('.radom').length; i++) {
	radomBall($$('.radom')[i]);
}

//清空按钮所在球区的所有小球样式
function clearBall(obj){
	obj.onclick=function(){
		//获取随机按钮所在区的所有小球
		var oul=obj.parentNode.parentNode.firstElementChild;	
		var aBall=oul.getElementsByTagName('a');
		//清除小球样式
		for (var i = 0; i < aBall.length; i++) {
			aBall[i].className='';	
		}
		betBtn();
	}
}
//给所有随机按钮   添加清空函数
for (var i = 0; i < $$('.clearing').length; i++) {
	clearBall($$('.clearing')[i]);
}

//投注，金额计算
function comp(REDball, BLUEball) {
	var B = new Number(REDball);
	var C = 1;
	for(var i = B - 5; i <= B; i++) {
		C = C * i;
	}
	for(var i = 2; i <= 6; i++) {
		C = C / i;
	}
	return 	{zhu:C*BLUEball,
			money:C*BLUEball*2}
}

var otype='';  //投注类型
var Rednum=[];
var Bluenum=[];
var obetCount=$('.betNumCount');  //共多少注

//投注数，金额总计，确认按钮判断
function betBtn(){
	Rednum=$$('.redballbox ul li a.active');
	Bluenum=$$('.blueballbox ul li a.active');
	
	$$('.selectinfo span strong')[0].innerHTML=Rednum.length;  //红色球数
	$$('.selectinfo span strong')[1].innerHTML=Bluenum.length;  //蓝色球数
	$$('.selectinfo span strong')[2].innerHTML=comp(Rednum.length,Bluenum.length).zhu;  //投注数
	$$('.selectinfo span strong')[3].innerHTML=comp(Rednum.length,Bluenum.length).money;  //金额 =投注数*2
	
	if (Rednum.length>5&&Bluenum.length>0) {
		obetbtn.className='betbtn';
	} else{
		obetbtn.className='betbtn disabled';
	}
	//判断投注类型   单式/复式
	if (Rednum.length==6&&Bluenum.length==1) {
		otype='单式';
	}else{
		otype='复式';
	}
}

var odl=$('.selected_list dl');  //双色球统计栏

//确认按钮
obetbtn.onclick=function (){
	betBtn();
	var red=[];  //红色小球数字组
	var blue=[];  //蓝色小球数字组
	for (var i = 0; i < Rednum.length; i++) {
		red.push(Rednum[i].innerHTML);
	}
	for (var i = 0; i < Bluenum.length; i++) {
		blue.push(Bluenum[i].innerHTML);
	}
	//当确认按钮激活时
	if (obetbtn.className==='betbtn'&&obetbtn.parentElement.className==='betbtnBox') {
      //创建新的dd
		var odd=document.createElement('dd');
		//写入彩票统计栏
		odd.innerHTML='<span class="type">'+otype+'</span><span class="nums" title="'+red.join(' ')+'|'+blue.join(' ')+'[共'+comp(Rednum.length,Bluenum.length).zhu+'注 '+comp(Rednum.length,Bluenum.length).money+'元]'+'"><strong class="rednum">'+red.join(' ')+'</strong>|<strong class="bluenum">'+blue.join(' ')+'</strong></span><span class="edit"><a class="edits">修改</a><a class="del">删除</a></span><span class="sum">'+$$('.selectinfo span strong')[3].innerHTML+'元</span>';
		
		//追加到dl中 ， 从dl内头部开始插入
		//本来就没有子节点，如果直接用insertBefore会出错
		//所以判断一下原来是存在子节点标签还是不存在
		//如果存在则调用insetBefore，不存在就用appendChild
		if (odl.children) {   
			odl.insertBefore(odd,odl.firstChild);
		} else{
			odl.appendChild(odd);
		}
		//统计注数
		ZhuNum();
	} 
	
	//当修改按钮激活时
	if (obetbtn.parentElement.className=='betbtnBox revisebtnBox') {
		//写入彩票统计栏
		for (var i = 0; i < odl.children.length; i++) {
			if (odl.children[i].className=='hover') {
				
				odl.children[i].innerHTML='<span class="type">'+otype+'</span><span class="nums" title="'+red.join(' ')+'|'+blue.join(' ')+'[共'+$$('.selectinfo span strong')[2].innerHTML+'注 '+comp(Rednum.length,Bluenum.length).money+'元]'+'"><strong class="rednum">'+red.join(' ')+'</strong>|<strong class="bluenum">'+blue.join(' ')+'</strong></span><span class="edit"><a class="edits">修改</a><a class="del">删除</a></span><span class="sum">'+comp(Rednum.length,Bluenum.length).money+'元</span>';
			}
		}
		
		//修改确认按钮样式
		obetbtn.parentElement.className='betbtnBox';
		obetbtn.className='betbtn disabled';
		
		//去掉所有dd的背景颜色
		var add=$$('dl dd');
		for (var i = 0; i < add.length; i++) {
			add[i].className='';
		}
		
		//统计注数
		ZhuNum();
		
	}
		//清空所有小球样式
	for (var i = 0; i < aBallAll.length; i++) {
		aBallAll[i].className='';
	}
	betBtn();
}

//利用事件委托，点击dd父级dl  删除修改彩票
odl.onclick=function(ev){
	betBtn();
	var ent=ev||event;
	var osrc=ent.srcElement||ent.target;
	console.log(osrc.className)
	//删除dd	
	if(osrc.className=='del'){
		osrc.parentElement.parentElement.style.animation='Hide .5s forwards linear';
	setTimeout(function(){
			odl.removeChild(osrc.parentElement.parentElement);
			//统计注数
			ZhuNum();
		},500)	
	}
	//修改dd
	if(osrc.className=='edits'){
		//确认选号按钮变成确认修改
		obetbtn.parentElement.className='betbtnBox revisebtnBox';
		obetbtn.className='betbtn';
		
		//清空所有小球样式
		for (var i = 0; i < aBallAll.length; i++) {
			aBallAll[i].className='';
		}
		//去掉所有dd的背景颜色
		var add=$$('dl dd');
		for (var i = 0; i < add.length; i++) {
			add[i].className='';
		}
		//当前dd背景加颜色
		osrc.parentElement.parentElement.className='hover';
		
		//把dd里面的红蓝球变成数组
		var nowdd=osrc.parentElement.parentElement;
		
		var aRed=nowdd.getElementsByClassName('rednum')[0].innerHTML;
		var aBlue=nowdd.getElementsByClassName('bluenum')[0].innerHTML;
		
		var redArr=aRed.split(' ');
		var blueArr=aBlue.split(' ');
		 
		var redArea=$$('.ballarea .redballbox li a');
		var blueArea=$$('.ballarea .blueballbox li a');
		
		//把数组传给小球
		for (var i = 0; i < redArr.length; i++) {
			redArea[parseInt(redArr[i])-1].className='active'; 
		}
		for (var i = 0; i < blueArr.length; i++) {
			blueArea[parseInt(blueArr[i])-1].className='active';
		}
	}
}

//清空列表按钮
var oclearbtn=$('.clear_btn');
oclearbtn.onclick=function(){
	if (odl.children.length>0) {
		var r=confirm('您确定删除所有选号？');
	  	if (r==true) {
	    odl.innerHTML='';
	   }
	}
	ZhuNum();
}

//点击【随机1注】随机生成一注
$('#radomone').onclick=function(){
	betBtn();
	//创建新的dd
	var odd=document.createElement('dd');
	
	//获取随机数
	var rednumm=RadomNum(6,0,33);
	var bluenumm=RadomNum(1,0,16);
	
	//写入彩票统计栏
	odd.innerHTML='<span class="type">单式</span><span class="nums" title="'+rednumm.join(' ')+'|'+bluenumm.join(' ')+' [共1注 2元]'+'"><strong class="rednum">'+rednumm.join(' ')+'</strong>|<strong class="bluenum">'+bluenumm.join(' ')+'</strong></span><span class="edit"><a class="edits">修改</a><a class="del">删除</a></span><span class="sum">2元</span>';
	
	//追加到dl中 ， 从dl内头部开始插入
	if (odl.children) {   
		odl.insertBefore(odd,odl.firstChild);
	} else{
		odl.appendChild(odd);
	}
	ZhuNum();	
}

var zhunum=$('#zhunum');  //注数input框
var jixuan=$('#jixuan');   //机选按钮

//修改注数input框里的值
zhunum.onfocus=function(){
	this.nextElementSibling.style.display='none';
	//正则截取数组部分
	this.value='';
}
//事件会在键盘按键被按下并释放一个键时发生   Edge不兼容
zhunum.onkeypress=function(){
	if (isNaN(this.value)) {
		this.value=this.value.replace(this.value,'');
	} else{
		if(this.value==0){
			this.value='';
		}
		if(this.value>9){
			this.value=9;
		}
	}	
}
zhunum.onblur=function(){
	if(this.value==''){
		this.nextElementSibling.innerHTML='5注';
		this.nextElementSibling.style.display='block';
	}else{
		if (this.value=='0'){
			this.value='1';
			this.value=this.value+'注';
			this.nextElementSibling.innerHTML=this.value;
		}else{
			this.value=this.value+'注';
			this.nextElementSibling.innerHTML=this.value;
		}
	}
}
//机选多注【默认5注】
jixuan.onclick=function(){
	for (var i = 0; i < zhunum.nextElementSibling.innerHTML.replace(/[^0-9]/ig,""); i++) {
		 betBtn();
		//创建新的dd
		var odd=document.createElement('dd');
	
		//获取随机数
		var rednumm=RadomNum(6,0,33);
		var bluenumm=RadomNum(1,0,16);
		
		odd.innerHTML='<span class="type">单式</span><span class="nums" title="'+rednumm.join(' ')+'|'+bluenumm.join(' ')+' [共1注 2元]'+'"><strong class="rednum">'+rednumm.join(' ')+'</strong>|<strong class="bluenum">'+bluenumm.join(' ')+'</strong></span><span class="edit"><a class="edits">修改</a><a class="del">删除</a></span><span class="sum">2元</span>';
		
		//追加到dl中 ， 从dl内头部开始插入
		if (odl.children) {   
			odl.insertBefore(odd,odl.firstChild);
		} else{
			odl.appendChild(odd);
		}
	}
	zhunum.nextElementSibling.innerHTML='5注';
	ZhuNum();
}

//统计注数
function ZhuNum(){
	var azhushu=$$('dl dd .nums');
	var zhushu=0;
	for (var i = 0; i < azhushu.length; i++) {
		var str=azhushu[i].title;    //"02 03 05 09 27 31|03[共1注 2元]"
		str=str.substring(str.indexOf('['),str.indexOf(']')) //[共1注  2元
	
	   var reg1=/\d+/g; //等同于 var reg1=/[0-9]{1,}/g;  \d 代表0-9的数字,+ 代表至少一次	多了不限 
	  	var zhu=parseInt(str.match(reg1)[0]);
	  	zhushu+=zhu;
	}
	$('.holderWrapLeft strong').innerHTML=zhushu;
	TotalMoney();
}

//倍数  期数 
$('#beishu').onchange=function(){
	if (isNaN(this.value)) {
		this.value=this.value.replace(this.value,'');
	} else{
		if(this.value==0){
			this.value=1;
		}
		if(this.value>99999){
			this.value=99999;
		}
	}	
	TotalMoney();
}

$('#qishu').onchange=function(){
	if (isNaN(this.value)) {
		this.value=this.value.replace(this.value,'');
	} else{
		if(this.value==0){
			this.value=1;
		}
		if(this.value>154){
			this.value=154;
		}
	}	
	TotalMoney();
}

//计算总金额
function TotalMoney(){
	$('.betMoneyCount').innerHTML=$('.holderWrapLeft strong').innerHTML*2*$('#beishu').value*$('#qishu').value;
}


















