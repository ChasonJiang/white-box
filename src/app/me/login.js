function $(id) {
	return document.getElementById(id);
}


function checkreg() {
	var username = $("user").value;
	var passwd = $("pass").value;
	if(username==""){
	    alert("请输入用户名");
		focus($("user"));
		
	}else if(passwd == ""){
		alert("请输入密码");
		focus($("pass"));
	}else{
	    var user = localStorage.getItem(username);
	    if (user == null){
			alert("该用户名没有注册，请注册后登录");
	    }else if(user != passwd){
			alert("密码不正确，请重新输入")
	    }else{
			 localStorage.removeItem("nowuser");
	       localStorage.setItem("nowuser",username);
			
	        alert("登录成功!");
			setTimeout("javascript:location.href='index.html'", 1000); 
	    }
}
}

// function randominteger(){
// 	var int=Math.floor(Math.random()*256)
// }

// function createhexcolor(){
// 	var rc=randominteger().toString(16)
// 		var gc=randominteger().toString(16)
// 			var bc=randominteger().toString(16)
// 			var color1='#'+rc+gc+bc;
// 			return color1;
// }

// function changecolor(id){
// 	$(id).setAttribute("bgcolor",createhexcolor());
// }

