let confettis = [];
let numConfetti = 100;

let backgroundHue = 0;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvasWrapper");



  colorMode(HSB);
  backgroundHue = random(0, 360);

}

function draw() {
  background(backgroundHue, 10, 190);

  for (let i = 0; i < confettis.length; i++) {
    confettis[i].update();
    confettis[i].display();
  }
  console.log(confettis.length)
}



class Confetti {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);
    this.transparent = 1
    this.hue = random(0, 360);
    this.para = floor(random(3, 6))
  }
  update() {
    // apply speeds to position
    this.x += this.speedX;
    this.y += this.speedY;
    // slowly change speeds
    // y slowly turns downward (positive)
    //维持上方
    if (this.para == 5) {

      this.transparent -= 0.01

    }
    //向前
    if (this.para == 4) {
      this.size *= random(1.01, 1.03)
      this.transparent -= 0.01
    }
    if (this.para == 3) {
      this.size *= random(0.96, 0.99)
      this.transparent -= 0.01
    }
    this.speedY = this.speedY + 0.1;
    // x slowly turn towards 0
    this.speedX = this.speedX * 0.99;

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

function mousePressed() {
  for (let i = 0; i < numConfetti; i++) {
    confettis.push(new Confetti(mouseX, mouseY))
  }
}