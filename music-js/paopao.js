// JavaScript Document
		function paopao(obj,R,lar){
			
			var lar=lar || 2;
			
			var x=0;
			var y=0;
			var a=200;
			var bFn=0;	
			var time=setInterval(function(){
				if(a < 240){
				a+=lar;
				x=R+Math.sin(a2d(a))*R;
				y=R-Math.cos(a2d(a))*R;		
				obj.style.left=x+'px';
				obj.style.top=y+'px';	
				console.log(y)
			}else if(a >= 240){
					if(bFn < 3){
						x-=(3-bFn)*1;
						obj.style.left=x+'px';	
					}			
					y-=lar*3;
					obj.style.top=y+'px';
					bFn++;
					if(y<-150){
						clearInterval(time);
					}
				}
			},30)
			move(obj,{
				'opacity':0.8,
				'width':50,
				'height':50,
				'marginLeft':-25,
				'marginTop':-25
				},{
				'duration':800,
				'complete':function(){
					move(obj,{'opacity':0.3},{'duration':1200,'complete':function(){
						obj.style.opacity=1;	
						obj.style.width='20px';
						obj.style.height='20px';
						obj.marginLeft='-10px';
						obj.marginTop='-10px';
/*						obj.style.left=63.165+'px';
						obj.style.top=194.646+'px';*/
					}})
				}
			})
		}



	//角度转弧度
	function a2d(a){
		return a*Math.PI/180;
	}
