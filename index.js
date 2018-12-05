
let context;

// animate()
// console.log(canvas)

var start;
let movement = 8;
let player1;
let player2;
let player1animation;
let player2animation;
const gameArea = new Game();
let animate2;
let player1Images = ["./assests/ken_street_fighter.png", "./assests/ken_streetfighter2.png", "./assests/ken_jumping/ken_jump2.png", "./assests/kenDuck.png", "./assests/kenPunch.png"]
let player2Images = ["assests/sagat/sagat1.png", "assests/sagat/sagat2.png", "assests/sagat/sagatJump.png", "assests/sagat/sagatDuck.png"]

window.addEventListener("gamepadconnected", function(e) {
    var gp = navigator.getGamepads()[e.gamepad.index];
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index, gp.id,
    gp.buttons.length, gp.axes.length);
    gameArea.start();
    player1 = new Player(40, 85, 200, 370, player1Images, false);

    player1.animatePlayer();
    player2 = new Player(50, 100, 600, 350, player2Images, true);
    player2.animatePlayer();

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
    

    let gp = gamepads[0];
    let gp2 = gamepads[1];

    playStationControls(gp);
    xboxControls(gp2);
    

    start = requestAnimationFrame(gameLoop);
}

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

function updateGameArea() {
    gameArea.clear();
    player1.update();
    player2.update();
}
