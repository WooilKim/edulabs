var totalChapNum=4; //사용자가 직접입력

function start(fuckingEdu){
    if(fuckingEdu <= totalChapNum){
        setTimeout(function(){
            var vval="0"+fuckingEdu+"/0"+fuckingEdu;
            console.log(fuckingEdu);
            fuckingEdu++;
            $.ajax({
                        url: "sub_entry.jsp",
                        data: {"c_type":"test01" ,"chap_type":"t_time","chap_no": vval },
                        type:'post',
                        dataType:'json',
                        success:function(data){
                            var isuchk = parseInt(data.listdata[0][0]);
                            var tchk = parseInt(data.listdata[0][1]);
                            var ts = parseInt(data.listdata[0][2]);
                            var device = check_device(); 
                            
                            if(isuchk<99){ 
                                $("#conBox").html("<video id=\"myVideo\" src=\""+vval+".mp4\" type=\"video/mp4\" autoplay playsinline></video>");
                                $("#speed_sel").hide();
                                $("#mspeed").hide();
                            }else{  //99%이상인 경우는 이수이므로 컨트롤바 보이도록 처리
                                $("#conBox").html("<video id=\"myVideo\" src=\""+vval+".mp4\" type=\"video/mp4\" controls autoplay playsinline></video>");
                                if(device=='iPhone' ||device=='iPod' ) {
                                    $("#speed_sel").hide();
                                    $("#mspeed").hide();
                                }else{
                                    $("#speed_sel").show();
                                    $("#mspeed").show();
                                }	
                            }
                            
                            
                            var vid = document.getElementById("myVideo");
                            
                            $(".spst").css("height","30px");
                            $("#viweBox").show();
                            $("#bgView").show();

                            var windowWidth = $( window ).width();
                            if(windowWidth < 900) {
                                fullSC();
                            } else {
                                basicSC();
                            }

                            var tstart = new Date().getTime();
                            $("#nstart").attr("value",tstart);
                                            
                            var stime = (ts-vid.currentTime)*1000;
                            if(vid.currentTime<ts) {
                                myTimer = setTimeout(function(){
                                    vid.pause();
                                if(isuchk<99){ 
                                    $("#test").show();
                                    $("#viweBox").hide();
                                    for(var i=1; i<=4; i++){  //4챕터이므로 
                                        if(parseInt(vval.substr(1,2))==i){
                                            $("#test_0"+i).show();
                                        }else{
                                            $("#test_0"+i).hide();
                                        }
                                    }
                                }
                                }, stime);	
                            }
                        }
                    });
                setTimeout(function(){
                var tstart = parseInt($("#nstart").val());
                    var vid = document.getElementById("myVideo");
                    var ct = Math.round(vid.duration);
                    var tend = parseInt(new Date().getTime());
                    $.ajax({
                            url: "sub_entry.jsp",
                            data: {"c_type":"save" ,"chap_type": $("#myVideo").attr("src").substr(0,2) ,"tstart": tstart, "tend": tend, "ct": ct},
                            type:'post',
                            dataType:'json',
                            success:function(data){
                //				console.log('결과: '+data.listdata);

                                clearTimeout(myTimer);
                //				clearInterval(myTimer1); 일정 시간마다 반복하여 알림한 것 해제
                                vid.pause();
                                $("#ctrlBar").show();
                                $("#tbBox").show();
                                $("#viweBox").css("width","");
                                $("#test").hide();
                                $("#viweBox").hide();
                                $("#bgView").hide();
                                document.xel.action="index.jsp";
                                document.xel.method="post";
                                document.xel.action = "../index.jsp";
                                document.xel.target = "_blank";
                                document.xel.submit();
                                closeBtn();
                            }
                    });
                    start(fuckingEdu);
                },1500);
        },1500*fuckingEdu);
    }
}
start(1);
