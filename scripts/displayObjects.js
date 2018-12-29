/*
DISPLAY 2D/3D OBJECTS
~Modifying asset properties
Last modified: 12/07/18
*/

class Wall2D{
    constructor(xPos, yPos, xSize, ySize){
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSize = xSize;
        this.ySize = ySize;
    }

    display(){
        rect(this.xPos, this.yPos, this.xSize, this.ySize);
    }
}

class Wall3D{
    constructor(xPos, zPos, depth, width, height){
        this.struct = new Box({
            x: (xPos + width/2) + sceneConfig.startX,
            y: sceneConfig.boxH/2,
            z: (zPos + depth/2) + sceneConfig.startZ,
            depth: depth,
            width: width,
            height: height,
            asset: 'img_wall',
            repeatX: width,
            repeatY: height,
            roughness: 1,
            metalness: 0,
        });

        
        red=random(100,150); //worried these three lines are costing us performance
        green=random(30,60);
        blue=random(30,60);
        this.struct.setColor(red,green,blue);

        this.struct.tag.object3D.userData.solid = true;
        world.add(this.struct);
    }

    displayVR(){
    }
}

class Snowflake{
    constructor(xPos, zPos){
        this.sprite = new Circle({
            x: xPos,
            y: 2, 
            z: zPos, 
            radius: 1, 
            red: 255, 
            green: 255, 
            blue: 255,
            shader: 'flat',
        });
        world.add(this.sprite);
    }

    rotate(){
        this.sprite.rotateY(world.getUserRotation().y);
    }
}

//displays maze using p5 canvas based off 2d array
function displayMaze2D(array){
    for (var r = 0; r < array.length; r++) {
        for (var c = 0; c < array[r].length; c++) {
            if (array[r][c] === 1) {
                //console.log(sceneConfig.getxPos(c));
                rect( sceneConfig.getxPos2D(c),
                    sceneConfig.getyPos2D(r),
                    sceneConfig.tileW,
                    sceneConfig.tileH,
                );
            }
        }
    }
}

function displayMaze3D(array){
    let walls = []
    for (var r = 0; r < array.length; r++) {
        for (var c = 0; c < array[r].length; c++) {
            if (array[r][c] === 1) {
                walls.push( new Wall3D(
                        sceneConfig.getxPos3D(c),
                        sceneConfig.getzPos3D(r),
                        1,
                        1,
                        1,
                    )
                )
            }
        }
    }
}

function updateLights(){
    let flashlight = document.getElementById("flashlight");
    let bodyLight = document.getElementById("bodyLight");
    let playerPos = world.getUserPosition();
    let playerRot = world.getUserRotation();
    flashlight.object3D.position.set(playerPos.x, playerPos.y, playerPos.z);
    bodyLight.object3D.position.set(playerPos.x, playerPos.y, playerPos.z);
    flashlight.object3D.rotation.x = THREE.Math.degToRad(playerRot.x);
    flashlight.object3D.rotation.y = THREE.Math.degToRad(playerRot.y);
    flashlight.object3D.rotation.z = THREE.Math.degToRad(playerRot.z);
    // flashlight.object3D.rotation.divideScalar(2);

}