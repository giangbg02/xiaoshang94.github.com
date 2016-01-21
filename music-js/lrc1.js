//歌词滚动效果
window.onload=function(){
	var oA=document.querySelector('audio');
	var oLrc=document.querySelector('.geci');
	var timer=null;
	var musicNow=0;	
	var musicTime=[];
	var aLrc_h=[];
	var oLrc_h=0;
	var mus_url=[
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
	var lrc_reg=/[\u4e00-\u9fa5]/;
	var lrc_rem=0;
	var oLrc_ul=null;
	var json={};
	ajax('lyric/'+mus_url[0]+'.lrc',function(str){
		
		if(mus_url[0].search(lrc_reg) >= 0){
			str=decodeURI(str)
		}
		
		cfdy();
		function cfdy(){
			//把歌词转换为json格式
			 json=lrc(str);
			oLrc_ul=document.createElement('ul');
			oLrc_ul.className='lrc_ul';
			for(var name in json){
				var oLrc_li=document.createElement('li');
				oLrc_li.innerHTML=json[name];
				oLrc_ul.appendChild(oLrc_li);
			}
			oLrc.appendChild(oLrc_ul);	
		}
		
		
		
		
			for(var i=0; i<oLrc_ul.children.length; i++){
				aLrc_h.push(oLrc_ul.children[i].offsetHeight);
			}
			//alert(aLrc_h)
		
			timer=setInterval(function(){
				//如果处于播放状态
				if(!oA.paused){
					
					//把时间放在数组里
					musicTime=jsArr(json);
					
					//下一句歌词的初始化
					musicNow=0;
					for(var name in json){
						musicNow++;
						//如果到达最后一句，musicNow就直接等于最后歌词的时间不再++；
						if(musicNow >= jsArr(json).length-1){
							musicNow=jsArr(json).length-1;
							var zlrTime=lxs(parseInt(musicM.substring(0,2)*60)+parseFloat(musicM.substring(3)));
						}
						//当前歌词的时间
						var lrTime=lxs(parseInt(name.substring(0,2)*60)+parseFloat(name.substring(3)));
						//下一句歌词
						var musicM=musicTime[musicNow];
						//最后一句歌词的时间
						var lrTime1=lxs(parseInt(musicM.substring(0,2)*60)+parseFloat(musicM.substring(3)));
						
						//判断这句歌词和下一句歌词时间的区间
						if(oA.currentTime>=lrTime && oA.currentTime<lrTime1){
			
							//清空所有歌词样式
							for(var i=0; i<musicTime.length; i++){
								oLrc_ul.children[i].className='';
							}
							//给当前歌词设置样式
							oLrc_ul.children[musicNow-1].className='lrc_li1';
						
							//li的高度
							oLrc_h=-40;
							
								//把每一句歌词的高度存起来
								for(var i=0; i<musicNow-1; i++){
									oLrc_h=aLrc_h[i]+oLrc_h;
								}
								if(oLrc_h>=20){
									oLrc_ul.style.top=-oLrc_h+'px';	
								}
							//最后一句歌词所执行的操作
						}else if(oA.currentTime >= zlrTime){	
							//li的高度
							oLrc_h=-40;
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
								
								
							//播放完毕后数据初始化，避免oLrc.removeChild报错
							oA.onended=function(){
								oLrc.innerHTML='';
								 lrc_rem=0;
								cfdy();
							}
						}
					}
				}
			},30)	;
			
		
	},function(s){
		alert('失败了'+s)	
	})	
	
	function lxs(time){
		return time.toFixed(2);
	}
	
	//json转数组
	function jsArr(json1){
		var jsarr=[];
		for(var name in json1){
			jsarr.push(''+name);
		}
		return jsarr
	}
};