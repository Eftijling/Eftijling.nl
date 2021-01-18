var togglemenu = 0;
var player;
var title;
var ytid;
var playerready = 0;
var tag = document.createElement('script');
const cuedids = [];
const cuetitle =[];

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



function openmenu(){
    if (togglemenu == 1) {
        document.getElementById('menu').classList.remove("showmenu1");
        document.getElementById('mobilnav').classList.remove("showmenu2");
        document.getElementById('menu').classList.add("hidemenu1");
        document.getElementById('mobilnav').classList.add("hidemenu2");
        togglemenu = 0;
        setTimeout(function(){document.getElementById('mobilnav').style.display = "none";},600);
    } else{
        document.getElementById('menu').classList.add("showmenu1");
        document.getElementById('mobilnav').classList.add("showmenu2");
        document.getElementById('menu').classList.remove("hidemenu1");
        document.getElementById('mobilnav').classList.remove("hidemenu2");
        togglemenu = 1;
        document.getElementById('mobilnav').style.display = "block";
    }      
}

function onYouTubeIframeAPIReady() {
    playerready = 1;
    player = new YT.Player('player', {
        height: '100',
        width: '178',
        videoId: ytid,
        playerVars: {
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'modestbranding': 1
        },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    }); 
}

window.addEventListener("message", function(vidid){
    if (playerready == 1){
        if (vidid.origin === 'https://view-awesome-table.com'){
            var nplay = String(vidid.data).includes("play");
            var ncue = String(vidid.data).includes("cue");
            if (nplay == true){
                document.getElementById("placeholder").style.display = "none";
                var idtitle = String(vidid.data).replace("play-","");

                values = idtitle.split('-Title=');
                ytid = values[0];
                title = values[1];
                
                document.getElementById('currentvideo').innerHTML = title;
                player.loadVideoById({'videoId': ytid,'startSeconds': 0});
                progressbar();
            }
            if (ncue == true){
                var idtitle = String(vidid.data).replace("cue-","");
                values = idtitle.split('-Title=');
                ytid = values[0];
                title = values[1];
                if (player.getPlayerState() == -1 && cuedids.length == 0){
                    player.loadVideoById({'videoId': ytid,'startSeconds': 0});
                    progressbar();
                    document.getElementById("placeholder").style.display = "none";
                    document.getElementById('currentvideo').innerHTML = title;
                }
                else{
                    cuedids.push(ytid);
                    cuetitle.push(title);
                    updatequeue();
                }
            }
        }
    }
});

function onPlayerReady(event) {
    event.target.playVideo();
  }


function pause(){
player.pauseVideo();
document.getElementById('play').style.cssText = 'display:block;'
document.getElementById('pause').style.cssText = 'display:none;'
}
function play(){
player.playVideo();
document.getElementById('play').style.cssText = 'display:none;'
document.getElementById('pause').style.cssText = 'display:block;'
}


function progressbar() {
var TotalTime = player.getDuration();
var CurrentTime = player.getCurrentTime();
var progress = (100 - ((CurrentTime / TotalTime) *100));
var clip = "inset( 0 " + progress +"% 0 0)"
document.getElementById('progress').style.clipPath = clip;
setTimeout(progressbar, 2000);

}



function onPlayerStateChange() {
    var pstate = player.getPlayerState();
    if (pstate == 1){
        document.getElementById('play').style.cssText = 'display:none;'
        document.getElementById('pause').style.cssText = 'display:block;'
        document.getElementById('player').style.cssText = 'pointer-events: none;'
    }
    if (pstate !== 1){
        document.getElementById('play').style.cssText = 'display:block;'
        document.getElementById('pause').style.cssText = 'display:none;'
        document.getElementById('player').style.cssText = 'pointer-events: all;'
        if (pstate == 0){
            var nextvid = cuedids[0]
            cuedids.shift();
            cuetitle.shift();
            player.loadVideoById({'videoId': nextvid,'startSeconds': 0});
            updatequeue();
            progressbar();
            
            
        }
    }
}

function updatequeue(){
    if (cuetitle[0] != null){
        document.getElementById('pl0').innerHTML = cuetitle[0];
    document.getElementById('plr0').style.display = "block";
    }
    else{
        document.getElementById('pl0').innerHTML = ""
        document.getElementById('plr0').style.display = "none";
    }
    if (cuetitle[1] != null){
        document.getElementById('pl1').innerHTML = cuetitle[1]
        document.getElementById('plr1').style.display = "block";
    }
    else{
        document.getElementById('pl1').innerHTML = ""
        document.getElementById('plr1').style.display = "none";
    }
    if (cuetitle[2] != null){
        document.getElementById('pl2').innerHTML = cuetitle[2]
        document.getElementById('plr2').style.display = "block";
    }
    else{
        document.getElementById('pl2').innerHTML = ""
        document.getElementById('plr2').style.display = "none";
    }
    if (cuedids.length == 1){
        document.getElementById("wachtrijcount").innerHTML = "1 Video in wachtrij"
    }
    else{
        document.getElementById("wachtrijcount").innerHTML = cuedids.length + " Video's in wachtrij"
    }
    if (cuedids.length == 1952){
        document.getElementById("wachtrijcount").style.color = '#4F758B'
    }
}

function playlistremove0(){
    cuedids.shift();
    cuetitle.shift();
    updatequeue();
}

function playlistremove1(){
    cuedids.splice(1,1);
    cuetitle.splice(1,1);
    updatequeue();
}

function playlistremove2(){
    cuedids.splice(2,1);
    cuetitle.splice(2,1);
    updatequeue();
}

function nextvideo(){
    if(cuedids.length !=0){
        var TotalTime = player.getDuration();
        player.seekTo(TotalTime, true);
    }
    else{
        player.stopVideo();
    }
    
}