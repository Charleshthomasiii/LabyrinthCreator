// video object
//test run [[1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,0,1],[1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1],[1,0,0,0,0,0,0,1,1,0,0,1,1,0,1,1,0,0,0,1],[1,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,0,1],[1,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,1],[1,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,1],[1,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,1,1,0,1],[1,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0,0,1],[1,1,0,0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1],[1,1,1,0,0,1,1,0,0,1,1,0,0,0,0,1,1,1,1,1],[1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1],[1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],[1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0]]
var capture;
var captured=false;
var sensitivity;
var numSquares;
var finalGrid;
var grid = new Array(20); //creating the grid
for (var i=0;i< 20; i++) {
  grid[i]= new Array(20);
}
var finalGrid = new Array(20); //creating the grid

for (var i=0;i< 20; i++) {
  finalGrid[i]= new Array(20);
}


function setup() {
  createCanvas(640, 480);
  // start up our video
  capture = createCapture(VIDEO);
  capture.hide();
  noStroke();
  pixelDensity(1);

}
function setNumSquares(){
  //1,2,4,5,8,10,16,20,25,40,50,80,100,200,400,
  if (mouseY<50) {
    numSquares=4;
  }
  else if (mouseY<100) {
    numSquares=8;
  }
  else if (mouseY<150) {
    numSquares=10;
  }
  else if (mouseY<200) {
    numSquares=20;
  }
  else if (mouseY<250) {
    numSquares=40;
  }
  else if (mouseY<300) {
    numSquares=50;
  }
  else if (mouseY<350) {
    numSquares=100;
  }
  else {
    numSquares=200;
  }
}

function draw() {
  // var grid = new Array(20); //creating the grid
  // for (var i=0;i< 20; i++) {
  //   grid[i]= new Array(20);
  // }

  // first make sure the video is actually loaded and ready to go
  sensitivity=map(mouseX,0,640,200,390);
  //sensitivity=200;
  capture.loadPixels();
  image(capture, 0, 0, 640, 480);
  strokeWeight(1);
  stroke(255);
  // setNumSquares();
  numSquares=20;
  // console.log(numSquares);
  var squareSize=(400/numSquares);
  var squareOffset=(squareSize/2);
  // console.log(squareOffset)
  noFill();
  strokeWeight(2);
  stroke(200);
  rect(320,240,400,400);
  for(var x=0;x<numSquares;x++){
    for(var y=0;y<numSquares;y++){
      xPos=(x*squareSize)+120+squareOffset;
      yPos=(y*squareSize)+40+squareOffset;
      var off = (xPos+yPos*capture.width) * 4; 
      var components = [ capture.pixels[off], capture.pixels[off + 1], capture.pixels[off + 2], capture.pixels[off + 3] ];
      var pixelRedAverage=(capture.pixels[off]+capture.pixels[off+12]+capture.pixels[off]+18)/3
      var pixelGreenAverage=(capture.pixels[off+1]+capture.pixels[off+13]+capture.pixels[off]+19)/3
      var pixelBlueAverage=(capture.pixels[off+2]+capture.pixels[off+14]+capture.pixels[off]+20)/3
      if(dist(pixelRedAverage,pixelGreenAverage,pixelBlueAverage,255,255,255)>sensitivity){ //its a dark pixels
        rectMode(CENTER);
        fill(140,20,240);
        noStroke();
        rect(xPos,yPos,squareSize,squareSize);
        grid[x][y]=1;

      }
      else{
        grid[x][y]=0;
        // rectMode(CENTER);
        // noFill();
        // stroke(0);
        // rect(xPos,yPos,squareSize,squareSize);
        //grid[x][y]=0;
      }
    }
  }
  //finalGrid=grid.slice();
  // grid = new Array(20); //creating the grid
  // for (var i=0;i< 20; i++) {
  //   grid[i]= new Array(20);
  // }
}
function mousePressed() {
  for( var x =0;x<20;x++){
    for( var y =0;y<20;y++){
      finalGrid[y][x]=grid[x][y];
    }
  }
  localStorage.setItem("maze_array",  JSON.stringify(finalGrid));
  window.location.href = "2dmaze.html";
}