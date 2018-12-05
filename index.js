
let context;

var start;
let movement = 8;
let player1;
let player2;
const gameArea = new Game();
let animate2;
let player1Images = ["./assests/ken_street_fighter.png", "./assests/ken_streetfighter2.png"]
let player2Images = ["./assests/sagat/sagat1.png", "./assests/sagat/sagat2.png", "./assests/sagat/sagatJump.png"]

let canvas1 = document.createElement('canvas')
canvas1.id = 'playerOne'
canvas1.width = 200;
canvas1.height = 20;
document.querySelector('#health-bars').appendChild(canvas1);


let canvas2 = document.createElement('canvas')
canvas2.id = 'playerTwo'
canvas2.width = 200;
canvas2.height = 20;
document.querySelector('#health-bars').appendChild(canvas2);


let contextPlayerOne = canvas1.getContext('2d');
let contextPlayerTwo = canvas2.getContext('2d');

playerOneHealth();
playerTwoHealth();

window.addEventListener("load", function(e) {
    // var gp = navigator.getGamepads()[e.gamepad.index];
    // console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    // gp.index, gp.id,
    // gp.buttons.length, gp.axes.length);
    gameArea.start();
    player1 = new Player(60, 120, 200, 370, player1Images);
    animatePlayer(player1)
    player2 = new Player(60, 100, 600, 350, player2Images);
    animatePlayer(player2);
    // const p1 = new PlayerOneHealth();
    // const p2 = new PlayerTwoHealth();
    // animate2 = new Animate(player2);
    // animate2.static();
    gameLoop();
  });

function buttonPressed(b) {
    if (typeof(b) == "object") {
        return b.pressed;
    }
}

function gameLoop() {
  // console.log("hello")
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
            // animate2.jump();
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

    if(axis === "x"){
        return a.middleX + movement <= b.middleX + 5 &&
            a.middleX + movement + 5 >= b.middleX &&
            a.y <= b.y + b.height &&
            a.y + a.height >= b.y
    } else {
        return a.middleX <= b.middleX + 5 &&
        a.middleX + 5 >= b.x &&
        a.y + movement <= b.y + b.height &&
        a.y + movement + a.height >= b.y
    }
}

function fullscreen(){
let el = document.querySelector('canvas');
           if(el.webkitRequestFullScreen) {
               el.webkitRequestFullScreen();
           }
          else {
             el.mozRequestFullScreen();
          }
}

function playerOneHealth() {

    contextPlayerOne.clearRect(0, 0, window.innerWidth,window.innerHeight);
    contextPlayerOne.fillStyle = 'rgba(155,155,0,1)';
    contextPlayerOne.fillRect(0,0,window.innerWidth,window.innerHeight);

}

function playerOneDamage(){
  let hitter = 50;
  contextPlayerOne.fillStyle = 'rgba(155,0,0,0.5)';
  contextPlayerOne.fillRect(0,0,hitter,window.innerHeight);
}


function playerTwoHealth() {

    contextPlayerTwo.clearRect(0, 0, window.innerWidth,window.innerHeight);
    contextPlayerTwo.fillStyle = 'rgba(155,155,0,1)';
    contextPlayerTwo.fillRect(0,0,window.innerWidth,window.innerHeight);

}

function playerTwoDamage(){
  let hitter = 50;
  contextPlayerTwo.fillStyle = 'rgba(155,0,0,0.5)';
  contextPlayerTwo.fillRect(0,0,hitter,window.innerHeight);
}

function updateGameArea() {
    gameArea.clear();
    player1.update();
    player2.update();
}
