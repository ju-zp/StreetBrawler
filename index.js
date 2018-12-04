
// let canvas = document.querySelector('canvas');


// //setting canvas to maximum page height and width
// canvas.width = window.innerWidth;
// canvas.height = 700;


//passing methods and functions to draw on canvas
let context;

// const kenIdle = ['./assests/ken_street_fighter.png','./assests/ken_street_fighter.png', './assests/ken_4.png']
// const kenJumping = ['./assests/ken_jumping/ken_jump1.png', './assests/ken_jumping/ken_jump2.png']

// let fighterSprite = new Image();
// let sprite = 0

// function charChangeIdle (){
//   sprite++;
//   if (sprite >= 3 ){
//     sprite = 0;
//   }
//   fighterSprite.src = kenIdle[sprite];
// }
// function kenJump (){
//   sprite++;
//   if (sprite >= 1 ){
//     sprite = 0;
//   }
//   fighterSprite.src = kenJumping[sprite];
// }



// setInterval(function(){ charChangeIdle () },500);

// //variable to hold horizontal and vertical placement values for sprite.
// let x = 50;
// let y = 550;
// //velocity of horizontal and vertical
// let dx = 0;
// let dy = 0;
// //setting radius of sprite
// let radius = 50;
// //Function to animate an object
//   function animate() {
//     requestAnimationFrame(animate);
//     //code to clear the page
//     context.clearRect(0, 0, innerWidth, innerHeight);
//     // code to draw a circle and place it on the screen
//     context.drawImage(fighterSprite, x, y);
//     //logic to limit the movement to the size of the screen
//     if (x + radius > innerWidth || x - radius < 0) {
//       dx = -dx;
//     }
//     if (y < 550 ) {
//       console.log(y)
//       dy = -dy;
//       setTimeout(myFunction(), 400)
//       function myFunction() {
//         console.log(y)
//         y += 5
//       }
//     }
//     //increasing the horizontal variable by the velocity variable 'dx' each time the page refreshes.
//     x += dx;
//     y += dy;
//     dy = 0
//     dx = 0
//   }

  // document.addEventListener('keyup', (event) => {
  //   let keyName = []
  //   keyName.push(event.key)
  //
  //
  //   // const keyName = event.key;
  //     console.log(keyName[0])
  //     console.log(keyName[1])
  //
  //   if (keyName[0] === 'd' && keyName[1] === 'w'){
  //       console.log('yep')
  //         dx += 300
  //         dy -= 300
  //     } else if (keyName[0] === 'd'){
  //     dx += 30
  //     setInterval(function(){
  //         if(y !== 550){
  //       kenJump () }else {
  //         return;
  //       }},500);
  //   }else if (keyName[0] === 'a'){
  //     dx -= 30
  //   }else if (keyName[0] === 'w' && y === 550){
  //     dy -= 200
  //   } else if (keyName[0] === 's'){
  //     y = 650
  // }
  // keyName.length = 0;
  //
  // });





// setInterval(function(){

//   var map = {}; // You could also use an array
//   onkeydown = onkeyup = function(e){
//       e = e || event; // to deal with IE
//       map[e.keyCode] = e.type == 'keydown';
//       /* insert conditional here */
//       console.log(map)

//         if (map[87] === false && map[68] === false){
//             console.log('yep')
//               dx += 100
//               dy -= 100
//           } else if (map[68] === false){
//                dx += 30
//                setInterval(function(){
//                    if(y !== 550){
//                  kenJump () }else {
//                    return;
//                  }},500);
//              }else if (map[65] === false){
//                dx -= 30
//              }else if (map[87] === false && y === 550){
//                dy -= 100
//              } else if (map[83] === false){
//                y = 650
//            }
//   }

//   map = {};
// },1000);

// setInterval(function(){

//   var map = {}; // You could also use an array
//   onkeydown = onkeyup = function(e){
//       e = e || event; // to deal with IE
//       map[e.keyCode] = e.type == 'keydown';
//       /* insert conditional here */
//       console.log(map)

