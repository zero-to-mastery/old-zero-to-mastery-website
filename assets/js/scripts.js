function play(video){
    document.getElementById('vidwrap').innerHTML = '<iframe width="560" height="315" src="' + video + '"frameborder="0"></iframe>';
    document.getElementById("vidwrap").classList.remove("playicon");
  };

function getDate(){
  // grabbing all items with the class of year
  const yearSaver = document.querySelectorAll('.year');
  // looping through the nodelist and adding the year to each span element
  yearSaver.forEach(value => value.innerHTML = new Date().getFullYear());
}
getDate();

function getDateFooter(){
  const year = document.querySelector('.year-footer');
  year.innerHTML = new Date().getFullYear();
}