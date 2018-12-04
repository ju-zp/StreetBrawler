
let canvas = document.querySelector('canvas');


//setting canvas to maximum page height and width
canvas.width = window.innerWidth;
canvas.height = 700;


//passing methods and functions to draw on canvas
let context = canvas.getContext('2d');

let kenIdle = ['./assests/ken_street_fighter.png','./assests/ken_street_fighter.png', './assests/ken_4.png']

let fighterSprite = new Image();
let sprite = 0

function charChange (){
  console.log(sprite)
  sprite++;
  if (sprite >= 3 ){
    sprite = 0;
  }
  fighterSprite.src = kenIdle[sprite];
}



setInterval(function(){ charChange () },500);
//variable to hold horizontal and vertical placement values for sprite.
let x = 50;
let y = 550;
//velocity of horizontal and vertical
let dx = 0;
let dy = 0;
//setting radius of sprite
let radius = 50;
//Function to animate an object
  function animate() {
    requestAnimationFrame(animate);
    //code to clear the page
    context.clearRect(0, 0, innerWidth, innerHeight);
    // code to draw a circle and place it on the screen
    context.drawImage(fighterSprite, x, y);

    //logic to limit the movement to the size of the screen
    if (x + radius > innerWidth || x - radius < 0) {
      dx = -dx;
    }
    if (y < 550 ) {
      console.log(y)
      dy = -dy;
      setTimeout(myFunction(), 400)
      function myFunction() {
        console.log(y)
        y += 5
      }
    }
    //increasing the horizontal variable by the velocity variable 'dx' each time the page refreshes.
    x += dx;
    y += dy;
    dy = 0
    dx = 0
  }




  document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'd'){
      dx += 30
    }else if (keyName === 'a'){
      dx -= 30
    }else if (keyName === 'w' && y === 550){
      dy -= 200
    } else if (keyName === 's'){
      y = 650
    }
  });

animate()
// console.log(canvas)



// let player1;
// let player2;
// let movement = 10;
// let player1Images = ["images/player1.png", "images/player1pos2.png"]
// let player2Images = ["images/player2.png", "images/player2pos2.png"]

// document.addEventListener("keydown", e => {
//     if(e.key === "w" && player1.y > 0){
//         if(!player1collides(player1, player2, "y", -10)){
//             player1.moveUp();
//         };
//     } else if(e.key === "s" && player1.y + player1.height < 480){
//         if(!player1collides(player1, player2, "y", 10)){
//             player1.moveDown();
//         };
//     } else if(e.key === "a" && player1.x > 0){
//         if(!player1collides(player1, player2, "x", -10)){
//             player1.moveLeft();
//         };
//     } else if(e.key === "d" && player1.x + player1.width < 900){
//         if(!player1collides(player1, player2, "x", 10)){
//             player1.moveRight();
//         };
//     } 
// })

// document.addEventListener("keydown", e => {
//     if(e.key === "ArrowUp" && player2.y > 0){
//         if(!player1collides(player2, player1, "y", -10)){
//             player2.moveUp();
//         };
//     } else if(e.key === "ArrowDown" && player2.y + player2.height < 480){
//         if(!player1collides(player2, player1, "y", 10)){
//             player2.moveDown();
//         };
//     }else if(e.key === "ArrowLeft" && player2.x > 0){
//         if(!player1collides(player2, player1, "x", -10)){
//             player2.moveLeft();
//         };
//     }else if(e.key === "ArrowRight" && player2.x + player2.width < 900){
//         if(!player1collides(player2, player1, "x", 10)){
//             player2.moveRight();
//         };
//     }
// })


// const startGame = () => {
//     gameArea.start();
//     player1 = new component(60, 120, "red", 10, 220, player1Images);
//     player1Animation();
//     player2 = new component(60, 120, "blue", 830, 220, player2Images);
//     player2Animation();
// }

// const player1Animation = () => {
//     return setInterval(() =>{
//         console.log(player1);
//         player1.stage = !player1.stage;
//         if(player1.stage){
//             player1.image.src = player1.images[1];
//         } else {
//             player1.image.src = player1.images[0];
//         }
//     }, 300);
// }

// const player2Animation = () => {
//     return setInterval(() =>{
//         console.log(player2);
//         player2.stage = !player2.stage;
//         if(player2.stage){
//             player2.image.src = player2.images[1];
//         } else {
//             player2.image.src = player2.images[0];
//         }
//     }, 300);    
// }

// const animatePlayer = (player) => {
//     console.log(player)
//     player.stage = !player.stage;
//     if(player.stage){
//         player.image.src = player.images[1];
//     } else {
//         player.image.src = player.images[0];
//     }
// }

// const gameArea = {
//     canvas: document.createElement("canvas"),
//     start: function() {
//         this.canvas.width = 900;
//         this.canvas.height = 480;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.interval = setInterval(updateGameArea, 20);
//     }, 
//     clear: function() {
//         this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
//     }
// }

// function component (width, height, color, x, y, images) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.images = images
//     this.stage = false;
//     this.image = new Image();
//     this.image.src = this.images[0];
//     this.update = function(){
//         ctx = gameArea.context;
//         ctx.fillRect(this.x,this.y, this.width, this.height);
//         ctx.drawImage(this.image, this.x,this.y);
//     };
//     this.moveUp = function(){
//         this.y -= movement;
//     };
//     this.moveDown = function(){
//         this.y += movement;
//     };
//     this.moveLeft = function(){
//         this.x -= movement;
//     };
//     this.moveRight = function(){
//         this.x += movement;
//     }
// }

// function player1collides(a, b, axis, movement){
//     if(axis === "x"){
//         return a.x + movement <= b.x + b.width &&
//             a.x + movement + a.width >= b.x &&
//             a.y <= b.y + b.height &&
//             a.y + a.height >= b.y
//     } else {
//         return a.x <= b.x + b.width &&
//         a.x + a.width >= b.x &&
//         a.y + movement <= b.y + b.height &&
//         a.y + movement + a.height >= b.y
//     }
// }

// function updateGameArea() {
//     gameArea.clear();
//     player1.update();
//     player2.update();
// }
