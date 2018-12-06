
document.body.style.zoom = 1.25

let context;

// animate()
// console.log(canvas)

var start;
let movement = 8;
let connected = false;
let player1;
let player2;
let player1animation;
let player2animation;
const gameArea = new Game();
let animate2;
let player1Images = ["./assests/ken/normal/ken_street_fighter.png", "./assests/ken/normal/ken_streetfighter2.png", "./assests/ken/normal/ken_jump2.png", "./assests/ken/normal/kenDuck.png", "./assests/ken/normal/kenPunch.png", "./assests/ken/normal/kenKick.png"]
let reversedPlayer1Images = ["./assests/ken/reverse/ken_street_fighter.png", "./assests/ken/reverse/ken_streetfighter2.png", "./assests/ken/reverse/ken_jump2.png", "./assests/ken/reverse/kenDuck.png", "./assests/ken/reverse/kenPunch.png", "./assests/ken/reverse/kenKick.png"]
let reversedPlayer2Images = ["assests/sagat/reversed/sagat1.png", "assests/sagat/reversed/sagat2.png", "assests/sagat/reversed/sagatJump.png", "assests/sagat/reversed/sagatDuck.png", "assests/sagat/reversed/sagatPunch.png", "assests/sagat/reversed/sagatKick.png"]
let player2Images = ["assests/sagat/normal/sagat1.png", "assests/sagat/normal/sagat2.png", "assests/sagat/normal/sagatJump.png", "assests/sagat/normal/sagatDuck.png", "assests/sagat/normal/sagatPunch.png", "assests/sagat/normal/sagatKick.png"]



let canvas1 = document.createElement('canvas')
canvas1.id = 'playerOne'
canvas1.width = 200
canvas1.height = 20
let canvas2 = document.createElement('canvas')
canvas2.id = 'playerTwo'
canvas2.width = 200
canvas2.height = 20

let contextPlayerOne = canvas1.getContext('2d');
let contextPlayerTwo = canvas2.getContext('2d');


window.addEventListener("load", function(e) {
    console.log(e)
    // var gp = navigator.getGamepads()[e.gamepad.index];
    // console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    // gp.index, gp.id,
    // gp.buttons.length, gp.axes.length);

    gameArea.start();
    player1 = new Player(40, 85, 200, 370, reversedPlayer1Images, player1Images, false);
    player2 = new Player(40, 85, 600, 350, reversedPlayer2Images, player2Images, true)
    animatePlayer1;
    animatePlayer2
    playerOneHealth();
    playerTwoHealth();
    createClock();

    // player1.animatePlayer();

    // player2animation.animation();

    gameLoop();
  });

function buttonPressed(b) {
    if (typeof(b) == "object") {
        return b.pressed;
    }
}

function gameLoop() {
    let gp;
    let gp2;
    if(!connected){
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        if (!gamepads) {
        return;
        }
        for(const gamepad of gamepads){
            if(gamepad){
                if(gamepad.id.charAt(0) === "X"){
                    gp2 = gamepad;
                } else if(gamepad.id.charAt(0) === "W")  {
                    gp = gamepad;
                }
            }
        }
    }

    playStationControls(gp);
    xboxControls(gp2);

    start = requestAnimationFrame(gameLoop);
}

const animatePlayer1 = setInterval(() =>{
    player1.stage = !player1.stage;
    if(player1.stage){
        player1.image.src = player1.images[1];
    } else {
        player1.image.src = player1.images[0];
    }
}, 300);

const animatePlayer2 = setInterval(() =>{
    player2.stage = !player2.stage;
    if(player2.stage){
        player2.image.src = player2.images[1];
    } else {
        player2.image.src = player2.images[0];
    }
}, 300);


function player1collides(a, b, axis, movement){
    if(axis === "x"){
        return a.middleX + movement <= b.middleX + 10 &&
            a.middleX + movement + 10 >= b.middleX &&
            a.y <= b.y + b.height &&
            a.y + a.height >= b.y
    } else {
        return a.middleX + movement <= b.middleX + 10 &&
        a.middleX + movement +  10 >= b.middleX &&
        a.y + movement <= b.y + b.height &&
        a.y + movement + a.height >= b.y
    }
}

function playerOneHealth() {
    document.querySelector('#health-bars').appendChild(canvas1)
    contextPlayerOne.clearRect(0, 0, window.innerWidth,window.innerHeight);
    contextPlayerOne.fillStyle = 'rgb(244, 232, 66)';
    contextPlayerOne.fillRect(0,0,window.innerWidth,window.innerHeight);

}

function playerOneDamage(dmg){
  contextPlayerOne.clearRect(0, 0, dmg,window.innerHeight);
}


function playerTwoHealth() {
    document.querySelector('#health-bars').appendChild(canvas2)
    contextPlayerTwo.clearRect(0, 0, window.innerWidth,window.innerHeight);
    contextPlayerTwo.fillStyle = 'rgb(244, 232, 66)';
    contextPlayerTwo.fillRect(0,0,window.innerWidth,window.innerHeight);

}

function playerTwoDamage(dmg){
  contextPlayerTwo.clearRect(0, 0, dmg,window.innerHeight);
}

function playerPosition(){
    if(player2.x > player1.x){
        player2.reversed = true;
        player1.reversed = false;
    } else {
        player2.reversed = false;
        player1.reversed = true;
    }
}

const createClock = () => {
  let clock = document.createElement('canvas')
  clock.id = 'face'
  clock.width = 40
  clock.height = 40

  let clockC = clock.getContext('2d')
  clockC.font = "30px Arial";
  clockC.fillText(60, 5 , 30);
  document.querySelector('#clock').appendChild(clock)

  let time = 10;

  let timer = setInterval(function(){
  time--
  if (time >= 0){
  clockC.clearRect(0, 0, 252, 144);
  clockC.fillText(time, 5 , 30);
  }else{
    clearInterval(timer)
    return gameOver();;
  }

 }, 1000);

}


const gameOver = () => {
    console.log('gameOver')


}


function updateGameArea() {
    // console.log("hello")
    gameArea.clear();
    player1.update();
    playerPosition();
    player2.update();
    playerOneDamage(player1.health)
    playerTwoDamage(player2.health)
}
