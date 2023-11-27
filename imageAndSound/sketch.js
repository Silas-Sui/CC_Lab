console.log("js is linked!");

//making a global variable for the
//images and sounds we load
//why global? because we want to load the sound in preload
//but then use the sound in draw or other function
// --> use anything in multiple function, make it GLOBAL
let backgroundImage;

let karateChop;
let readyToChop = true;

//let fruit1;

let fruitBasket = []; //empty array that will hold fruits

let cherriesImage;

let fruitImageArray = [];
let numFruitsImages = 3;

function preload() {
    karateChop = loadSound("sounds/karatechop.mp3")
    backgroundImage = loadImage("images/gradient-bkg.png")

    cherriesImage = loadImage("images/fruit0.png")

    for (let i = 0; i < numFruits; i++) {

        let path = "images/fruit" + i + ".png"
        console.log(path);

        let img = loadImage(path);
        fruitImageArray.push(img);

    }
    console.log(fruitImageArray)

}

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    fruit1 = new Fruit(width / 2, height / 2, cherriesImage)

    for (let i = 0; i < numFruits; i++) {

        let f = new Fruit(random(width, random(height)), fruitImageArray[0]);
        fruitBasket.push(singleFruit);
    }

}

function draw() {
    background(0);
    image(backgroundImage, 0, 0, 400, 400)

    let distance = dist(pmouseX, pmouseY, mouseX, mouseY);

    if (mouseIsPressed == true) {
        //distance between current mouse position and 
        //mouse position in previous frame

        if (distance > 30 && readyToChop == true) {

            karateChop.play();
            readyToChop = false;

        } else if (distance < 10) {
            readyToChop = true;

        }

    }


    //circle (mouseX,mouseY,5)
    stroke(255)
    line(pmouseX, pmouseY, mouseX, mouseY)

    //displaying numbers
    fill(255);
    text(distance, 100, 100);

    fruit1.display();
}

function mousePressed() {

    // karateChop.play();
}

class Fruit {

    constructor(startX, startY, fruitImg) {

        this.x = startX
        this.y = startY

        this.img = fruitImg
    }

    display() {

        push()
        translate(this.x, this.y);

        circle(0, 0, 50)
        image(this.img, -25, -25, 50, 50)



        pop();
    }
}