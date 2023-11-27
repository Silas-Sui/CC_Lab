console.log("this is linked?")
let Points = []

function setup(){
    background(220)
    let cnv = createCanvas(windowWidth/2,windowHeight/2);
    cnv.parent("canvasWrapper")
    for (let y = 0; y < height; y += 40) {
        for (let x = 2; x < width; x += 40) {
            circle(x,y,4)
            Points.push(circle)
        }
    }
    
}

function draw(){
    
}

