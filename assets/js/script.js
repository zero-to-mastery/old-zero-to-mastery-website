function play(){
    document.getElementById('vidwrap').innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/sCX_YMPuJGA?autoplay=1" frameborder="0"></iframe>';
    document.getElementById("vidwrap").classList.remove("playicon");
  };

  function playDiscord(){
    document.getElementById('vidwrap').innerHTML = '<iframe width="560" height="315" src="//www.youtube.com/embed/LDVqruRsYtA?autoplay=1" frameborder="0"></iframe>';
    document.getElementById("vidwrap").classList.remove("discordplayicon");
  }
