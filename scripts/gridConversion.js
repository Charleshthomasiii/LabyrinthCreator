/*
CONVERT ARRAY INTO MAZE
Last modified: 12/07/18
*/

var sceneConfig, array2d;

sceneConfig = {
    gridW: 20,
    gridH: 20, //width and height of array 2d

    //P5 2D Canvas
    canvasW: 500,
    canvasH: 500, //width and height of p5 canvas (reference this inside of createCanvas())
    tileW: 25,
    tileH: 25,  //width and height of 2d tiles

    //A-Frame
    areaW: 40,
    areaD: 40, //width and depth of area to draw maze
    boxW: 2,
    boxD: 2,
    boxH: 5, //width, depth and height to draw 3d box
    startX: -20,
    startZ: -40, //where to start drawing maze

    //P5 CANVAS
    //Gets x position of tile based on x location in grid
    getxPos2D: function(arrayxPos){
        return (this.tileW * arrayxPos);
    },

    //Gets y position of tile based on y location in grid
    getyPos2D: function(arrayyPos){
        return (this.tileH * arrayyPos);
    },

    //A-FRAME
    //Gets x position of the box based on x location in array
    getxPos3D: function(arrayxPos){
        return (this.boxW * arrayxPos);
    },

    //Gets z position of the box based on y location in array
    getzPos3D: function(arrayzPos){
        return (this.boxD * arrayzPos);
    },
}

//2d array that holds only one integer per tile
//0 = blank
//1 = wall
//2 = enemy
array2d = [
[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
[1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
];
array2d=JSON.parse(localStorage.getItem('maze_array'));


//optimizes the 2d array into an array of objects
//if two tiles are touching along the horizontal, then
//they are combined into a single rect with double the
//width
function optimizeArray2D(array){
    let walls = [];
    let wallIndex = -1; //tracks index position of each object inside the array
    let nextBlock = 1;
    //Horizontal Pass
    for (var r = 0; r < array.length; r++) {
        for (var c = 0; c < array[r].length; c++) {
            
            if(array[r][c]===1){
                if (nextBlock>1){
                    nextBlock-=1;
                    continue;
                };
                wallIndex++;

                let newWallW = sceneConfig.tileW;
                let nextBlockIsSolid = true;

                while(nextBlockIsSolid === true){
                    if (array[r][c+nextBlock] === 1) {
                        newWallW += sceneConfig.tileW;
                        nextBlock++;
                    }
                    else{
                        nextBlockIsSolid = false;
                    }
                }

                walls.push(
                    new Wall2D(
                        sceneConfig.getxPos2D(c),
                        sceneConfig.getyPos2D(r),
                        newWallW,
                        sceneConfig.tileH,
                    ) 
                );
            }
        }
    }
    return walls;
}

//optimizes the 2d array into an array of objects
//if two tiles are touching along the horizontal, then
//they are combined into a single rect with double the
//width
function optimizeArray3D(array){
    let walls = [];
    let wallIndex = -1; //tracks index position of each object inside the array
    let nextBlock = 1;
    //Horizontal Pass
    for (var r = 0; r < array.length; r++) {
        for (var c = 0; c < array[r].length; c++) {
            
            if(array[r][c]===1){
                if (nextBlock>1){
                    nextBlock-=1;
                    continue;
                };
                wallIndex++;

                let newWallW = sceneConfig.boxW;
                let nextBlockIsSolid = true;

                while(nextBlockIsSolid === true){
                    if (array[r][c+nextBlock] === 1) {
                        newWallW += sceneConfig.boxW;
                        nextBlock++;
                    }
                    else{
                        nextBlockIsSolid = false;
                    }
                }
                walls.push(
                    new Wall3D(
                        sceneConfig.getxPos3D(c),
                        sceneConfig.getzPos3D(r),
                        sceneConfig.boxD,
                        newWallW,
                        sceneConfig.boxH,
                    ) 
                );
            }
        }
    }
    return walls;
}