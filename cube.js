// Color order: UP, DOWN, RIGHT, LEFT, FRONT, BACK


// function rX(vector, theta) {
//     return createVector(vector.x, vector.y*cos(theta) - vector.z*sin(theta), vector.y*sin(theta) + vector.z*cos(theta));
// }

// function rY(vector, theta) {
//     return createVector(vector.x*cos(theta) + vector.z*sin(theta), vector.y, -vector.x*sin(theta) + vector.z*cos(theta));
// }

// function rZ(vector, theta) {
//     return createVector(vector.x*cos(theta) - vector.y*sin(theta), vector.x*sin(theta) + vector.y*cos(theta), vector.z);
// }

function isLower(character) {
  return (character === character.toLowerCase()) && (character !== character.toUpperCase());
}

class Cube {
    constructor(dim, w) {
        this.dim = dim;
        this.w = w;
        this.boxw = w/dim;
        this.boxes = new Array(this.dim);
        
        this.isTesting = false
        
        for(let i = 0; i < this.dim; i++) {
            this.boxes[i] = new Array(this.dim)
        }
        
        for(let j = 0; j < this.dim; j++) {
            for(let k = 0; k < this.dim; k++) {
                this.boxes[j][k] = new Array(this.dim);
            }
        }
        
        let face = 0;
        for(let i = 0; i < this.dim; i++) {
            for(let j = 0; j < this.dim; j++) {
                for(let k = 0; k < this.dim; k++) {
                    let boxColor = colors[face];
                    this.boxes[i][j][k] = new Box(i*this.boxw - (this.boxw*floor(this.dim/2)), j*this.boxw - (this.boxw*floor(this.dim/2)), k*this.boxw - (this.boxw*floor(this.dim/2)), this.boxw, colors);
                }
            }
            face++;
        }
        
        this.movePool = ['U', 'u', 'D', 'd', 'R', 'r', 'L', 'l', 'F', 'f', 'B', 'b'];
    }
    
    shuffle() {
        let moves = 100;
        for(let i = 0; i < moves; i++) {
            cube.twist(random(this.movePool));
        }
    }
    
    leftyAlg() {
        this.twist('u');
        this.twist('l');
        this.twist('U');
        this.twist('L');
        this.twist('u');
        this.twist('F');
        this.twist('u');
        this.twist('f');
    }
    
    rightyAlg() {
        this.twist('U');
        this.twist('R');
        this.twist('u');
        this.twist('r');
        this.twist('u');
        this.twist('f');
        this.twist('U');
        this.twist('F');
    }
    
    beginTest() {
        let moves = 10;
        let arr = [];
        let choice;
        for(let i = 0; i < moves; i++) {
            choice = random(this.movePool);
            arr.push(choice);
        }
        
        let steps = 0;
        this.isTesting = setInterval(function() {
            cube.test(arr, steps);
            steps++;
        }, 500);
    }
    
    test(arr, steps) {
        let choice;
        if(steps < arr.length) {
            choice = arr[steps];
            cube.twist(choice);
            return;
        } else if(steps < arr.length*2) {
            choice = arr[arr.length - (steps - arr.length) - 1];
            if(isLower(choice)) choice = choice.toUpperCase();
            else choice = choice.toLowerCase();
            cube.twist(choice);
        } else {
            clearInterval(this.isTesting);
            this.isTesting = false;
        }
    }
    
    // swapBoxes(ia1, ia2, ia3, ib1, ib2, ib3) {
    //     let tmp = this.boxes[ia1][ia2][ia3].colors;
    //     this.boxes[ia1][ia2][ia3].colors = this.boxes[ib1][ib2][ib3].colors;
    //     this.boxes[ib1][ib2][ib3].colors = tmp;
    // }
    
    swapBoxes(b1, b2) {
        if(b1 && b2) {
            let tmp = b1.colors;
            b1.colors = b2.colors;
            b2.colors = tmp;
        }
    }
    
