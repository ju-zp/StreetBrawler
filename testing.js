
let context;

var start;
let movement = 20;
let player1;
let player2;
const gameArea = new Game();
let player1Images = ["./assests/ken_street_fighter.png", "./assests/ken_streetfighter2.png"]

let player2Images = ["images/player2.png", "images/player2pos2.png"]

window.onload = () => {
    gameArea.start();
    player1 = new Player(60, 120, 200, 350, player1Images);
    animatePlayer(player1)
    player2 = new Player(60, 120, 830, 500, player2Images);
    animatePlayer(player2)
    // gameLoop();
}


// function buttonPressed(b) {
//     if (typeof(b) == "object") {
//         return b.pressed;
//     }
// }

// function gameLoop() {
//     var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
//     if (!gamepads) {
//       return;
//     }

//     var gp = gamepads[0];
//     if (buttonPressed(gp.buttons[0])) {
//         if(!player1collides(player1, player2, "y", -10)){
//             if(!player1.hasJumped){
//               player1.moveUp();
//             }
//         }
//     } else if (buttonPressed(gp.buttons[14]) && player1.x > 0) {
//         if(!player1collides(player1, player2, "x", -10)){
//             player1.moveLeft();
//         }
//     }
//     if (buttonPressed(gp.buttons[15]) && player1.x + player1.width < 1422) {
//         if(!player1collides(player1, player2, "x", 10)){
//             player1.moveRight();
//         }
//     } else if (buttonPressed(gp.buttons[13]) && player1.y + player1.height < 480) {
//         if(!player1collides(player1, player2, "y", 10)){
//             player1.moveDown();
//         }
//     }

//     start = requestAnimationFrame(gameLoop);
// }

document.addEventListener("keydown", e => {
    if(e.key === "ArrowUp" && player2.y > 0){
        if(!player1collides(player2, player1, "y", -10)){
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

// document.addEventListener("keydown", e => {
//     if(e.key === "w" && player1.y > 0){
//         if(!player1collides(player1, player2, "y", -10)){
//             player1.moveUp();
//         };
//     } else if(e.key === "s" && player1.y + player1.height < 480){
//         if(!player1collides(player1, player2, "y", 10)){
//             player1.moveDown();
//         };
//     }else if(e.key === "a" && player1.x > 0){
//         if(!player1collides(player1, player2, "x", -10)){
//             player1.moveLeft();
//         };
//     }else if(e.key === "d" && player1.x + player1.width < 900){
//         if(!player1collides(player1, player2, "x", 10)){
//             player1.moveRight();
//         };
//     }
// })

setInterval(function(){
  var map = {};
  onkeydown = onkeyup = function(e){
      e = e || event;
      map[e.keyCode] = e.type == 'keydown';
        console.log(map)
        if (map[87] === false && map[68] === false){
              player1.moveUpRight();
          } else if (map[87] === false){
               player1.moveUp();
              }else if (map[65] === false){
               player1.moveLeft();
             }else if (map[87] === false && this.yd === 350){
               player1.moveUp();
             } else if (map[83] === false){
               player1.moveDown();
           }else if (map[68] === false){
             player1.moveRight();
         }
  }
map = {};
},300);




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
    if(axis === "x"){
        return a.x + movement <= b.x + b.width &&
            a.x + movement + a.width >= b.x &&
            a.y <= b.y + b.height &&
            a.y + a.height >= b.y
    } else {
        return a.x <= b.x + b.width &&
        a.x + a.width >= b.x &&
        a.y + movement <= b.y + b.height &&
        a.y + movement + a.height >= b.y
    }
}

function updateGameArea() {
    gameArea.clear();
    player1.update();
    player2.update();
}
