function play(){
    document.getElementById('vidwrap').innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/sCX_YMPuJGA?autoplay=1" frameborder="0"></iframe>';
    document.getElementById("vidwrap").classList.remove("playicon");
  };

function dateFilter() {
  	var date = new Date($('#date-input').val());
  	day = date.getDate();
  	fetch('https://cors.io/?http://91.121.210.171:42550/solutions/?day='+day).then(response => {
	  	return response.json();
	}).then(data => {
	  	console.log(data);
	}).catch(err => {
	  	throw err;
	});
}