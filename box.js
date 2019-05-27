
// Color order: UP, DOWN, RIGHT, LEFT, FRONT, BACK
let colors = ['white', 'yellow', 'orange', 'red', 'blue', 'green'];

const UP = 0;
const DOWN = 1;
const RIGHT = 2;
const LEFT = 3;
const FRONT = 4;
const BACK = 5;

class Box {
    constructor(x, y, z, w, colors) {
        this.pos = createVector(x, y, z);
        this.w = w;
        this.colors = [...colors];
    }
    
    rotate(dir) {
        switch(dir) {
            case 'U':
                [this.colors[RIGHT], this.colors[LEFT], this.colors[FRONT], this.colors[BACK]] = [this.colors[BACK], this.colors[FRONT], this.colors[RIGHT], this.colors[LEFT]];
                break;
                
            case 'u':
                [this.colors[BACK], this.colors[FRONT], this.colors[RIGHT], this.colors[LEFT]] = [this.colors[RIGHT], this.colors[LEFT], this.colors[FRONT], this.colors[BACK]]
                break;
                
            case 'D':
                [this.colors[RIGHT], this.colors[LEFT], this.colors[FRONT], this.colors[BACK]] = [this.colors[BACK], this.colors[FRONT], this.colors[RIGHT], this.colors[LEFT]];
                break;
                
            case 'd':
                [this.colors[BACK], this.colors[FRONT], this.colors[RIGHT], this.colors[LEFT]] = [this.colors[RIGHT], this.colors[LEFT], this.colors[FRONT], this.colors[BACK]]
                break;
                
            case 'R':
                [this.colors[UP], this.colors[DOWN], this.colors[FRONT], this.colors[BACK]] = [this.colors[FRONT], this.colors[BACK], this.colors[DOWN], this.colors[UP]];
                break;
                
            case 'r':
                 [this.colors[FRONT], this.colors[BACK], this.colors[DOWN], this.colors[UP]] = [this.colors[UP], this.colors[DOWN], this.colors[FRONT], this.colors[BACK]];
                break;
                
            case 'L':
                [this.colors[UP], this.colors[DOWN], this.colors[FRONT], this.colors[BACK]] = [this.colors[FRONT], this.colors[BACK], this.colors[DOWN], this.colors[UP]];
                break;
                
            case 'l':
                 [this.colors[FRONT], this.colors[BACK], this.colors[DOWN], this.colors[UP]] = [this.colors[UP], this.colors[DOWN], this.colors[FRONT], this.colors[BACK]];
                break;
                
            case 'F':
                [this.colors[LEFT], this.colors[RIGHT], this.colors[UP], this.colors[DOWN]] = [this.colors[DOWN], this.colors[UP], this.colors[LEFT], this.colors[RIGHT]];
                break;
                
            case 'f':
                [this.colors[UP], this.colors[DOWN], this.colors[RIGHT], this.colors[LEFT]] = [this.colors[RIGHT], this.colors[LEFT], this.colors[DOWN], this.colors[UP]];
                break;
                
            case 'B':
                [this.colors[LEFT], this.colors[RIGHT], this.colors[UP], this.colors[DOWN]] = [this.colors[DOWN], this.colors[UP], this.colors[LEFT], this.colors[RIGHT]];
                break;
                
            case 'b':
                [this.colors[UP], this.colors[DOWN], this.colors[RIGHT], this.colors[LEFT]] = [this.colors[RIGHT], this.colors[LEFT], this.colors[DOWN], this.colors[UP]];
                break;
        }
    }
    
    show() {
        stroke(0);
        strokeWeight(8);
        
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        
        for(let i = 0; i < 6; i++) {
            push();
            beginShape();
            fill(this.colors[i]);
            switch(i) {
                case 0:
                    rotate(90, [1, 0, 0]);
                    break;
                    
                case 1:
                    translate(0, this.w, 0);
                    rotate(90, [1, 0, 0]);
                    break;
                    
                case 2:
                    translate(this.w/2, this.w/2, 0);
                    rotate(90, [0, 1, 0]);
                    break;
                    
                case 3:
                    translate(-this.w/2, this.w/2, 0);
                    rotate(90, [0, 1, 0]);
                    break;
                    
                case 4:
                    translate(0, this.w/2, this.w/2);
                    rotate(90, [0, 0, 1]);
                    break;
                    
                case 5:
                    translate(0, this.w/2, -this.w/2);
                    rotate(90, [0, 0, 1]);
                    break;
                    
                    
                default:
                    
                    
            }
            vertex(-this.w/2, -this.w/2);
            vertex(-this.w/2, this.w/2);
            vertex(this.w/2, this.w/2);
            vertex(this.w/2, -this.w/2);
            vertex(-this.w/2, -this.w/2);
            endShape();
            pop();
        }
        
        // beginShape();
        // fill(this.colors[0]);
        // vertex(-this.w, -this.w);
        // vertex(-this.w, this.w);
        // vertex(this.w, this.w);
        // vertex(this.w, -this.w);
        // vertex(-this.w, -this.w);
        // endShape();
        
        // beginShape();
        // fill(this.colors[1]);
        // translate(0, this.w, this.w);
        // rotate(90, [1, 0, 0]);
        // vertex(-this.w, -this.w);
        // vertex(-this.w, this.w);
        // vertex(this.w, this.w);
        // vertex(this.w, -this.w);
        // vertex(-this.w, -this.w);
        // endShape();
        
        // beginShape();
        // fill(this.colors[RIGHT])
        // translate(-this.w, 0, this.w);
        // rotate(90, [0, 1, 0]);
        // vertex(-this.w, -this.w);
        // vertex(-this.w, this.w);
        // vertex(this.w, this.w);
        // vertex(this.w, -this.w);
        // vertex(-this.w, -this.w);
        // endShape();
        
        // box(this.w);
        pop();
    }
}