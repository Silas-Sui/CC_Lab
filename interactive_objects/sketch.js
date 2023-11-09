let faces = [];
let numFaces = 1;

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    for (let i = 0; i < numFaces; i++) {
        faces.push(new Face(random(width), random(height)));
    }

}

function draw() {
    background(180);

    for (let i = 0; i < faces.length; i++) {
        faces[i].update();
        faces[i].display();
    }

    // if (frameCount > 180) {
    //     for (let i = 0; i < faces.length; i++) {
    //         faces[i].turnAngry()
    //     }
    // }

    console.log(this.Boolean)
}

class Face {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.offsetX = 0;

        this.angleForSineRadians = random(0, 2 * PI);

        this.normalcolor = color(220, 250, 90);
        this.angrycolor = color(255, 90, 29)
        this.c = this.normalcolor
        this.speed = random(0.02, 0.1)
        this.Boolean =0
        this.age = 0
    }
    update() {
        this.offsetX = map(sin(this.angleForSineRadians), -1, 1, -20, 20);

        this.angleForSineRadians += this.speed;

        this.age ++
        
        // if(this.age>100){
        //     this.c = this.angrycolor
        // }
    }
    display() {
        push();
        translate(this.x + this.offsetX, this.y);

        noStroke();
        fill(this.c);
        circle(0, 0, 50);
        fill(0);
        circle(-10, -10, 5)
        circle(10, -10, 5)
        ellipse(0, 10, 8, 9)
        text(round(this.age),0,0)

        pop();
    }

    turnAngry() {
        this.c = this.angrycolor
    }
    turnNormal() {
        this.c = this.normalcolor
    }
    

    check_if_clicked(){
        if (dist(mouseX,mouseY,this.x,this.y) < 25){
            this.Boolean ++
        }
    }


}

function mousePressed() {
        for (let i = 0; i < faces.length; i++) {
            faces[i].check_if_clicked();
            if(this.Boolean%2 == 0 ){
                faces[i].turnAngry
            }else{
                faces[i].turnNormal
            }
        }
     

}