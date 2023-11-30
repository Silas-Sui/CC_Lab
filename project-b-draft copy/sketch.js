let Points = []; //所有点的集合
let temp_Points = []; //用于储存临时的可能点
let AnchorPoints = []; //用于创造弦的端点的集合
let n = 1;

function preload() {
    sound1 = loadSound("notes/1.mp3")
    sound2 = loadSound("notes/2.mp3")
    sound3 = loadSound("notes/3.mp3")
    sound4 = loadSound("notes/4.mp3")
    sound5 = loadSound("notes/5.mp3")
    sound6 = loadSound("notes/6.mp3")
    sound7 = loadSound("notes/7.mp3")
    sound8 = loadSound("notes/8.mp3")
    sound9 = loadSound("notes/9.mp3")
    sound10 = loadSound("notes/10.mp3")
    sound11 = loadSound("notes/11.mp3")
    sound12 = loadSound("notes/12.mp3")
    sound13 = loadSound("notes/13.mp3")

}

function setup() {
    let cnv = createCanvas(windowWidth / 2, windowHeight / 2);
    cnv.parent("canvasWrapper")
    background(104, 135, 167);
    //画点图
    for (let y = 20; y < height; y += 40) {
        for (let x = 20; x < width; x += 40) {
            Points.push(new AllPoints(x, y, 6)); //将所有可用点归纳到所有点的集合中
        }
    }
    sound1 = loadSound("notes/1.mp3")
    sound2 = loadSound("notes/2.mp3")
    sound3 = loadSound("notes/3.mp3")
    sound4 = loadSound("notes/4.mp3")
    sound5 = loadSound("notes/5.mp3")
    sound6 = loadSound("notes/6.mp3")
    sound7 = loadSound("notes/7.mp3")
    sound8 = loadSound("notes/8.mp3")
    sound9 = loadSound("notes/9.mp3")
    sound10 = loadSound("notes/10.mp3")
    sound11 = loadSound("notes/11.mp3")
    sound12 = loadSound("notes/12.mp3")
    sound13 = loadSound("notes/13.mp3")
}

function draw() {
    //检测鼠标是否在点附近，并且闪烁
    for (let i = 0; i < Points.length; i++) {
        if (dist(mouseX, mouseY, Points[i].x, Points[i].y) < 10) {
            fill(255);
            let s = map(sin(n * 0.06), -1, 1, 4, 10);
            let r = map(sin(n * 0.06), -1, 1, 255, 243);
            let g = map(sin(n * 0.06), -1, 1, 255, 73);
            let b = map(sin(n * 0.06), -1, 1, 255, 118);

            noStroke();
            fill(0);
            circle(Points[i].x, Points[i].y, 10);
            fill(r, g, b);
            circle(Points[i].x, Points[i].y, s);
        } else {
            // noStroke()
            fill(0);
            // circle(Points[i].x,Points[i].y,13)
            circle(Points[i].x, Points[i].y, 10);
        }
    }
    n++;
    //第一次表现可用弦的端点
    for (let i = 0; i < AnchorPoints.length; i++) {
        AnchorPoints[i].display();
    }

    //绘制静态弦
    if (AnchorPoints.length > 1) {
        if (AnchorPoints.length % 2 == 0) {
            for (let i = 0; i < AnchorPoints.length; i += 2) {
                let d = distToLine(mouseX, mouseY, AnchorPoints[i].x, AnchorPoints[i].y, AnchorPoints[i + 1].x, AnchorPoints[i + 1].y)
                push()
                if (d < 3) {
                    stroke(255, 0, 0); // 设置红色描边
                    //在此处导入audio
                    let string_level = floor(dist(AnchorPoints[i].x, AnchorPoints[i].y, AnchorPoints[i + 1].x, AnchorPoints[i + 1].y))
                    console.log(string_level)
                    //如果string——level在（20，60）（60，100）。。。（420，460）一共10个档位
                    //播放最高的音到最低的音
                    let m = 40
                    if (string_level < 60) {
                        sound1.play()
                        console.log(1)
                    } 
                    if(60 < string_level && 100> string_level) {
                        sound2.play()
                    }
                    if(100 < string_level && 140> string_level) {
                        sound3.play()
                    }
                    if(140 < string_level && 180> string_level) {
                        sound4.play()
                    }
                    if(180 < string_level && 220> string_level) {
                        sound5.play()
                    }
                    if(220 < string_level && 260> string_level) {
                        sound6.play()
                    }
                    if(260 < string_level && 300> string_level) {
                        sound7.play()
                    }
                    // if(20 + 2 * m < string_level < 20 + 3 * m){
                    //     sound3.play()
                    // } 
                    // if(20 + 3 * m < string_level < 20 + 4 * m){
                    //     sound4.play()
                    // } 
                    // if(20 + 4 * m < string_level < 20 + 5 * m){
                    //     sound5.play()
                    // } 
                    // if(20 + 5 * m < string_level < 20 + 6 * m){
                    //     sound6.play()
                    // } 
                    // if(20 + 6 * m < string_level < 20 + 7 * m){
                    //     sound7.play()
                    // } 
                    // if(20 + 7 * m < string_level < 20 + 8 * m){
                    //     sound8.play();
                    // } 
                    // if(20 + 8 * m < string_level < 20 + 9 * m){
                    //     sound9.play();
                    // }


                } else {
                    stroke(0);
                }
                line(AnchorPoints[i].x, AnchorPoints[i].y, AnchorPoints[i + 1].x, AnchorPoints[i + 1].y)
                pop()
            }
        }
    }

    //第二次表现可用弦端点
    for (let i = 0; i < AnchorPoints.length; i++) {
        AnchorPoints[i].display();
    }
    //如果长度大于1:
    //如果目前储存的AP数量为偶数：
    //line（第0位的x，y，第1位的x，y）一直到最后
    //elif目前AP为奇数
    //line（0，1的xy）到最后一个单数（AnchorPoints.length-1）
}

//所有点的集合
class AllPoints {
    constructor(startX, startY, dia) {
        // properties: particle's characteristics
        this.x = startX;
        this.y = startY;
        this.dia = dia;
    }
}

//弦端点的集合
class AnchorPoint {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.dia = 10;
    }
    display() {
        push();
        noStroke();
        translate(this.x, this.y);
        fill(180, 40, 87);
        circle(0, 0, this.dia + 6);
        fill(243, 146, 118);
        circle(0, 0, this.dia + 5);
        fill(243, 74, 118);
        circle(0, 0, this.dia);
        pop();
    }
}

//鼠标指针点击可用点生成新的AP
function mousePressed() {
    for (let i = 0; i < Points.length; i++) {
        if (dist(mouseX, mouseY, Points[i].x, Points[i].y) < 15) {
            AnchorPoints.push(new AnchorPoint(Points[i].x, Points[i].y));
        }
    }
}

//检测鼠标和弦之间的距离
function distToLine(px, py, x1, y1, x2, y2) {
    let A = px - x1;
    let B = py - y1;
    let C = x2 - x1;
    let D = y2 - y1;

    let dot = A * C + B * D;
    let len_sq = C * C + D * D;
    let param = dot / len_sq;

    let xx, yy;

    if (param < 0 || (x1 == x2 && y1 == y2)) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    let dx = px - xx;
    let dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
}
