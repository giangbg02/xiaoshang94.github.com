
window.onload=function(){
	/*侧边栏*/
	(function(){
		var oUl=document.getElementById('b2-l-bul');
		var aLi=oUl.children;
		for(var i=0; i<aLi.length; i++){
			(function(index){
				aLi[i].onmouseover=function(){
					aLi[index].className='j-b2-l-bli';
				}

				aLi[i].onmouseout=function(){
					aLi[index].className='';
		}
			})(i)
		}




		// 轮播淡入淡出
	function picture_pre(arr){
		var newimages=[];
		var arr=(typeof arr!="object")? [arr] : arr;  //确保参数总是数组
		for (var i=0; i<arr.length; i++){
			newimages[i]=new Image();
			newimages[i].src=arr[i]
		}
		if(newimages.length==arr.length){
		var oDiv=document.getElementById('b2-r');
		var oImg=oDiv.getElementsByTagName('img')[0];
		var now=0;
		var aSpan=[];
		
		 var aPath=['mg0c','mg1c','mg4c','mg2c','mg10c'];
		var width=1000;
		var height=500;
	
		var oBtn=document.getElementById('btn');
		var now=0; 
	
		var oSpan=document.createElement('div');
				oSpan.style.width=width+'px';
				oSpan.style.height=height+'px';
				oSpan.className='b2-r-span';
				oDiv.appendChild(oSpan);
				
		//轮播圆点对应图片    .b2-r-ul li:hover{background: #a9806c;}
		var oUl_y=document.getElementById('b2-r-ul');
		var aLi_y=oUl_y.getElementsByTagName('li');
		var bFla=false;
			aLi_y[now].style.background='#a9806c';
				for (var i=0; i<aLi_y.length; i++)
			{
			(function (index){
				
					aLi_y[i].onmouseover=function (ev){
					var oEvent=ev || event;
					
						aLi_y[index].style.background='#a9806c';
						now=index;
						clearInterval(oDiv.timer1);
						tab();
				};	
			})(i);
			}
					
			//下一个
			var oNext=document.getElementById('b2-r-next');
			oNext.onclick=function(){
					
					if(bFla){
						return;	
					}
					
					bFla=true;
					
					now++;
					
					tab();	
			};
			//阻止双击选中
			oNext.onmousedown=function(ev){
			//	ev.preventDefault && ev.preventDefault();
				return false;
			}
			var oPa=document.getElementById('b2-r-prev-em1');
			oNext.onmouseover=function(){
				if(document.getElementsByClassName){
					oPa.style.opacity='0.5' ;
				}else{
					oPa.style.filter='alpha(opacity:50)' ;
				}
			};
			oNext.onmouseout=function(){
				if(document.getElementsByClassName){
					
					oPa.style.opacity='0.2' 
				}else{
					oPa.style.filter='alpha(opacity:20)' ; 
				}
			};
			
			// 上一个
			var oPrev=document.getElementById('b2-r-prev');
			oPrev.onclick=function (){
	
				if(bFla){
					return;
				}
				
				bFla=true;
				now--;
				
				if (now == -1)
				{
					now=aLi_y.length-1;
				}
	
				tab();
			};
			//阻止双击选中
			oPrev.onmousedown=function(ev){
			//	ev.preventDefault && ev.preventDefault();
				return false;	
			}
			
			var oPa1=document.getElementById('b2-r-prev-em');
			oPrev.onmouseover=function(){
				if(document.getElementsByClassName){
					oPa1.style.opacity='0.5' ;
				}else{
					oPa1.style.filter='alpha(opacity:50)' ;
				}

			};
			oPrev.onmouseout=function(){
				if(document.getElementsByClassName){
					
					oPa1.style.opacity='0.2' 
				}else{
					oPa1.style.filter='alpha(opacity:20)' ; 
				}
			};
			
		
		oDiv.timer1=setInterval(next,3000)
		
		oDiv.onmouseover=function(){
			oNext.style.display='block';
			oPrev.style.display='block';
			clearInterval(oDiv.timer1);
		};
	
		oDiv.onmouseout=function (){
			oNext.style.display='none';
			oPrev.style.display='none';
			oDiv.timer1=setInterval(next,3000)
	
		};
		
		
		function next (){
		
					now++;
					
					tab();
	
			}
			
		function tab(){
				oSpan.style.opacity=0;	
				oSpan.style.filter='alpha(opacity:0)';
				for(var i=0; i<aLi_y.length; i++){
					aLi_y[i].style.background='#3b3c50';	
				}
				aLi_y[now%5].style.background='#a9806c';
				
				oSpan.style.backgroundImage='url(img/'+aPath[now%5]+'.jpg)';
				
					move(oSpan,{'opacity':1},{
						complete:function(){
							oSpan.style.opacity=1;
							oSpan.style.filter='alpha(opacity:100)';
							bFla=false;
							oImg.src='img/'+aPath[now%5]+'.jpg';
						}	
					})					
					
		};

	}
	}

	 picture_pre(['img/mg0c.jpg','img/mg1c.jpg','img/mg4c.jpg','img/mg2c.jpg','img/mg10c.jpg']) 


		//标题栏运动
		var oDl=document.getElementById('b1-dl');
		var aDd=oDl.children;
		  var oBox=aDd[aDd.length-1];
		  
            for(var i=0; i<aDd.length-1; i++){
               aDd[i].onmouseover=function(){
                    //oBox.style.left=this.offsetLeft+'px';
                    startMove(oBox,this.offsetLeft);
                };
              aDd[i].onmouseout=function(){
                    startMove(oBox,0);
                };
            }
	})();
	
		/*搜索框*/
	(function(){
		var oT=document.getElementById('t1');	
	var oSou_ul=document.getElementById('sou_ul');
	var oSou_tijiao=document.getElementById('tijiao');
	var sou_iNow=-1;
	var oldValue='';
	var sou_arr=[];
	
	
	oT.focus();
			
			//显示百度或者好搜
			var oSou_di=document.getElementById('sou_di');
			var aSou_i=oSou_di.getElementsByTagName('i');
			var b=true;
			var haosou_url='http://sug.so.360.cn/suggest';
			var baidu_url='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su';
			for(var i=0; i<aSou_i.length; i++){
				aSou_i[i].onclick=function(){
					if(b){
						for(var i=0; i<aSou_i.length; i++){
							aSou_i[i].style.display='block';
						}
						b=false;	
					}else{
						oSou_di.removeChild(this);
						oSou_di.insertBefore(this,oSou_di.children[0]);	
						switch(oSou_di.children[0].className){
							case 'haosou':
								oSou_tijiao.value='好搜一下';
								oSou_tijiao.className='tijiao sou_haosou';
								break;
							case 'baidu':
								oSou_tijiao.value='百度一下';
								oSou_tijiao.className='tijiao sou_baidu';
								break;
							case 'sougou':
								oSou_tijiao.value='搜狗搜索';
								oSou_tijiao.className='tijiao sou_sougou';
								break;
						}
						for(var i=0; i<aSou_i.length; i++){
							oSou_di.children[i].style.top=i*aSou_i[i].offsetHeight+'px';
							aSou_i[i].style.display='none';
						}
						this.style.display='block';
						b=true;
						
					}
					
				}
			}
	oT.onblur=function(){
		setTimeout(function(){
			oSou_ul.style.display='none';	
		},0)
	}
	oT.onkeyup=function(ev){
		var oEvent=ev || event;
		if(oEvent.keyCode==40 || oEvent.keyCode==38){
			return;	
		}
		
		if(oEvent.keyCode==13){
			sou_open(oSou_di,oT.value)
			oT.value='';
		}
		switch(oSou_di.children[0].className){
			case 'haosou':
				jsonpDiao(haosou_url)
				break;
			case 'baidu':
				jsonpDiao(baidu_url)
				break;
			case 'sougou':
				sou_gou()
				break;
		}
/*			alert(oSou_di.children[0].className)
			jsonpDiao(sou_url)
*/	
		 oldValue=oT.value;
	};
	oT.onkeydown=function(ev){
		var oEvent=ev || event;
		var aLi=oSou_ul.children;
		oT.onfocus=function(){
			setTimeout(function(){
				oSou_ul.style.display='block';
			},200)
				switch(oSou_di.children[0].className){
					case 'haosou':
						jsonpDiao(haosou_url)
						break;
					case 'baidu':
						jsonpDiao(baidu_url)
						break;
					case 'sougou':
						sou_gou()
						break;
			}
		}
		if(oEvent.keyCode == 40){
			sou_iNow++;
			if(sou_iNow==aLi.length)sou_iNow=-1;
			
			for(var i=0; i<aLi.length; i++){
				aLi[i].className='sou_ul_li';
			}
			
			if(sou_iNow==-1){
				oT.value=oldValue;
			}else{
				aLi[sou_iNow].className='sou_on sou_ul_li';		
				oT.value=aLi[sou_iNow].innerHTML;
			}
		}else if(oEvent.keyCode == 38){
			sou_iNow--;
			if(sou_iNow==-2)sou_iNow=aLi.length-1;
			for(var i=0; i<aLi.length; i++){
				aLi[i].className='sou_ul_li';
			}
			if(sou_iNow==-1){	
				oT.value=oldValue;
			}else{
				aLi[sou_iNow].className='sou_on sou_ul_li';
				oT.value=aLi[sou_iNow].innerHTML;
			}
				
			//	return false;
		}
	
	};
	
	//封装搜狗jsonp调用
	function sou_gou(){
	window.ssdd=oT.value;
	if(oT.value == ''){
		window.ssdd=' ';		
	}
	sgJsonp({
			data:ssdd,
			url:'https://www.sogou.com/suggnew/ajajjson?key=',
			urlh:'&type=web',
			success:function(arr){
				suc(arr,oSou_ul,oSou_tijiao,oT,oSou_di)
			}
		})	
	}


	//封装sonp调用
		function jsonpDiao(url){
			switch(url){
				case baidu_url:
					jsonp({
					url:url,
					data:{
						wd:oT.value,
					},
					cbName:'cb',
					success:function(json){	
							suc(json,oSou_ul,oSou_tijiao,oT,oSou_di)
						}	
					});
					break;
				
				case haosou_url:
					jsonp({
					url:url,
					data:{
						word:oT.value,  
						encodein:'utf-8',
						encodeout:'utf-8'
					},
					cbName:'callback',
					success:function(json){	
							suc(json,oSou_ul,oSou_tijiao,oT,oSou_di)
						}	
					});
					break;
			}
		}
	})()
	
};
