import { evaluateTex } from 'tex-math-parser'

class GraphObj {
    constructor(p, width, height) {
        this.p = p;
        this.viewport = this.p.createVector(800,350);
        this.scaling = this.p.createVector(100,100);

        this.bounds = {w: width, h: height}
        this.function = 'x';
    }

    resize(width,height) {
        this.bounds.w = width;
        this.bounds.h = height;
    }

    withinBoundsX(x) {
        return x < this.bounds.w && x > 0;
    }

    withinBoundsY(y) {
        return y < this.bounds.h && y > 0;
    }

    navigate() {
        if (this.p.mouseIsPressed) {
            this.viewport.x += this.p.mouseX - this.p.pmouseX;
            this.viewport.y += this.p.mouseY - this.p.pmouseY;
        }
    }

    zoom(event) {
        this.lastScroll = Date.now();

        let offx = event.offsetX;
        let offy = event.offsetY; 

        let scale;

        if (event.deltaY > 0) {
            scale = 0.95;
        } else {
            scale = 1.05;
        }

        this.scaling.mult(scale);

        this.viewport.x = offx - (offx - this.viewportInitial.x) * (this.scaling.x/this.scalingInitial.x);
        this.viewport.y = offy - (offy - this.viewportInitial.y) * (this.scaling.y/this.scalingInitial.y);
    }

    isScrolling() {
        return Date.now() < this.lastScroll + 500;
    }

    update() {
        this.navigate();

        if (this.isScrolling() == false) {
            this.scalingInitial = this.scaling.copy();
            this.viewportInitial = this.viewport.copy();
        }
    }

    setFunction(func) {
        this.function = func
    }

    graphFunction() {
        let xCoordinates = [];
        let yCoordinates = [];
        
        let leftEdge = -this.viewport.x / this.scaling.x;
        let rightEdge = (this.bounds.w-this.viewport.x) / this.scaling.x;
        
        let increment = (rightEdge-leftEdge)/(this.bounds.w/(this.scaling.x/30));
        
        for (let i=leftEdge; i<rightEdge; i+=increment) {
            xCoordinates.push(i);
        }
        
        for (let i=0; i<xCoordinates.length; i++) {
            let answer = evaluateTex(this.function, {x: xCoordinates[i]});
            yCoordinates.push(answer.evaluated);
        }

        for (let i=1; i<xCoordinates.length; i++) {
            this.p.stroke(180);
            this.p.strokeWeight(2);
            this.p.smooth();

            this.p.line(
                this.viewport.x + xCoordinates[i-1]*this.scaling.x,
                this.viewport.y - yCoordinates[i-1]*this.scaling.y,
                this.viewport.x + xCoordinates[i]*this.scaling.x,
                this.viewport.y - yCoordinates[i]*this.scaling.y,
            );
        }
    }

    renderGrids() {
        this.p.push();
        
        //Axis
        this.p.stroke(255);
        this.p.strokeWeight(3);
        this.verticalLine(this.viewport.x);
        this.horizontalLine(this.viewport.y);

        //Vertical Lines
        let increXPos = 1;

        for (let i=this.viewport.x+this.scaling.x; i<this.bounds.w; i+=this.scaling.x) {
            this.p.stroke(100);
            this.p.strokeWeight(1);
            this.verticalLine(i);

            this.p.strokeWeight(0);
            this.p.fill(255);
            this.p.textSize(14);
            this.p.text(increXPos,i+(this.scaling.x*0.03),this.viewport.y+(this.scaling.y*0.15));

            increXPos++;
        }
        
        let increXNeg = -1; 

        for (let i=this.viewport.x-this.scaling.x; i>0; i-=this.scaling.x) {
            this.p.stroke(100);
            this.p.strokeWeight(1);
            this.verticalLine(i);
            
            this.p.strokeWeight(0);
            this.p.fill(255);
            this.p.textSize(14);
            this.p.text(increXNeg,i+(this.scaling.x*0.03),this.viewport.y+(this.scaling.y*0.15));

            increXNeg--;
        }
        
        //Horizontal Lines
        let increYPos = -1

        for (let i=this.viewport.y+this.scaling.y; i<this.bounds.h; i+=this.scaling.y) {
            this.p.stroke(100);
            this.p.strokeWeight(1);
            this.horizontalLine(i);

            this.p.strokeWeight(0);
            this.p.fill(255);
            this.p.textSize(14);
            this.p.text(increYPos,this.viewport.x+(this.scaling.x*0.05),i+(this.scaling.y*0.15));

            increYPos--;
        }
        
        let increYNeg = 1;
        for (let i=this.viewport.y-this.scaling.y; i>0; i-=this.scaling.y) {
            this.p.stroke(100);
            this.p.strokeWeight(1);
            this.horizontalLine(i);

            this.p.strokeWeight(0);
            this.p.fill(255);
            this.p.textSize(14);
            this.p.text(increYNeg,this.viewport.x+(this.scaling.x*0.05),i+(this.scaling.y*0.15));
            
            increYNeg++;
        }
        
        this.p.pop();
    }

    verticalLine(x) {
        if (this.withinBoundsX(x)) {
            this.p.line(x,0,x,this.bounds.h);
        }
    }

    horizontalLine(y) {
        if (this.withinBoundsY(y)) {
            this.p.line(0,y,this.bounds.w,y);
        }
    }

    render() {
        this.renderGrids();
        this.graphFunction();
    }
}

export default GraphObj;