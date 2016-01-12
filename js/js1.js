
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
		if(newimages[0].src.onload){
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
			
			aLi_y[now].style.background='#a9806c';
				for (var i=0; i<aLi_y.length; i++)
			{
			(function (index){
				
				aLi_y[i].onmouseover=function (){
					aLi_y[index].style.background='#a9806c';
					now=index;
					clearInterval(oDiv.timer1);
					tab()
				};
			})(i);
			}
			
			
			
			//下一个
			var oNext=document.getElementById('b2-r-next');
			oNext.onclick=next;
			oNext.onmouseover=function(){
				this.style.background='rgba(0,0,0,.5)';
			};
			oNext.onmouseout=function(){
				this.style.background='rgba(0,0,0,.3)';
			};
			
			// 上一个
			var oPrev=document.getElementById('b2-r-prev');
			oPrev.onclick=function (){
				now--;
				
				if (now == -1)
				{
					now=aLi_y.length-1;
				}
				
				tab();
			};
			oPrev.onmouseover=function(){
				this.style.background='rgba(0,0,0,.5)';
			};
			oPrev.onmouseout=function(){
				this.style.background='rgba(0,0,0,.3)';
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
			var bFlag=false;
			if (bFlag)
				{
					return;
				}
				
				bFlag=true;
				
					
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
};
