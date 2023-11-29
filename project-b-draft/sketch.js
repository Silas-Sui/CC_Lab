let Points = []; //所有点的集合
let temp_Points = []; //用于储存临时的可能点
let AnchorPoints = []; //用于创造弦的端点的集合
let n = 1;

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
            fill(r,g,b);
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
                let d = distToLine(mouseX,mouseY,AnchorPoints[i].x, AnchorPoints[i].y, AnchorPoints[i + 1].x, AnchorPoints[i + 1].y)
                push()
                if (d < 8) {
                    stroke(255, 0, 0); // 设置红色描边
                    //在此处导入audio
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
