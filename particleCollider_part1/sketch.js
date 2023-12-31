console.log("js is linked!");

// array that will hold ALL of the atoms
let atoms = [];
// number of atoms we want initially!
let numAtoms = 6;
let fruitImages = []

function preload(){
    for(let i = 0; i<3;i++){
        console.log(i)
        let path = "images/fruit"+i+".png"
        fruitImages[i] = loadImage(path);
    }
}

function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");

    for(let i = 0; i < numAtoms; i++){
        atoms.push( new Atom(fruitImages[0]) )
    }
    console.log(atoms);

    rectMode(CENTER);

}

function draw(){
    background(0);

    if(random()<0.02){
        atoms.push( new Atom(fruitImages[0]) )
    }


    for(let i = 0; i < atoms.length; i++){
        // console.log("i is ", i);

        let currentAtom = atoms[i];
        currentAtom.display();
        currentAtom.fly();
        // currentAtom.checkIfOutofCanvas();
        // currentAtom.checkIfTouched(mouseX, mouseY);
        // loop again over all atoms and check if any of them touches
        // the current atom[i]

        // before we check if the atom is touched by another
        // we set it to 'not being touched':
        currentAtom.isTouched = false;
        // now we looop over the other atoms to check if any of them collides
        // with the current one:
        for(let j = 0; j < atoms.length; j++){
            // we only want to check the other atoms
            // if (1) they aren't the same as the current one (i!=j)
            // and (2) they aren't touched yet (as soon as they are
            // touched by at least on atom, we have no reasons to go on
            // checking since we don't care about how many other atoms are
            // touching)
            if(i != j && currentAtom.isTouched == false){
                // only check for OTHER atoms, 
                // not for the current atom itself
                // console.log("    j is ", j);
                let otherAtom = atoms[j];
                let otherLeft = otherAtom.x - otherAtom.size/2;
                let otherRight = otherAtom.x + otherAtom.size/2;
                let otherUpper = otherAtom.y - otherAtom.size/2;
                let otherLower = otherAtom.y + otherAtom.size/2;
                // console.log("    otherX:", otherX);
                // console.log("    otherLower:", otherLower);
                currentAtom.checkIfTouched(otherRight,otherLeft,otherLower,otherUpper);
            }
            



        }
    }
    // for(let i = atoms.length-1; i>=0; i--){
    //     let currentAtom = atoms[i];
    //     if(currentAtom.isOnCanvas == flase){
    //         atoms.splice(atoms)
    //     }

    
}

class Atom{

    // previously:
    // constructor(startX, startY){
    // noticed we don't need startX and strartY
    // parameter because we never need to 
    // position an atom precisely at a certain
    // spot but always generate their position at random:
    constructor(fruitImage){
        this.img = fruitimage;
        // i don't define this.x up here
        // but do it further below after having picked 
        // the atom's direction:
        // this.x = width/2;
        this.y = random(0, height);
        this.size = 40;
        this.speed = random(3, 5);
        // this.direction = random(  -1, 1 ); // pick value between -1 and 1
        this.direction = random( [-1, 1] ); // picks either -1 or 1
       
        // after picked the direction
        // i can now define the initial this.x location
        if(this.direction == -1){
            // if flying left, start at the right
            this.x = width + 100;
        }else{
            // if flying right, start at the left
            this.x = -100;
        }
        

        this.isTouched = false;

    }
    display(){
        push();
        translate(this.x, this.y);

        if(this.isTouched == true){
            fill("red");
        }else{
            fill(255)
        }

        // rememeber we switched to rectMode(CENTER)
        // in the setup function, that's why this rect
        // will be drawn from its center and right 
        // on top of the atom's this.x, this.y
        rect(0, 0, this.size, this.size);
        image(this.img,0,0)
        // helper dot:
        fill("red");
        circle(0, 0, 5);
        pop();
    }
    fly(){
        // this.x changes by atom's speed 
        // with regards to its direction:
        this.x += this.speed*this.direction
    }
    checkIfTouched(otherRight,otherLeft,otherLower,otherUpper){
        // bigger than left edge, smaller than right edge      bigger than upper edge, smaller than lower edge 
        let leftEdge = this.x - this.size/2;
        let rightEdge = this.x + this.size/2;
        let upperEdge = this.y - this.size/2;
        let lowerEdge = this.y + this.size/2;

        // check if the x and y pair (otherX and otherLower) that 
        // was passed in to this function
        // is colliding with this atom:
        if(otherRight > leftEdge && otherLeft < rightEdge && otherLower > upperEdge && otherUpper < lowerEdge){
            // if all four conditions are met, a collision occurred 
            this.isTouched = true;
        }else{
            this.isTouched = false;
        }
    }
    // checkIfOutofCanvas(){
    //     if(this.x <= -)
    // }


}
