let confettis = [];
let numConfetti = 1;

let backgroundHue = 0;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvasWrapper");



  colorMode(HSB);
  backgroundHue = random(0, 360);

}

function draw() {
  background(backgroundHue, 10, 190);
  // for (let i = 0; i < numConfetti; i++) {
  //   confettis.push(new Confetti(mouseX, mouseY))
  // }
  if (mouseIsPressed == true) {
    for (let i = 0; i < 3 * numConfetti; i++) {
      confettis.push(new Confetti(mouseX, mouseY))
    }
  }

  for (let i = 0; i < confettis.length; i++) {
    confettis[i].update();
    confettis[i].checkOutOfCanvas();
    confettis[i].display();
  }
  console.log(confettis.length)

  for (let i = confettis.length - 1; i >= 0; i--) {

    // for each confetti check if its on canvas
    if (confettis[i].onCanvas == false) {
      // delete this confetti
      confettis.splice(i, 1);
    }

  }

}




class Confetti {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(12, 20);
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);
    this.transparent = 1
    this.hue = random(0, 360);
    this.para = floor(random(3, 6))
  }
  checkOutOfCanvas() {

    // vertical
    if (this.y > height) {
      this.onCanvas = false;
    }
    // horizontal
    if (this.x < 0 || this.x > width) {
      this.onCanvas = false;
    }
  }
  update() {
    // apply speeds to position
    this.x += this.speedX;
    this.y += this.speedY;
    // slowly change speeds
    // y slowly turns downward (positive)
    //维持上方
    if (this.para == 5) {
      this.transparent -= 0.008
    }
    //向前
    if (this.para == 4) {
      if (this.size < random(30,50)) {
        this.size *= random(1.01, 1.03)
        this.transparent -= 0.008
      } else {
        this.transparent -= 0.008
      }


    }
    if (this.para == 3) {
      if(this.size>2){
        this.size *= random(0.96, 0.99)
      }else{
        this.transparent -= 0.008
      }
      
     
    }

    if (this.y > width - this.size / 2 ) {
      this.speedY = -this.speedY
    } else {
      this.speedY = this.speedY + 0.19;
      // x slowly turn towards 0
      this.speedX = this.speedX * 1.001;
    }



  }
  display() {
    push();
    translate(this.x, this.y);
    fill(this.hue, 255, 255, this.transparent);
    noStroke();
    circle(0, 0, this.size);
    pop();
  }
}

// function mousePressed() {
//   for (let i = 0; i < numConfetti; i++) {
//     confettis.push(new Confetti(mouseX, mouseY))
//   }
// }