//3D A-frame world

var world, ground, walls, footsteps, snowflakes, flashlight, bodylight;
snowflakes = [];

function preload(){
    footsteps = loadSound("assets/sounds/footsteps.ogg");
    soundtrack = loadSound("assets/sounds/soundtrack.mp3")
}

function setup(){
    noCanvas();
    world = new World('VRScene');
    ground = new Plane({x:0, y:0, z:0, width: 40, height: 100, rotationX:-90, asset:'img_grass', repeatX:50, repeatY:50});
    ground.shadow="receive: true";
    flashlight = document.getElementById("flashlight");
    bodylight = document.getElementById("bodylight")
    walls = optimizeArray3D(array2d);
    // snowflakes.push(new Snowflake(0,-6));
    // displayMaze3D(array2d);
    world.add(ground);
    world.camera.cursor.tag.add(flashlight);
    world.camera.cursor.tag.add(bodylight);
    soundtrack.loop();

    // var endgame = new Sphere({           //REPLACED BY A-LINK
    //                     x: 0, y:3, z:-50,
    //                     radius: 2,
    //                     red:200, green:200, blue:200,
    //                 });

    // var endgame1 = new Sphere({
    //                     x: 0, y:3, z:10,
    //                     radius: 2,
    //                     red:50, green:150, blue:50,
    //                 });
    // world.add(endgame);
    // world.add(endgame1);

    world.camera.holder.setAttribute('wasd-controls', 'enabled: false; fly: false;');
}

function draw(){
    if (keyIsPressed === true) {
        if(!footsteps.isLooping()) {
            footsteps.loop();
        }
    } 
    else {
        footsteps.stop();
    }
    keyboardMovement();
    // updateLights();
    // for (var i = 0; i < snowflakes.length; i++) {
    //     snowflakes[i].rotate();
    // }
    // endGame(); //REPLACED BY A-LINK
}

function endGame(){
    var pos = world.getUserPosition();
    if (pos.z<-47) {//put game in end state
        window.location.href = 'endgame.html';
    }
}
//Head bob movement
function deviceMoved(){
    let speedMulti = accelerationZ;
    if (speedMulti < 0) {speedMulti *= -1};
    if (canMoveForward(true)){
        world.moveUserForward(0.01 * speedMulti **1.1);
    }
}

function keyboardMovement(){
    if(canMoveForward(keyIsDown(87))){
        world.moveUserForward(0.05);
    }
    if(keyIsDown(65)){
        //rot L
    }
    if(keyIsDown(68)){
        //rot R
    }
}

function canMoveForward(arg){
    // if the mouse is pressed or the W key is pressed
    if (arg) {

        // figure out what's in front of the user
        var objectAhead = world.castRay();

        // if there is an object, it is close and it is solid, prevent motion
        if (objectAhead && objectAhead.distance < 0.25 && objectAhead.object.el.object3D.userData.solid) {
            return false;
        }

        else{
            return true;
        }
    }
}
