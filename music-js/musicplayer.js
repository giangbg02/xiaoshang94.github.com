// JavaScript Document
var arrSong=[
			'The Sore Feet Song',
			'Big Big World',
			'天空之城钢琴曲',
			'羽泉-奔跑 (2013羽泉版)',
			'后会无期',
			'蒲公英的约定',
			'青花瓷',
			'清明雨上',
			'孙燕姿-遇见',
			'王强-秋天不回来',
		];
		function rnd(n,m){
			return parseInt(Math.random()*(m-n))+n;
		}
		window.onload=function(){
		
			/***泡泡***/
			var oBof=document.querySelector('.bofang');
			var oPaopao=document.querySelector('.paopao');
			(function(){
				var ptimer1=null;
				var ptimer2=null;
				var ptimer3=null;	
				var oPn=true;
				var R=oPaopao.offsetWidth/2;
				var oPp1=document.querySelector('.pp1'); 
				var oPp2=document.querySelector('.pp2');
				var oPp3=document.querySelector('.pp3');	
				
				oPp1.style.display='block';
				
				oBof.focus();
				if(oPn){
					oPmove()	
				}
				window.onfocus=function(){		
					oPmove()
				}
				
				window.onblur=function(){
					 oPn=false;
					clearInterval(ptimer1)
					clearInterval(ptimer2)
					clearInterval(ptimer3)
				}
				
							//泡泡具体的运动
				function oPmove(){
					function run(obj1){
					Pmove(obj1,{
						'width':52,
						'height':52,
						'marginLeft':-26,
						'marginTop':-26
						},{
						'duration':800,
						'complete':function(){
							Pmove(obj1,{'opacity':0.3,'top':-150},{'duration':1800,'complete':function(){
								obj1.style.opacity=1;	
								obj1.style.width='16px';
								obj1.style.height='16px';
								obj1.marginLeft='-8px';
								obj1.marginTop='-8px';
							}})
						}
					},R)	
				}
					run(oPp1)
					run(oPp2)
					run(oPp3)
					ptimer1=setInterval(function(){run(oPp1)}, 3200);
					ptimer2=setInterval(function(){run(oPp2)}, 3600);	
					ptimer3=setInterval(function(){run(oPp3)}, 2700);			
					
					}	
			})()
		/*******/


			var oA=document.querySelector('#a1');
			var aA=document.querySelectorAll('.zbl-p li a');
			var oLrc=document.querySelector('.geci');
			var iNow=0;
			var lrc_ttzz=0; //避免和拖拽点击以及播放重复创建歌词

			for(var i=0; i<aA.length; i++){
				(function(index){
					aA[i].onclick=function(){
						iNow=index;
						play(iNow);
						oBof.title="暂停";
						oBof.style.background='url(img/xiaoyuszanting.png)no-repeat center center';
						lrc_ttzz++;
					}
				})(i);
			}

			//默认第一个样式this
			//切换模式
			var aLi=document.querySelectorAll('.shunx li');
			aLi[0].onclick=function(){
				sty(this);
				oA.dataset.mode='cycle';
			};
			aLi[1].onclick=function(){
				sty(this);
				oA.dataset.mode='single';
			};
			aLi[2].onclick=function(){
				sty(this);
				oA.dataset.mode='random';
			};
			aLi[3].onclick=function(){
				sty(this);
				oA.dataset.mode='order';
			};

			sty(aLi[0]);

			function sty(th){
				for(var i=0; i<aLi.length; i++){
					aLi[i].style.boxShadow='';
				}
				th.style.boxShadow='inset 0px 0px 20px rgba(0,0,0,0.4)';
			}
			

			//播放进度条
			var oJindu=document.querySelector('.jindutiao');
			var oFang=document.querySelector('.jy');
			window.jdWidth=194;
			var fWidth=15;
			var iJ=0;
			
			//进度条拖拽
				oFang.onmousedown=function(ev){
					var disX=ev.clientX-oFang.offsetLeft;
					ev.cancelBubble=true;
					document.onmousemove=function(ev){
						var Left=ev.clientX-disX;
						oFang.style.left=pd(Left)+'px';
						oA.currentTime=pd(Left)/jdWidth*oA.duration;		
						if(lrc_ttzz < 1){
							lrc_too(iNow);
							aA[iNow%10].className='on';	
						}	
						lrc_ttzz++;		
					}
					document.onmouseup=function(){
						document.onmousemove=null;
						document.onmouseup=null;
					}
				}

				
			
			//进度条点击
				oJindu.onmousedown=function(ev){
					var oJleft=oJindu.offsetLeft+oJindu.parentNode.offsetLeft+oJindu.parentNode.parentNode.offsetLeft;
					var Left=ev.clientX-oJleft-fWidth/2;				
					oFang.style.left=pd(Left)+'px';
					oA.currentTime=pd(Left)/jdWidth*oA.duration;

					if(lrc_ttzz < 1){
						lrc_too(iNow);
						aA[iNow%10].className='on';	
					}	
					lrc_ttzz++;	
					document.onmouseup=function(){
						document.onmousemove=null;
						document.onmouseup=null;
					}
				}
			

			oA.onended=function(){
														 lrc_rem=0;
														 oLrc.innerHTML='';
														
														switch(oA.dataset.mode){
															case 'order':
																iNow++;
																if(iNow==arrSong.length){
																oA.pause();
																	clear();
																	oLrc.innerHTML='';
																	oBof.style.background='url(img/xiaoyusbofang.png)no-repeat center center';
																	return;
																}else {
																	play(iNow);
																}
																break;
															case 'single':
																play(iNow);
																break;
															case 'random':
																iNow=rnd(0,arrSong.length);
																play(iNow);
																break;
															case 'cycle':
																iNow++;
																if(iNow==arrSong.length){
																	iNow=0;
																}
																play(iNow);
																break;
										
															default:
																iNow++;
																if(iNow==arrSong.length){
																	iNow=0;
																}
																play(iNow);
																break;
										
														}/*判断*/
														
			}
			
			//自动同步进度
			oA.ontimeupdate=function(){
			
					oFang.style.left=oA.currentTime/oA.duration*jdWidth+'px';
					iJ=oA.currentTime;
			}
		
				//播放或者暂停
				oBof.onclick=function(){
					bz();
				}
				
				function bz(){
					if(oBof.title=="播放"){
						
						oBof.title="暂停";
						oBof.style.background='url(img/xiaoyuszanting.png)no-repeat center center';
						oA.play();
						if(iNow == 10){
							aA[iNow-1].className='on';
							lrc_too(iNow-1);		
						}else{
							aA[iNow].className='on';
						}
						//创建歌词避免暂停再开始多余的运动，也避免和进度条拖拽和点击重复
						if(lrc_ttzz < 1){
							lrc_too(iNow);		
						}
						lrc_ttzz++;
					}else{
						oBof.title="播放";
						oBof.style.background='url(img/xiaoyusbofang.png)no-repeat center center';
						oA.pause();

					}	
				};
				
				//下一曲
				var oNext=document.querySelector('.xiayiqu');
				oNext.onclick=function(){
						iNow++;
						if(iNow>arrSong.length-1){
							iNow=0;
						}
						play(iNow);
						oBof.title="暂停";
						oBof.style.background='url(img/xiaoyuszanting.png)no-repeat center center';
				}
				//上一曲
				var oPrev=document.querySelector('.shangyi')
				oPrev.onclick=function(){
						iNow--;
						if(iNow<0){
							iNow=arrSong.length-1;
						}
						play(iNow);
						oBof.title="暂停";
						oBof.style.background='url(img/xiaoyuszanting.png)no-repeat center center';
				}
				

			//静音
			var oMute=document.querySelector('.yinliang');
			oMute.ondblclick=function(){
				if(oA.muted){
					oA.muted=false;
					oMute.title="静音";
					oMute.style.background='url(img/xiaoyuyinliang.png) no-repeat';
				}else{
					oA.muted=true;
					oMute.title="音量";
					oMute.style.background='url(img/jingyin1.png) no-repeat';

				};
			};

				  //弧形拖拽
					var oJyuan=document.getElementById('j-yuan');
					window.a=18; // 角度
					window.mina=18;
					window.maxa=58;
					var R=oJyuan.offsetWidth/2;
					oMute.onmousedown=function (ev){
						var oldX=ev.clientX;
						document.onmousemove=function(ev){
							var newX=ev.clientX;
							if(newX-oldX > 0){
								a+=0.5;
							}else{
								a-=0.5;
							}
							ylld(a);

						}
						document.onmouseup=function(){
							document.onmousemove=null;
							document.onmouseup=null;
						}

					};
					
					
			//快进、音量  用按键控制
			document.onkeydown=function(ev){
				switch(ev.keyCode){
					case 39:
						iJ+=2;
						oA.currentTime=iJ;
						return false;
						break;
						
					case 37:
						iJ-=2;
						oA.currentTime=iJ;
						return false;
						break;
						
					case 38:
						if(oA.volume<1){
							if(oA.volume<=0.9){
								oA.volume+=0.1;
								ylld(mta(oA.volume));
							}else if(oA.volume>0.9){
								oA.volume=1;
								ylld(mta(oA.volume));
							}
						}
						return false;
						break;
						
					case 40:
						if(oA.volume>0){
							if(oA.volume>=0.1){
								oA.volume-=0.1;
								ylld(mta(oA.volume));
							}else if(oA.volume<0.1){ 
								oA.volume=0;
								ylld(mta(oA.volume));
							}
						}
						return false;
						break;
						
					case 32:
						bz();
						return false;
						break;
						 
				}
			}


					function ylld(a){
							if(a <= mina){
								a=mina;
							}else if(a>=maxa){
								a=maxa;
							}
							
							oA.volume=1-(a-mina)/(maxa-mina);
							
							if(oA.volume<=0){
								oMute.style.background='url(img/jingyin1.png) no-repeat';
							}else{
								oMute.style.background='url(img/xiaoyuyinliang.png) no-repeat';
							}
							
							var x=R+Math.sin(a2d(a))*R;
							var y=R-Math.cos(a2d(a))*R;

							oMute.style.left=x+'px';
							oMute.style.top=y+'px';
							oMute.style.marginLeft=-14+'px';
							oMute.style.marginTop=-14+'px';	
					}
					
					function mta(vol){
						return (1-vol)*(maxa-mina)+mina;
					}

					function a2d(a)
					{
						return a*Math.PI/180;
					}
							
};

			function pd(left){
				if(left<=0){
						left=0;
					}else if(left>=jdWidth){
						left=jdWidth-2;
					};
					return left;
			}
