console.log("this is linked?")
let backgroundColor = 220
let Points = []
let String = []

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    background(backgroundColor)
    cnv.parent("canvasWrapper")
    // 下面绘制网格，以40为单位长度
    for (let y = 0; y < height; y += 40) {
        for (let x = 0; x < width; x += 40) {
            rect(x, y, 40, 40);
            circle(x,y,4)
            Points.push(circle)
        }
    }
    
}

function draw() {
    // console.log(Points)
    // for (let i = 0; i < Points.length;i++) {
    //     ellipse(Points[i], 20, 20);
    //   }
    circle(width/2,height/2,100)
    console.log(1)
}

function mousePressed(){
    // for ( i = 0; i<Points.length; i++){
    //     console.log(Points[i].x)  
    // }
    let newPoint = createVector(mouseX, mouseY);
    Points.push(newPoint);
}