    rotate(a, clock) {
        if(clock) {
            this.swapBoxes(a[0][0], a[2][0]);
            this.swapBoxes(a[0][0], a[0][2]);
            this.swapBoxes(a[0][2], a[2][2]);
            
            this.swapBoxes(a[0][1], a[1][0]);
            this.swapBoxes(a[0][1], a[1][2]);
            this.swapBoxes(a[1][2], a[2][1]);
        } else {
            this.swapBoxes(a[0][2], a[2][2]);
            this.swapBoxes(a[0][0], a[0][2]);
            this.swapBoxes(a[0][0], a[2][0]);
            
            this.swapBoxes(a[1][2], a[2][1]);
            this.swapBoxes(a[0][1], a[1][2]);
            this.swapBoxes(a[0][1], a[1][0]);
        }
        // for (let i = 0; i < this.dim / 2; i++) {
        //     for (let j = i; j < this.dim - i - 1; j++) {
      
        //         // Swap elements of each cycle
        //         // in clockwise direction
        //         let temp = a[i][j].colors;
        //         a[i][j].colors = a[this.dim - 1 - j][i].colors;
        //         a[this.dim - 1 - j][i].colors = a[this.dim - 1 - i][this.dim - 1 - j].colors;
        //         a[this.dim - 1 - i][this.dim - 1 - j].colors = a[j][this.dim - 1 - i].colors;
        //         a[j][this.dim - 1 - i].colors = temp;
        //     }
        // }
    }
    
    twist(key) {
        let tempMat = new Array(this.dim);
        for(let i = 0; i < this.dim; i++) {
            tempMat[i] = new Array(this.dim)
        }

        if(key === 'U' || key === 'u') {
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    tempMat[i][j] = this.boxes[i][0][j];
                    this.boxes[i][0][j].rotate(key);
                    
                    
                    // let theta = (key === 'U') ? 90 : -90;
                    // this.boxes[i][0][j].pos = rY(this.boxes[i][0][j].pos, theta);
                }
            }
        }
        
        if(key === 'D' || key === 'd') {
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    tempMat[i][j] = this.boxes[i][2][j];
                    this.boxes[i][2][j].rotate(key);
            
                    // let theta = (key === 'D') ? 90 : -90;
                    // this.boxes[i][2][j].pos = rY(this.boxes[i][2][j].pos, theta);
                }
            }
        }
        
        if(key === 'L' || key === 'l') {
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    tempMat[i][j] = this.boxes[0][i][j];
                    this.boxes[0][i][j].rotate(key);
                    
                                
                    // let theta = (key === 'L') ? 90 : -90;
                    // this.boxes[0][i][j].pos = rX(this.boxes[0][i][j].pos, theta);
                }
            }
        }
        
        if(key === 'R' || key === 'r') {
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    tempMat[i][j] = this.boxes[2][i][j];
                    this.boxes[2][i][j].rotate(key);
                    
                    // let theta = (key === 'R') ? 90 : -90;
                    // this.boxes[2][i][j].pos = rX(this.boxes[2][i][j].pos, theta);
                }
            }
        }
        
        if(key === 'F' || key === 'f') {
            // [this.boxes[0][0][2].colors, this.boxes[1][0][2].colors, this.boxes[2][0][2].colors,
            //  this.boxes[0][1][2].colors, this.boxes[1][1][2].colors, this.boxes[2][1][2].colors,
            //  this.boxes[0][2][2].colors, this.boxes[1][2][2].colors, this.boxes[2][2][2].colors] =
            // [this.boxes[0][2][2].colors, this.boxes[0][1][2].colors, this.boxes[0][0][2].colors,
            //  this.boxes[1][2][2].colors, this.boxes[1][1][2].colors, this.boxes[1][0][2].colors,
            //  this.boxes[2][2][2].colors, this.boxes[2][1][2].colors, this.boxes[2][0][2].colors];
            
            // let tempMat = new Array(this.dim);
            // for(let i = 0; i < this.dim; i++) {
            //     tempMat[i] = new Array(this.dim)
            // }
            // let clock = true;
            
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    tempMat[i][j] = this.boxes[i][j][2];
                    this.boxes[i][j][2].rotate(key);
                }
            }
        }
        
        if(key === 'B' || key === 'b') {
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    tempMat[i][j] = this.boxes[i][j][0];
                    this.boxes[i][j][0].rotate(key);
                    
                    // let theta = (key === 'B') ? 90 : -90;
                    // this.boxes[i][j][0].pos = rZ(this.boxes[i][j][0].pos, theta);
                }
            }
        }
        
        this.rotate(tempMat, !isLower(key));
    }
    
    show() {
        for(let i = 0; i < this.dim; i++) {
            for(let j = 0; j < this.dim; j++) {
                for(let k = 0; k < this.dim; k++) {
                    this.boxes[i][j][k].show();
                }
            }
        }
    }
}