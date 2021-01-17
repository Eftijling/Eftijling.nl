var togglemenu = 0;

function scrollload(){
    document.getElementById('blogo').classList.add('scrolled1')
    document.getElementById('background').classList.remove('background')
    document.getElementById('background').classList.add('scrolled2') 
    document.getElementById('navbar').style.display = "block";
    document.getElementById('down').style.display = "none";
    setTimeout(afterscroll, 500);
}

function afterscroll(){
    document.getElementById('krullen').style.display = "none";
}


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

function projectinfo(){
    document.getElementById('projectinfo').style.display = "block";

}

function exitinfo(){
    document.getElementById('projectinfo').style.display = "none";
}

