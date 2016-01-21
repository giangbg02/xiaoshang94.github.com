// 封装ajax

function ajax(url,fnSucc,fnFail){
	if(window.XMLHttpRequest){
			var oAjax=new XMLHttpRequest();
		}else{
			var oAjax=new ActiveXObject('Microsoft.XMLHTTP')
		}

		//打开连接
		oAjax.open('GET',url,true);
		
		//发送请求
		oAjax.send();
		

		//接收数据
		oAjax.onreadystatechange=function(){
			if(oAjax.readyState == 4){
				if(oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304){
					fnSucc && fnSucc(oAjax.responseText);
				}else{
					fnFail && fnFail(oAjax.status);
				}
			}
		}
}
	