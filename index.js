
let context;

// animate()
// console.log(canvas)

var start;
let movement = 8;
let connected = false;
let player1;
let player2;
let gp;
let gp2;
let player1animation;
let player2animation;
const gameArea = new Game();
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





let clock = document.createElement('canvas')
clock.id = 'face'
clock.width = 40
clock.height = 40

document.querySelector('#clock').appendChild(clock)
let clockC = clock.getContext('2d');
let time = 60
clockC.font = "30px Arial";
clockC.fillText(time, 5 , 30);



setInterval(function(){
time--
if (time >= 0){
clockC.clearRect(0, 0, 252, 144);
clockC.fillText(time, 5 , 30);
}else{
  return;
}
}, 1000);






window.addEventListener("gamepadconnected", function(e) {
    console.log(e)
    // var gp = navigator.getGamepads()[e.gamepad.index];
    // console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    // gp.index, gp.id,
    // gp.buttons.length, gp.axes.length);
    
    // gameArea.setGameArea();
    // gameArea.startGame();
  });

//   gameArea.startGame();


gameArea.mainMenu();





function animatePlayer1() {

 setInterval(() =>{
    player1.stage = !player1.stage;
    if(player1.stage){
        player1.image.src = player1.images[1];
    } else {
        player1.image.src = player1.images[0];
    }
}, 300);
}

function animatePlayer2(){

 setInterval(() =>{
    player2.stage = !player2.stage;
    if(player2.stage){
        player2.image.src = player2.images[1];
    } else {
        player2.image.src = player2.images[0];
    }
}, 300);
}


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
    contextPlayerOne.fillStyle = 'rgba(155,155,0,1)';
    contextPlayerOne.fillRect(0,0,window.innerWidth,window.innerHeight);

}

function playerOneDamage(dmg){
  contextPlayerOne.clearRect(0, 0, dmg,window.innerHeight);
}


function playerTwoHealth() {
  document.querySelector('#health-bars').appendChild(canvas2)
    contextPlayerTwo.clearRect(0, 0, window.innerWidth,window.innerHeight);
    contextPlayerTwo.fillStyle = 'rgba(155,155,0,1)';
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

