var email_txt = document.getElementById("email_id");
var pass_txt = document.getElementById("password_id");
var wrong_msg = document.getElementById("wrong_info");
var logged_msg = document.getElementById("logged_info");
var log = document.getElementById("login-out"); 

function login(){
	if (email_txt.value =='free2Owater@gmail.com' && pass_txt.value == 'free2Owater1234') {
		logged_msg.style.display = 'block';
		wrong_msg.style.display = 'none';
		email_txt.value = "";
		pass_txt.value = "";
		alert('Successfully logged in');
		log.innerHTML = "Logout"
	}
	else{
		wrong_msg.style.display = 'block';
	}
}
function toggle(){
	if(log.innerHTML==='Logout'){
		alert('Successfully logged out');
		log.innerHTML = 'Login';
	}
}