//         if (map[87] === false && map[68] === false){
//             console.log('yep')
//               dx += 100
//               dy -= 100
//           } else if (map[68] === false){
//                dx += 30
//                setInterval(function(){
//                    if(y !== 550){
//                  kenJump () }else {
//                    return;
//                  }},500);
//              }else if (map[65] === false){
//                dx -= 30
//              }else if (map[87] === false && y === 550){
//                dy -= 100
//              } else if (map[83] === false){
//                y = 650
//            }

//   }
//  map = {};
// },500);


// animate()
// console.log(canvas)

var start;
let movement = 8;
let player1;
let player2;
const gameArea = new Game();
let animate2;
let player1Images = ["images/player1.png", "images/player1pos2.png"]
let player2Images = ["assests/sagat/sagat1.png", "assests/sagat/sagat2.png", "assests/sagat/sagatJump.png"]

window.addEventListener("gamepadconnected", function(e) {
    var gp = navigator.getGamepads()[e.gamepad.index];
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index, gp.id,
    gp.buttons.length, gp.axes.length);
    gameArea.start();
    player1 = new Player(60, 120, 10, 500, player1Images);
    animatePlayer(player1)
    player2 = new Player(60, 100, 830, 500, player2Images);
    animate2 = new Animate(player2);
    animate2.static();
    gameLoop();
  });

function buttonPressed(b) {
    if (typeof(b) == "object") {
        return b.pressed;
    }
}
  
function gameLoop() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) {
      return;
    }
  
    var gp = gamepads[0];
    if (buttonPressed(gp.buttons[0])) {
        if(!player1collides(player1, player2, "y", -10)){
            if(!player1.hasJumped){
              player1.moveUp();
            }
        }
    } else if (buttonPressed(gp.buttons[14]) && player1.x > 0) {
        if(!player1collides(player1, player2, "x", -10)){
            player1.moveLeft();
        }
    }
    if (buttonPressed(gp.buttons[15]) && player1.x + player1.width < 1422) {
        if(!player1collides(player1, player2, "x", 10)){
            player1.moveRight();
        }
    } else if (buttonPressed(gp.buttons[13]) && player1.y + player1.height < 480) {
        if(!player1collides(player1, player2, "y", 10)){
            player1.moveDown();
        }
    }
  
    start = requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", e => {
    if(e.key === "ArrowUp" && player2.y > 0){
        if(!player1collides(player2, player1, "y", -10)){
            animate2.jump();
            player2.moveUp();
        };
    } else if(e.key === "ArrowDown" && player2.y + player2.height < 480){
        if(!player1collides(player2, player1, "y", 10)){
            player2.moveDown();
        };
    }else if(e.key === "ArrowLeft" && player2.x > 0){
        if(!player1collides(player2, player1, "x", -10)){
            player2.moveLeft();
        };
    }else if(e.key === "ArrowRight" && player2.x + player2.width < 900){
        if(!player1collides(player2, player1, "x", 10)){
            player2.moveRight();
        };
    }
})

const animatePlayer = (player) => {
    return setInterval(() =>{
        player.stage = !player.stage;
        if(player.stage){
            player.image.src = player.images[1];
        } else {
            player.image.src = player.images[0];
        }
    }, 300);
}

function player1collides(a, b, axis, movement){
  // console.log(a);
    if(axis === "x"){
        return a.middleX + movement <= b.middleX + 20 &&
            a.middleX + movement + 20 >= b.middleX &&
            a.y <= b.y + b.height &&
            a.y + a.height >= b.y
    } else {
        return a.middleX <= b.middleX + 20 &&
        a.middleX + 20 >= b.x &&
        a.y + movement <= b.y + b.height &&
        a.y + movement + a.height >= b.y
    }
}

function updateGameArea() {
    gameArea.clear();
    player1.update();
    player2.update();
}

