$(document).ready(function(){
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

      var storageRef=firebase.storage();

  		var u_ref=firebase.database().ref("users");
  		var auth=firebase.auth();
  		var dis_Name;
  		var pas;
  		var conf_pas;
  		var mail;
      var file_nm;
      var pro_url;

      //SIGN OUT EXISTING USER
  var flag=auth.currentUser;
  if(flag){
    auth.signOut();
  }

      //FILE NAME FETCH
      $(".pro_pic").on("change",function (e)
      {
      file_nm = e.target.files[0];
      });
      

  		$("._btn").on("click",function(){
  			dis_Name=$("._name").val();
  			mail=$("._email").val();
  			pas=$("._pas").val();
  			conf_pas=$("._repas").val();






  			if(dis_Name!=null && mail!=null && pas==conf_pas && file_nm!=null)
  			{
         
  				var promise=auth.createUserWithEmailAndPassword(mail,pas);
  				promise.then(function(){
  					toastr.info("Breath in...Breathe Out....In....Out.....ITS UNDER PROCESS!!");
  					var login=auth.signInWithEmailAndPassword(mail,pas);





  					login.then(user => {
          

            //UPLOAD FILE PROFIEL PIC
          var propic_Path=storageRef.ref("profile_pic/"+file_nm.name);
          var task=propic_Path.put(file_nm);
          
          //ON FILE UPLOAD SUCCESS
          task.then(snap3 =>{
              storageRef.ref("profile_pic/"+file_nm.name).getDownloadURL().then(url => {


                //AFTER PIC IS UPLOADED

            user.updateProfile({
                displayName:dis_Name,
                photoURL:url
            });
            var obj=
            {
                [user.uid] :
                {
                name : dis_Name,
                profile_pic : url,
                email : mail,
                pass : pas
                }
            }
            var promise1=u_ref.update(obj).catch(snap=>toastr.error(snap.message)).then(toastr.warning("Account Created!"));
            promise1.then(snap => window.location = "/index.html");
            firebase.auth().signOut();


              });
          });

         

  					});
  				});
  				promise.catch(snap=>toastr.error(snap.message));
  			}
  			else if(pas!=conf_pas){
  				toastr.error("The passwords does not Match!");
  			}
        else if(file_nm==null){
          toastr.error("Select a picture");
        }
  		});
});