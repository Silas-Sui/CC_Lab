console.log("js is linked!");
let backgroundImage
let karateChop
let readyToChop = true;
let fruit1;

function preload(){
    karateChop = loadSound('sound/karate.m4a')
    backgroundImage = loadImage('Images/gradient-bkg.png')
}
function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    fruit1 = new Fruit(width/2,height/2);

    
}

function draw(){
    background(0,50);
    image(backgroundImage,0,0,400,400)
    let distance = dist(pmouseX,pmouseY,mouseX,mouseY)

    if( mousePressed ==True){
        if(distance >30 && readyToChop == ture){

        }
    }


}
function mousePressed(){

}

class Fruit{
    constructor(startX,startY){
        this.x = startX
        this.y = startY
    }
    display(){
        push();
        translate(this.x,this.y);
        circle(0,0,50);
        pop()
    }
}