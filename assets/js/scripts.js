function play(){
    document.getElementById('vidwrap').innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/sCX_YMPuJGA?autoplay=1" frameborder="0"></iframe>';
    document.getElementById("vidwrap").classList.remove("playicon");
  };

function dateFilter() {
	
      var date = new Date($('#date-input').val());
      day = date.getDate();
      alert('query url will be: https://server_url/?'+day);
    
}