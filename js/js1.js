
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
	
	oDiv.timer1=setInterval(lunbo,3000)
	oDiv.onmouseover=function(){
		clearInterval(oDiv.timer1);
	};

	oDiv.onmouseout=function (){
		oDiv.timer1=setInterval(lunbo,3000)

	};
	
	
	function lunbo (){
		var bFlag=false;
		if (bFlag)
			{
				return;
			}
			
			bFlag=true;
			
			oSpan.style.opacity=0;	
			now++;

			oSpan.style.backgroundImage='url(img/'+aPath[now%5]+'.jpg)';
			
				move(oSpan,{opacity:1},{
					complete:function(){
						oSpan.style.opacity=1;
						oImg.src='img/'+aPath[now%5]+'.jpg';
					}	
				})
		}
		
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
};
