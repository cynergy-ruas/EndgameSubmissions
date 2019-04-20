$(document).ready(function() {
	toastr.options = {
  	"closeButton": false,
  	"debug": false,
    "newestOnTop": true,
  	"progressBar": true,
  	"positionClass": "toast-bottom-full-width",
  	"preventDuplicates": true,
  	"showDuration": "600",
  	"hideDuration": "1000",
  	"timeOut": "10000",
  	"extendedTimeOut": "1000",
  	"showEasing": "swing",
  	"hideEasing": "linear",
  	"showMethod": "fadeIn",
  	"hideMethod": "fadeOut"
	}
	var config = {
		apiKey: "AIzaSyCjbdEvMBGf4u9ZMBd9QaTWVhcoiFNh8Lo",
		authDomain: "mydumbidea-f425a.firebaseapp.com",
		databaseURL: "https://mydumbidea-f425a.firebaseio.com",
		projectId: "mydumbidea-f425a",
		storageBucket: "mydumbidea-f425a.appspot.com",
		messagingSenderId: "887916085308"
};
  		firebase.initializeApp(config);
	var auth=firebase.auth();
  	var room_ref=firebase.database().ref("rooms");
    $(".close").on("click",function(){
      $(".overlay").css({"opacity":"0","z-index":"-1"});
    });
  	$("._create").on("click",function()
  		{

  				
 			var em=$(".mail").val();
  			var ps=$(".pass").val();
  			var rm=$(".romn").val();
  			var fname="room_"+rm;
 			var promise=auth.signInWithEmailAndPassword(em,ps);
  			promise.catch(function(snap)
  				{
  					toastr.error(snap.message);
  				});
  			var user = firebase.auth().currentUser;

			if (user!=null && rm!="" )//IF U READING THIS,IT HAS DATABASE RULES,JUST SAYING ;)
			{
        var err_lol=1;
				var data =
				{
					[fname]:
					{
						roomname : rm,
						creator : user.displayName
					}
				};
				var x=room_ref.update(data);
        x.then(snap => window.location = "http://www.endchat.tk/index.html");
        x.catch(snap => {
          toastr.error("A room with this name already exits!");
          err_lol=0;
        });

        x.then(snap =>{
          if(err_lol==1){
            toastr.warning("Room "+rm+" was created!");
            firebase.auth().signOut();
            $(".rm_id").text(rm);
            $(".overlay").css({"opacity":"1","z-index":"10"});
              }
         });
			}
			else if(rm=="" || ps=="" || em==""){
 				toastr.error("Couldnt Create (FILL ALL TEXT AREAS)");
			}
			
  		});



});


