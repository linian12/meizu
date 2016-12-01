function getByClass(oParent,sClass){

	var aEle=document.getElementsByTagName('*');

	var aResult=[];

	var re=new RegExp('\\b'+sClass+'\\b','i');

	for(var i=0;i<aEle.length;i++){

		if(re.test(aEle[i].className)){

			aResult.push(aEle[i]);

		}

	}

	return aResult;

}
function getStyle(obj,attr){

	if(obj.currentStyle){

		return obj.currentStyle[attr];

	}

	else{

		return getComputedStyle(obj,false)[attr];

	}

}

function startMove(obj,json,fn){

	clearInterval(obj.timer);
	
	obj.timer=setInterval(function(){

		var bStop=true;

		for(var attr in json){

			var iCur=0;

			if(attr=='opacity'){

				iCur=parseInt(parseFloat(getStyle(obj,attr))*100);

			}

			else{

				iCur=parseInt(getStyle(obj,attr));

			}

				var iSpeed=(json[attr]-iCur)/8;

				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

			if(iCur!=json[attr]){

				bStop=false;

			}

			if(attr=='opacity'){

				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';

				obj.style.opacity=(iCur+iSpeed)/100;

			}

			else{

				obj.style[attr]=iCur+iSpeed+'px';

			}

		}

		if(bStop){

		clearInterval(obj.timer);

			if(fn){

				fn();

			}

		}

	},30);

}
//con-pic轮播
var oUlPic=document.getElementById('con-pic');

var oLiPic=getByClass(oUlPic,'con-pic-li');

var oConPrev=document.getElementById('con-prev');

var oConNext=document.getElementById('con-next');

var maxzIndex=2;

var iNow=0;

oUlPic.onmouseover=function(){

	oConPrev.className=oConNext.className='con-pn';

};
oUlPic.onmouseout=function(){

	oConPrev.className=oConNext.className='';

};
setInterval(function(){

	iNow++;

	if(iNow>4){

		iNow=0;

	}
	oLiPic[iNow].style.filter='alpha(opacity:0)';

	oLiPic[iNow].style.opacity=0;

	oLiPic[iNow].style.zIndex=maxzIndex++;

	startMove(oLiPic[iNow],{opacity:100});

},4000);

//home-rmd-content轮播
var oDivContent=document.getElementById('home-rmd-content');

var oUlHome=getByClass(oDivContent,'home-rmd-box')[0];

var aDivHome=getByClass(oUlHome,'rmd-box-product');

var conTimer=null;

var oDivTool=document.getElementById('home-panel-tool');

var aImgTool=oDivTool.getElementsByTagName('img');

oUlHome.style.width=aDivHome[0].offsetWidth*aDivHome.length+'px';

oUlHome.style.left=0;

conTimer=setInterval(function(){

	if(oUlHome.offsetLeft==-(oUlHome.offsetWidth)/2){

		aImgTool[0].className='more-arrow';

		aImgTool[1].className='';

		startMove(oUlHome,{left:0});
	}
	else{

		aImgTool[1].className='more-arrow';

		aImgTool[0].className='';

		startMove(oUlHome,{left:-(oUlHome.offsetWidth)/2});

	}

},3000);


var oDivBox=document.getElementById('ad');

var aDivAd=getByClass(oDivBox,'ad-box');

var aDivRmdAd=getByClass(oDivBox,'rmd-ad');

var aDivPro=getByClass(oDivBox,'pro-box');

for(var i=0;i<aDivAd.length;i++){

	aDivAd[i].index=i;

	aDivAd[i].onmouseover=function(){
		
		startMove(aDivRmdAd[this.index],{bottom:0});

	};

	aDivAd[i].onmouseout=function(){

		startMove(aDivRmdAd[this.index],{bottom:-100});

	};
}

for(var i=0;i<aDivPro.length;i++){

	aDivPro[i].style.bottom=0;

	aDivPro[i].onmouseover=function(){

		startMove(this,{bottom:2});
	};

	aDivPro[i].onmouseout=function(){

		startMove(this,{bottom:0});
	};

}