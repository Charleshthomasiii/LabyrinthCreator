//2D P5 Sketch


var walls = optimizeArray2D(array2d);
console.log(walls);

function preload(){

}

function setup(){
    //P5 setup
    createCanvas(sceneConfig.canvasW, sceneConfig.canvasH);
    background(255);
    noStroke();
    fill(140,20,240);
}

function draw(){
    
    for (var i = 0; i < walls.length; i++) {
        walls[i].display();
    }
}