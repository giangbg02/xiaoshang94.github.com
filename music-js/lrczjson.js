//歌词转成json格式

	function lrc(url){
			var reg=/\[\d\d:\d\d.\d\d\]/g;
			var zst=url.match(reg)
			var n=0;
			//时间数组
			var ast=[];
			for(var i=0; i<zst.length; i++){
				ast.push(zst[i].replace(/^\[|\]$/g,''));	
			}
			
			//歌词数组
			var str1=url.split(reg);
			
			//时间和歌词组成json
			var json={};
			
			for(var i=0; i<ast.length; i++){
				json[ast[i]]=str1[i+1];
			}
			return json;	
	}		