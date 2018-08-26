function fitToContainer(canvas){
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}



var c = document.getElementById("chw0");
var ctx = c.getContext("2d");
fitToContainer(c);


