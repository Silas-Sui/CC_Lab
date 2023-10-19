let bacteria = []; // 存储细菌对象的数组
let click = [];
let click_Boolean = [];
let Dia_bac = [];
let r = 0;
let g = 0;
let b = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width > height) {
    dishDiameter = height;
  } else {
    dishDiameter = width;
  }
}

function draw() {
  // 绘制培养皿
  // background(255);
  let r = map(sin(frameCount*0.1), -1, 1, 128, 90);
  let b = map(cos(frameCount*0.1), -1, 1, 117, 80);
  let g = map(sin(frameCount*0.1), -1, 1, 30, 60);
  fill(198, 253, 255);
  circle(width / 2, height / 2, dishDiameter);
  // console.log(click,click.length)
  // 绘制细菌并更新位置
  for (let i = click.length - 1; i >= 0; i--) {
    fill(r, g, b); // 细菌颜色
    circle(click[i].x, click[i].y, 10);

    // 控制繁殖间隔时间
    if (frameCount % 3 === 0) {
      // 添加新细菌
      let angle = random(2 * PI);
      console.log(click, click_Boolean);
      //半径增长速度
      Dia_bac[i] *= 1.015;
      if (Dia_bac[i] >= 20) {
        Dia_bac[i] = 20;
      }
      let newX = click[i].x + cos(angle) * Dia_bac[i] * random(10);
      let newY = click[i].y + sin(angle) * Dia_bac[i] * random(10);

      //判定是否出圈
      let d = dist(newX, newY, width / 2, height / 2);
      if (d < width / 2 - 10) {
        //新bac（普通点）
        bacteria.push(createVector(newX, newY));
        //新的click出现（生殖中的能生育细胞）
        if (
          (Dia_bac[i] >= 15) &
          (floor(random(10)) == 1) &
          (click_Boolean[i] == 1) &
          (click.length <= 20)
        ) {
          click.push(createVector(newX, newY));
          click_Boolean[i] = 0; //生殖完成
          click_Boolean.push(1); //具有生殖能力
          Dia_bac.push(1);
          //console.log(click_Boolean, i);
        }
      }
    }
  }

  //细菌
  for (let j = bacteria.length - 1; j >= 0; j--) {
    noStroke();
    fill(r, g, b, 30); // 细菌颜色
    circle(bacteria[j].x+random(1), bacteria[j].y+random(1), 10);
  }
}

function mouseClicked() {
  //初点
  let t = dist(mouseX, mouseY, width / 2, height / 2);
  if (t < width / 4) {
    click.push(createVector(mouseX, mouseY));
    Dia_bac.push(1);
    click_Boolean.push(1);
  }
}
// 1