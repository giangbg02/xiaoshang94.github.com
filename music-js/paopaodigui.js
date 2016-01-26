	function move(obj, json, options,R)
	{
		options=options || {};
		var duration=options.duration || 800;
		var easing=options.easing || Tween.Linear;
		var R=R || false;
		
		var start={};
		var dis={};
		for (var name in json)
		{
			start[name]=parseFloat(getStyle(obj, name));
			dis[name]=json[name]-start[name];
		}
		var count=Math.floor(duration/30);
		var n=0;
		
		var lar=lar || 2;
		var x=0;
		var y=0;
		var a=200;
		var bFn=0;	
			if(R){
				clearInterval(obj.timer1);
				obj.timer1=setInterval(function (){
					n++;			
					//alert('进入'+a)
				//	if(a < 240){  
					a+=lar;
					x=R+Math.sin(a2d(a))*R;
					y=R-Math.cos(a2d(a))*R;		
					obj.style.left=x+'px';
					obj.style.top=y+'px';	
					for (var name in json)
						{
							var cur=easing(duration*n/count, start[name], dis[name], duration);
							if (name == 'opacity')
							{
								obj.style[name]=cur;
								obj.style.filter='alpha(opacity:'+(cur*100)+')';
							}
							else
							{
								obj.style[name]=cur+'px';
							}
						}
						
					if (n == count)
					{
						clearInterval(obj.timer1);
						options.complete && options.complete(); 
					}	
					
				},30);
		 	}else{
				clearInterval(obj.timer2);
				obj.timer2=setInterval(function (){
					n++;
					// 更改样式
					for (var name in json)
					{
						var cur=easing(duration*n/count, start[name], dis[name], duration);
						
						if (name == 'opacity')
						{
							obj.style[name]=cur;
							obj.style.filter='alpha(opacity:'+(cur*100)+')';
						}
						else
						{
							obj.style[name]=cur+'px';
						}
					}
					
					if (n == count || obj.style.opacity>=0.99)
					{
						clearInterval(obj.timer2);
						options.complete && options.complete(); 
					}	
				},30)
				
			}
			
		


	
//角度转弧度
function a2d(a){
	return a*Math.PI/180;
}

function getStyle(obj, sName)
{
	return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}

	
}


