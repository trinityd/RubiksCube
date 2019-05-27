let canWidth = 400;
let canHeight = 400;
let easycam;

let cubeDim = 3;
let cube;
let cubeWidth = 1*canWidth/3;
let b;

let noColor = 'rgba(0,0,0,0)';

let rotX = 0;
let rotY = 0;
let camSpeed = 10;

function setup() {
    createCanvas(canWidth, canHeight, WEBGL);
    // easycam = createEasyCam();
    angleMode(DEGREES);
    // b = new Box(0, 0, 0, 100, colors);
    cube = new Cube(cubeDim, canWidth);
    // b = [cube.boxes[1][0][2], cube.boxes[0][1][2], cube.boxes[2][1][2], cube.boxes[1][2][2]];
    
    b = [];
    
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            b.push(cube.boxes[i][j][2]);
        }
    }
    
    // b = cube.boxes[0][0][2];
}

function keyPressed() {
    // if(keyCode === UP_ARROW) {
    //     rotX += camSpeed;
    // }
    
    // if(keyCode === DOWN_ARROW) {
    //     rotX -= camSpeed;
    // }
    
    // if(keyCode === RIGHT_ARROW) {
    //     rotY += camSpeed;
    // }
    
    // if(keyCode === LEFT_ARROW) {
    //     rotY -= camSpeed;
    // }
}

function keyTyped() {
    if(key === 't') {
        cube.beginTest();
    } else if(key === 's') {
        cube.shuffle();
    } else if(!cube.isTesting) cube.twist(key);
}

function draw() {
    background(200);
    translate(0, 0, -500);
    
    if(keyIsDown(UP_ARROW)) {
        rotX += camSpeed;
    }
    
    if(keyIsDown(DOWN_ARROW)) {
        rotX -= camSpeed;
    }
    
    if(keyIsDown(RIGHT_ARROW)) {
        rotY += camSpeed;
    }
    
    if(keyIsDown(LEFT_ARROW)) {
        rotY -= camSpeed;
    }
    
    rotateX(rotX);
    rotateY(rotY);
    
    // for(let box of b) box.show();
    
    // b.show();
    
    cube.show();
}