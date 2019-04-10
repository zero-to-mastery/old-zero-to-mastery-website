function play(video){
    document.getElementById('vidwrap').innerHTML = '<iframe width="560" height="315" src="' + video + '"frameborder="0"></iframe>';
    document.getElementById("vidwrap").classList.remove("playicon");
  };

  // update the year dinamically with a immediately invoked function expression
(function () {
  // gets the span wrapped around the year
  const year = document.querySelector('.year-footer');
  const yearSaver = document.querySelector('.year');
  // updates the year with the current year
  year.innerHTML = new Date().getFullYear();
})();

function getDate(){
  const yearSaver = document.querySelectorAll('.year');
  yearSaver.forEach(value => value.innerHTML = new Date().getFullYear());
  if(yearSaver.innerHTML !== new Date().getFullYear()){
    yearSaver.innerHTML = new Date().getFullYear();
  };
}

setInterval(getDate, 5000);
getDate();