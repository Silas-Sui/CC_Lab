console.log("js is linked!");




let eggBasket = []
let num =10

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");
    // Approach1
    // eggBasket[0] = new Egg(random(width),random(height),random(0.3,1));
    // eggBasket[1] = new Egg(random(width),random(height),random(0.3,1));
    // let newEgg = new Egg(random(width),random(height),random(0.3,1));
    // eggBasket.push(newEgg);

    // Approach2
    // for (let i =0; i <num;i++){
    //     let newEgg = new Egg(random(width),random(height),random(0.3,1));
    //     eggBasket.push(newEgg);
    // }
}

function draw() {
    background(120, 90, 230);
    for (i = 0; i<eggBasket.length; i++){
        eggBasket[i].display();
    }

}




class Egg {
    constructor(startx, starty,scaleFactor) {
        this.x = startx
        this.y = starty
        this.s= scaleFactor
    }

    display() {
        push();
        
        translate(this.x, this.y)
        scale(this.s)
        noStroke();
        fill(255, 200);
        arc(0, 0, 80, 80, 0, PI);
        arc(0, 0, 80, 130, PI, 2 * PI);
        pop();
    }
}

function mousePressed(){
    let newEgg = new Egg(mouseX,mouseY,random(0.3,1));
    eggBasket.push(newEgg);
}