var config = {
    apiKey: "AIzaSyCjbdEvMBGf4u9ZMBd9QaTWVhcoiFNh8Lo",
    authDomain: "mydumbidea-f425a.firebaseapp.com",
    databaseURL: "https://mydumbidea-f425a.firebaseio.com",
    projectId: "mydumbidea-f425a",
    storageBucket: "mydumbidea-f425a.appspot.com",
    messagingSenderId: "887916085308"
};
firebase.initializeApp(config);

$(document).ready(function() {
 
    var user_flag = firebase.auth().currentUser;
    var mail;
    var pas;
    var rm_id;
    var snd = new Audio("Assets/newmessage.mp3");// buffers automatically when created
    var initialLoad=false;
    var voice_ASS,blink;
    var focus=true;
    var blink;
    if(!localStorage.getItem("text_assist")){
        localStorage.setItem("text_assist","false");
    }
    //LOAD THE TEXT ASSISTENT
    var voice_ASS=localStorage.getItem("text_assist");
    console.log("VOICE ASSIST :"+voice_ASS);
    if(voice_ASS=="true"){
        $('#switch').prop('checked', true);                              
    }
    else{
        $('#switch').prop('checked', false);
    }
    //TOGGLE
    $("#switch").change(function() {
    if(this.checked) {
        voice_ASS="true";
        localStorage.setItem("text_assist","true");
    }
    else{
         voice_ASS="false";
        localStorage.setItem("text_assist","false");
    }
    });


     $(window).blur(function(){
            focus=false;
        });
    $(window).focus(function(){
             focus=true;
             document.title="ChatBox";
         });                   

    //closing set if open
    $('body').bind("keyup click",function(e){
    if(e.which == 27 && $(".set_overlay").css("visibility")=="visible"){
       $(".set_overlay").css({
                            "visibility": "hidden",
                            "opacity": "0"
                        });

    }
    else if(e.which == 27 && $(".set_overlay").css("visibility")=="hidden"){
       $(".set_overlay").css({
                            "visibility": "visible",
                            "opacity": "1"
                        });
       login.load_user_data();
    }
    });





    var login = {
        load_user_data : function()
        {
            $(".set_pic").attr("src", firebase.auth().currentUser.photoURL);
                        $(".disp_nm").val(firebase.auth().currentUser.displayName);
                        $(".mail").val(firebase.auth().currentUser.email);
                        $(".set_overlay").css({
                            "visibility": "visible",
                            "opacity": "1"
                        });
        },
        cusswords : function (text1)
        {
             var expanded=text1;
             return expanded;
         },
        validate : function(text){
            var new_String;
            var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            new_String=text.replace(exp,"<a target='_blank' href='$1'>$1</a>"); 
            var exps={
                      "/ [;][-][;]/gi":"<i class='em em-sob'></i>",
                      "/ [<][3]/gi":"<i class='em em-heart'></i>",
                      "/ [:][o] /gi":"<i class='em em-open_mouth'></i>",
                      "/ [:][D] /gi":"<i class='em em-grinning'></i>",
                      "/ [:][)] /gi":"<i class='em em-smile'></i>",
                      "/ xD /gi":"<i class='em em-laughing'></i>",
                      "/ 69 /gi":"<i class='em em-cancer'></i>",
                      "/ [-][_][-] /gi":"<i class='em em-expressionless'></i>",
                      "/ ass /gi":"<i class='em em-peach'></i>",
                      "/ [;][)] /gi":"<i class='em em-wink'></i>",
                      "/ cool /gi":"<i class='em em-sunglasses'></i>",
                      "/ [:]p /gi":"<i class='em em-stuck_out_tongue_closed_eyes'></i>"
                  };
            new_String=new_String.replace(/ xD /gi,exps[/ xD /gi]);
            new_String=new_String.replace(/ 69 /gi,exps[/ 69 /gi]);
            new_String=new_String.replace(/ [-][_][-] /gi,exps[/ [-][_][-] /gi]);
            new_String=new_String.replace(/^ass$/gi,exps[/ ass /gi]);
            new_String=new_String.replace(/ [;][)] /gi,exps[/ [;][)] /gi]);
            new_String=new_String.replace(/ cool /gi,exps[/  cool  /gi]);
            new_String=new_String.replace(/ [:]p /gi,exps[/ [:]p /gi]);
            new_String=new_String.replace(/ [:][)] /gi,exps[/ [:][)] /gi]);
            new_String=new_String.replace(/ [;][-][;] /gi,exps[/ [;][-][;] /gi]);
            new_String=new_String.replace(/ [:][D] /gi,exps[/ [:][D] /gi]);
            new_String=new_String.replace(/ [:][o] /gi,exps[/ [:][o] /gi]);
            new_String=new_String.replace(/ [<][3] /gi,exps[/ [<][3] /gi]);
            return new_String;  
            //return text;
            },



        lol: function(roomname) {
            loader(true);
            rm_id = $(".room_id").val();
            //toastr.warning("Succesfully logged in as "+snap.displayName);
            
            //FIND IS ROOM EXISTS
            db_room.once("value", snap2=>{

                var rmname = "room_" + rm_id;
                console.log(rmname);
                if (snap2.hasChild(rmname))
                {
                    pic_changed = true;
                    //FILE NAME FETCH
                    $(".set_DP").on("change", function(e) {
                        file_nm = e.target.files[0];
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            // get loaded data and render thumbnail.
                            $(".set_pic").attr("src", e.target.result);
                        }
                        reader.readAsDataURL(this.files[0]);

                    });
                    //OPENING SETTING OVERLAY

                    $(".setting_wrap").on("click", function() {
                        login.load_user_data();
                    });

                    //CLOSING SETTING OVERLAY

                    $(".canc").on("click", function() {
                        $(".set_overlay").css({
                            "visibility": "hidden",
                            "opacity": "0"
                        });
                    });

                    //MAKING CHAGES
                    $(".submi").on("click", function() {
                        pic_changed = true;
                    //FILE NAME FETCH
                    $(".set_DP").on("change", function(e) {
                        file_nm = e.target.files[0];
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            // get loaded data and render thumbnail.
                            $(".set_pic").attr("src", e.target.result);
                        }
                        reader.readAsDataURL(this.files[0]);

                    });
                        if (!pic_changed) {
                            
                            var promise;
                            console.log("CALLED");
                            //UPLOAD FILE PROFIEL PIC
                            var propic_Path = storageRef.ref("profile_pic/" + file_nm.name);
                            var task = propic_Path.put(file_nm);
                            //ON FILE UPLOAD SUCCESS
                            task.then(snap3=>{
                                storageRef.ref("profile_pic/" + file_nm.name).getDownloadURL().then(url=>{
                                    console.log(url);
                                    promise = auth.currentUser.updateProfile({
                                        displayName: $(".disp_nm").val(),
                                        photoURL: url
                                    });
                                    var temp = $(".disp_nm").val();
                                    console.log(temp);
                                    user_ref.child(auth.currentUser.uid).child("name").set(temp);
                                    promise.then(snap=>{
                                        $(".set_overlay").css({
                                            "visibility": "hidden",
                                            "opacity": "0"
                                        });
                                        toastr.success("Updated!!");
                                    }
                                    );
                                    promise.catch(snap=>toastr.error("Couldnt update :" + snap.message));
                                }
                                );
                            }
                            );

                        } else {
                            var promise = auth.currentUser.updateProfile({
                                displayName: $(".disp_nm").val()
                            });
                            promise.then(snap=>{
                                var temp = $(".disp_nm").val();
                                console.log(temp);
                                user_ref.child(auth.currentUser.uid).child("name").set(temp);
                            }
                            );
                            promise.then(snap=>{
                                $(".set_overlay").css({
                                    "visibility": "hidden",
                                    "opacity": "0"
                                });
                                toastr.success("Updated!!");
                            }
                            );
                            promise.catch(snap=>toastr.error("Coulndt update" + snap.message));
                        }
                    });
                    //DP FFS
                    $(".set_DP").on("click", function(e) {
                        e.stopPropagation()
                    });

                    $(".upload_wrap").on("click", function(event) {

                        $(".set_DP").click();

                    });

                    var data_ref = firebase.database().ref("rooms/" + rmname + "/messages/");
                    var username = auth.currentUser.displayName;
                    //toastr.warning("The room exists!");
                    $(".overlay").css({
                        "visibility": "hidden"
                    });
                    
                    //LOGICS




                     //READING MESSAGES
                    data_ref.on("child_added", snap3=>{
                        if(initialLoad)
                        {

                        //console.log("CHILD LOAD"+snap3);
                        //snap3.forEach(all_push =>{
                        var obj=snap3.val();
                        //console.log(obj);
                        if (obj.uid == auth.currentUser.uid) {
                            $(".container").append("<div class='mes_wrap'><div class='message me'>" + login.validate(obj.data) + "</div></div>").fadeIn('slow');
                            $('.container').animate({
                                scrollTop: $('.container').prop("scrollHeight")
                            }, 0);
                        } 
                        else {

                              
                           
                            if(focus==false){
                                                 
                                 if(voice_ASS=="true"){//FOKING TOOK 2HRS TO FIGURE IT WAS STORED AS STRING SMH
                                 $('#switch').prop('checked', true);
                                 responsiveVoice.speak(obj.user+" said, "+login.cusswords(obj.data),"Fallback UK Female");
                              }
                              else{
                                 $('#switch').prop('checked', false);
                                 snd.play();
                              }
                              document.title="NEW MESSAGE";
                             /*blink=setInterval(function(){
                                                   document.title=obj.user.substr(0,5)+"... Sent a message";

                                                   setTimeout(function(){
                                                    document.title="ChatBox";
                                                    },1100);
                                               },1600);*/
                       
                              
                             
                              $(window).focus(function(){
                                    document.title="ChatBox";
                                });
                            }                            
                            $(".container").append('<div class="mes_wrap"><p class="name_p">' + obj.user + '</p><div class="message other">' + login.validate(obj.data) + '</div></div>').fadeIn('slow');
                            $('.container').animate({
                                scrollTop: $('.container').prop("scrollHeight")
                            }, 0);
                        }                        }
                        //});
                        //$(".container").prepend("<div class='mes_wrap'><div class='message me'>"+snap3.val().data+"</div></div>");
                    });


                    //INITIAL READING MESSAGES
                    data_ref.once("value", snap3=>{
                        if(!initialLoad){

                        // console.log("INITIAL LOAD"+snap3);
                        //snap3.forEach(all_push =>{
                        snap3.forEach(function (objlol){
                        var obj=objlol.val();
                        console.log(obj);
                        if (obj.uid == auth.currentUser.uid) {
                            $(".container").append("<div class='mes_wrap'><div class='message me'>" + login.validate(obj.data) + "</div></div>").fadeIn('slow');
                            $('.container').animate({
                                scrollTop: $('.container').prop("scrollHeight")
                            }, 0);
                        } 
                        else {
                            $(".container").append('<div class="mes_wrap"><p class="name_p">' + obj.user + '</p><div class="message other">' + login.validate(obj.data) + '</div></div>').fadeIn('slow');
                            $('.container').animate({
                                scrollTop: $('.container').prop("scrollHeight")
                            }, 0);
                        }
                        });
                        //});
                        //$(".container").prepend("<div class='mes_wrap'><div class='message me'>"+snap3.val().data+"</div></div>");
                        
                    }
                    initialLoad=true;
                    });

                    //ENTER TO SEND MESSAGE

                    $(".input_bar").keypress(function(e) {
                        if (e.which == 13) {
                            send_Message();
                        }
                    });

                    //SENDING MESSAGE
                    $(".send").on("click", send_Message);

                    function send_Message() {
                        var message = $(".input_bar").val();
                        var dat = new Date(new Date().getTime()).toLocaleString();
                        let cu=firebase.auth().currentUser;
                        var json_obj = {
                            user: cu.displayName,
                            uid: auth.currentUser.uid,
                            pro_pic: auth.currentUser.photoURL,
                            data: message,
                            time: dat
                        };
                        console.log(json_obj);
                        $(".input_bar").val("");
                        data_ref.push(json_obj).catch(snap=>toastr.error("Couldnt send the message :" + snap.message));
                    }

                    //END OF LOGICS

                } 
                else {
                    toastr.error("No such room is in the database!");
                }
                loader(false);
            });
            loader(false);
        }
    }

    loader(false);

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
    function loader(x) {
        if (x) {
            $(".load_overlay").css({
                "visibility": "visible"
            });
        } else {
            $(".load_overlay").css({
                "visibility": "hidden"
            });
        }
    }

    var pic_changed = false;
    var storageRef = firebase.storage();
    var file_nm;
    var auth = firebase.auth();
    var db_room = firebase.database().ref("rooms");
    var user_ref = firebase.database().ref("users");

    //SIGN OUT USER
    $(".sign_o").on("click", function() {
        user_flag = auth.currentUser;
        if (user_flag) {
            auth.signOut();
            location.reload();
        } else {
            toastr.error("HOW DID U GET HERE LOL ;-;");
        }
    });

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            console.log("Signed in as : " + user.email + " ( " + user.displayName + " ) ");
            $(".overlay_cont").css({
                "height": "200px"
            });
            $(".usnm").remove();
            $(".pass").remove();
            /*$(".overlay").css({
               "visibility": "hidden"
             });*/
            $("._login").css({
                "bottom": "180px"
            });

            //OVERLAY EVENT HANDLERS
            $("._login").on("click", login.lol);

            $(".overlay").keypress(function(e) {
                if (e.which == 13 && !user_flag) {
                    login.lol();
                }

            });

        } else {
            //OVERLAY EVENT HANDLERS
            $("._login").on("click", fuck);

            $(".overlay").keypress(function(e) {
                if (e.which == 13 && !user_flag) {
                    fuck();
                }
            });
            console.log("NO USER");

        }
    });

    //END OF OVERLAY EVENT HANDLERS

    function fuck() {
        loader(true);
        mail = $(".usnm").val();
        pas = $(".pass").val();
        rm_id = $(".room_id").val();
        var sec_user=auth.currentUser;
        if (mail != "" && pas != "" && rm_id != "") {
            if(sec_user==null)
            {
            console.log("GETTING CALLED?");
            var promise = auth.signInWithEmailAndPassword(mail, pas);
            promise.catch(snap=>{
                toastr.error(snap.message);
                loader(false);
            });
            promise.then(function(snap) {
                login.lol(rm_id);
            });
            }
            else
            {
                 console.log("aldready signed in");
            }
        } else {
            toastr.error("Enter all the fields!");
            loader(false);
        }
        loader(false);
    }
$(".left_cont").css({
                     "top": "0px !important"});
});
