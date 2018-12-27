function play(video){
    document.getElementById('vidwrap').innerHTML = '<iframe width="560" height="315" src="' + video + '"frameborder="0"></iframe>';
    document.getElementById("vidwrap").classList.remove("playicon");
  };