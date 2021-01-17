var togglemenu = 0;
var player;
var ytid;
var playerready = 0;
var tag = document.createElement('script');

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
                var ytid = String(vidid.data).replace("play-","");
                player.loadVideoById({'videoId': ytid,'startSeconds': 0});
                progressbar();
            }
            if (ncue == true){
                var ytid = String(vidid.data).replace("cue-","");
                player.cueVideoById({'videoId': ytid,'startSeconds': 0});
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
var pstate = player.getPlayerState()
if (pstate == 1){
    document.getElementById('play').style.cssText = 'display:none;'
    document.getElementById('pause').style.cssText = 'display:block;'
    document.getElementById('player').style.cssText = 'pointer-events: none;'
 }
if (pstate !== 1){
    document.getElementById('play').style.cssText = 'display:block;'
    document.getElementById('pause').style.cssText = 'display:none;'
    document.getElementById('player').style.cssText = 'pointer-events: all;'
 }
}