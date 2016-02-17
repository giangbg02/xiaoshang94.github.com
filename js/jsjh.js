// JavaScript Document


function sou_open(oSou_di,oTdata){
	switch(oSou_di.children[0].className){
				case 'haosou':
					window.open('http://www.haosou.com/s?q='+oTdata,'_blank');
					break;
				case 'baidu':
					window.open('https://www.baidu.com/s?wd='+oTdata,'_blank');
					break;
				case 'sougou':
					window.open('https://www.sogou.com/web?query='+oTdata,'_blank');
					break;
		}		
}


//数据，下拉框，搜索按钮，输入框，图标总
function suc(json,oSou_ul,oSou_tijiao,oT,oSou_di){
						if(json.length == undefined){
							sou_arr=json.s;
						}else{
							sou_arr=json[1];
						}
						
						oSou_ul.innerHTML='';
						//判断下拉框是否显示
						sou_arr.length?oSou_ul.style.display='block':oSou_ul.style.display='none';
												
						for(var i=0; i<sou_arr.length; i++){
							var oLi=document.createElement('li');
							oLi.innerHTML=sou_arr[i];
							oLi.className='sou_ul_li';
							oSou_ul.appendChild(oLi);
								
							//鼠标移入
							(function(index){
								oLi.onmouseover=function(){
									for(var i=0; i<oSou_ul.children.length; i++){
										oSou_ul.children[i].className='sou_ul_li';
									}
									this.className='sou_ul_li sou_on';
								}									
								oLi.onmouseout=function(){
									for(var i=0; i<oSou_ul.children.length; i++){
										oSou_ul.children[i].className='sou_ul_li';
									}
								}
								//鼠标点击
								oLi.onmousedown=function(){
									sou_open(oSou_di,this.innerHTML)
									oT.onblur=function(){
											oSou_ul.style.display='none';	
									}
									oT.value='';
								}
								oSou_tijiao.onmousedown=function(){
									sou_open(oSou_di,oT.value)
									oT.onblur=function(){
											oSou_ul.style.display='none';	
									}
									oT.value='';
								}
							})(i)
						}	
	
}