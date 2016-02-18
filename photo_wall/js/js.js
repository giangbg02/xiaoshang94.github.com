window.onload=function (){
	var aLi=document.getElementsByTagName('li');
	var zIndex=1;
	

	
	// 布局转换
	aPos=[];
	for (var i=0; i<aLi.length; i++)
	{
		aPos.push({
			left:aLi[i].offsetLeft,
			top:aLi[i].offsetTop
		});
	}
	
	for (var i=0; i<aLi.length; i++)
	{
		aLi[i].style.position='absolute';
		aLi[i].style.left=aPos[i].left+'px';
		aLi[i].style.top=aPos[i].top+'px';
		aLi[i].style.margin=0;
	}
	
	// 拖拽
	for (var i=0; i<aLi.length; i++)
	{
		aLi[i].index=i;
		drag(aLi[i]);
	}
	
	function drag(obj)
	{
		obj.onmousedown=function (ev){
			var oNear=null;
			obj.style.zIndex=zIndex++;
			var oEvent=ev || event;
			var disX=oEvent.clientX-obj.offsetLeft;
			var disY=oEvent.clientY-obj.offsetTop;
			
			document.onmousemove=function (ev){
				var oEvent=ev || event;
				var left=oEvent.clientX-disX;
				var top=oEvent.clientY-disY;
				
				obj.style.left=left+'px';
				obj.style.top=top+'px';
				
				// 找最近
				oNear=findNear(obj);
				if (oNear)
				{
					for (var i=0; i<aLi.length; i++)
					{
						aLi[i].className='';
					}
					oNear.className='active';
				}
				else
				{
					for (var i=0; i<aLi.length; i++)
					{
						aLi[i].className='';
					}
				}
			};
			
			document.onmouseup=function (){
				document.onmousemove=null;
				document.onmouseup=null;
				
				obj.releaseCapture && obj.releaseCapture();
				
				// 换位置
				if (oNear)
				{
					move(obj, aPos[oNear.index], {
						duration:1000,
						easing:Tween.Elastic.easeInOut
					});
					move(oNear, aPos[obj.index], {
						duration:1000,
						easing:Tween.Elastic.easeInOut
					});
					// 换下标
					var tmp=obj.index;
					obj.index=oNear.index;
					oNear.index=tmp;
					
					for (var i=0; i<aLi.length; i++)
					{
						aLi[i].className='';
					}
				}
				else
				{
					move(obj, aPos[obj.index], {
						duration:1000,
						easing:Tween.Elastic.easeIn
					});
				}
				
			};
			
			obj.setCapture && obj.setCapture();
			return false;
		};
	}
	
	function findNear(obj)
	{
		var nMinIndex=-1;
		var nMin=99999; // 距离
		
		for (var i=0; i<aLi.length; i++)
		{
			if (obj == aLi[i])
			{
				continue;
			}
			
			if (collTest(obj, aLi[i]))
			{
				// aLi[i] obj 碰上了、算距离
				var dis=getDis(obj, aLi[i]);
				
				if (dis < nMin)
				{
					nMin=dis;
					nMinIndex=i;
				}
			}
		}
		
		if (nMinIndex == -1)
		{
			return null;
		}
		else
		{
			return aLi[nMinIndex];
		}
		
	}
	
	function collTest(obj1, obj2)
	{
		var l1=obj1.offsetLeft;
		var r1=l1+obj1.offsetWidth;
		var t1=obj1.offsetTop;
		var b1=t1+obj1.offsetHeight;
		
		var l2=obj2.offsetLeft;
		var r2=l2+obj2.offsetWidth;
		var t2=obj2.offsetTop;
		var b2=t2+obj2.offsetHeight;
		
		if (l2>r1 || l1>r2 || t2>b1 || t1>b2)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	
	function getDis(obj1, obj2)
	{
		var a=obj1.offsetTop+obj1.offsetHeight/2-(obj2.offsetTop+obj2.offsetHeight/2);
		var b=obj1.offsetLeft+obj1.offsetWidth/2-(obj2.offsetLeft+obj2.offsetWidth/2);
		
		return Math.sqrt(a*a+b*b);
	}
};// JavaScript Document