//歌词滚动效果

//歌词------------------------------------------------------------------------------------------
			var oA=document.querySelector('#a1');
			var aA=document.querySelectorAll('.zbl-p li a');
			function lrc_too(iNow){
							//歌词
							var oLrc=document.querySelector('.geci');
							var lrc_timer=null;
							var musicNow=0;	
							var musicTime=[];
							var aLrc_h=[];
							var oLrc_h=0;
							var lrc_reg=/[\u4e00-\u9fa5]/;
							var lrc_rem=0;
							var oLrc_ul=null;
							var lrc_json={};
							
							//ajax
							ajax('lyric/'+arrSong[iNow%10]+'.lrc',function(str){
								
								if(arrSong[iNow%10].search(lrc_reg) >= 0){
									str=decodeURI(str)
								}
							
								oLrc.innerHTML='';
								cfdy();
								
								function cfdy(){
									//把歌词转换为json格式
									 lrc_json=lrc(str);
									oLrc_ul=document.createElement('ul');
									oLrc_ul.className='lrc_ul';
									for(var name in lrc_json){
										var oLrc_li=document.createElement('li');
										oLrc_li.innerHTML=lrc_json[name];
										oLrc_ul.appendChild(oLrc_li);
									}
									oLrc.appendChild(oLrc_ul);	
								}
								
								
									for(var i=0; i<oLrc_ul.children.length; i++){
										aLrc_h.push(oLrc_ul.children[i].offsetHeight);
									}
									
								
									lrc_timer=setInterval(function(){
										//如果处于播放状态
										//if(!oA.paused){
											
											//把时间放在数组里
											musicTime=jsArr(lrc_json);
											
											//下一句歌词的初始化
											musicNow=0;
											for(var name in lrc_json){
												musicNow++;
												//如果到达最后一句，musicNow就直接等于最后歌词的时间不再++；
												if(musicNow >= jsArr(lrc_json).length-1){
													musicNow=jsArr(lrc_json).length-1;
													var zlrTime=lxs(parseInt(musicM.substring(0,2)*60)+parseFloat(musicM.substring(3)));
												}
												//当前歌词的时间
												var lrTime=lxs(parseInt(name.substring(0,2)*60)+parseFloat(name.substring(3)));
												//下一句歌词
												var musicM=musicTime[musicNow];
												//最后一句歌词的时间
												var lrTime1=lxs(parseInt(musicM.substring(0,2)*60)+parseFloat(musicM.substring(3)));
												
												//判断这句歌词和下一句歌词时间的区间
												if(oA.currentTime >= 0 && oA.currentTime < lxs(parseInt(musicTime[0].substring(0,2)*60)+parseFloat(musicTime[0].substring(3)))){
														for(var i=0; i<musicTime.length; i++){
															oLrc_ul.children[i].className='';
														}
														oLrc_ul.style.top=0;	
												}else if(oA.currentTime>=lrTime && oA.currentTime<lrTime1){
														
														
													//清空所有歌词样式
													for(var i=0; i<musicTime.length; i++){
							
														oLrc_ul.children[i].className='';
														
													}
													//给当前歌词设置样式
													oLrc_ul.children[musicNow-1].className='lrc_li1';
												
													//li的高度
													oLrc_h=0;
													
														//把每一句歌词的高度存起来
														for(var i=0; i<musicNow-1; i++){
															oLrc_h=aLrc_h[i]+oLrc_h;
														}
															oLrc_ul.style.top=-oLrc_h+'px';	
												
														
													//最后一句歌词所执行的操作
												}else if(oA.currentTime >= zlrTime){	
													//li的高度
													oLrc_h=0;
													//清空所有歌词样式
													for(var i=0; i<musicTime.length; i++){
														oLrc_ul.children[i].className='';
													}
													//给当前歌词设置样式
													oLrc_ul.children[musicNow].className='lrc_li1';
													
														for(var i=0; i<musicNow; i++){
															oLrc_h=aLrc_h[i]+oLrc_h;
														}
														oLrc_ul.style.top=-oLrc_h+'px';
														
												}
												
												//播放完毕后数据初始化，避免oLrc.removeChild报错
													oA.onended=function(){
														 lrc_rem=0;
														 oLrc.innerHTML='';
														
														switch(oA.dataset.mode){
															case 'order':
																iNow++;
																if(iNow==arrSong.length){
																	oA.pause();
																	clear();
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
																	oA.pause();
																	clear();
																	oLrc.innerHTML='';
																	return;
																}else {
																	play(iNow);
																}
																break;
										
														}/*判断*/
														
													}
											}
								//		}	
												
									},30)	;
										
							},function(s){
								 oLrc.innerHTML='暂无歌词';	
							})	
			}

			
			//封装函数
		
						function lxs(time){
							return time.toFixed(2);
						}
						
						//lrc_json转数组
						function jsArr(json1){
							var jsarr=[];
							for(var name in json1){
								jsarr.push(''+name);
							}
							return jsarr
						}	
						
			function play(n){
				oA.src='music/'+arrSong[n%10]+'.mp3';
				oA.play();
				clear();
				aA[n%10].className='on';	
				lrc_too(n);
				
			}
			
			function clear(){
				for(var i=0; i<aA.length; i++){
					aA[i].className='';
				}
			}
		