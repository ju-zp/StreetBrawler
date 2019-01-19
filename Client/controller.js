function buttonPressed(b) {
    if (typeof(b) == "object") {
        return b.pressed;
    }
}

function assignControllers (){
    if(!connected){
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        // console.log(gamepad)
        if (!gamepads) {
        return;
        }
        gp = gamepads[0]
        gp2 = gamepads[1]
        
        // for(const gamepad of gamepads){
        //     if(gamepad){
        //         if(gamepad.id.charAt(0) === "X"){
                    
                    
        //         } else if(gamepad.id.charAt(0) === "W")  {
        //             console.log(gamepad)
        //             gp = gamepad;
        //             gp2 = gamepad;
        //         }
        //     }
        // }
    }
}

const playStationControls = (gp) => {
    if (buttonPressed(gp.buttons[12])) {
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
    if (buttonPressed(gp.buttons[15]) && player1.x + player1.width < 800) {
        if(!player1collides(player1, player2, "x", 10)){
            player1.moveRight();
        }
    } else if (buttonPressed(gp.buttons[13]) && player1.y + player1.height < 480) {
        if(!player1collides(player1, player2, "y", 10)){
            player1.moveDown();
        }
    } else if(buttonPressed(gp.buttons[1])){
        if(player1.reversed){
            if (player1.punch(player2)) {
                setTimeout(() => {
                    player1.count = 0;
                    player1.x = player1.oldVal
                    player1.state = 'IDLE'
                }, 400);
            }
        } else {
            if(player1.punch(player2)){
                setTimeout(() => {
                    player1.count = 0;
                    player1.state = 'IDLE'
                }, 400);
            }
        }
    } else if(buttonPressed(gp.buttons[0])){
        if(player1.reversed){
            if (player1.kick(player2)){
                setTimeout(() => {
                    player1.count = 0;
                    player1.x = player1.oldVal
                    player1.state = 'IDLE'
                }, 400)
            }  
        } else {
            if(player1.kick(player2)){
                setTimeout(() => {
                    player1.count = 0;
                    player1.state = 'IDLE'
                }, 400)
            }
        }
    }
}

const xboxControls = (gp) => {
    if (buttonPressed(gp.buttons[12])) {
        if(!player1collides(player2, player1, "y", -10)){
            if(!player2.hasJumped){
                clearInterval(player2.animatePlayer);
                player2.moveUp();
            }
        }
    } else if (buttonPressed(gp.buttons[14]) && player2.x > 0) {
        if(!player1collides(player2, player1, "x", -10)){
            player2.moveLeft();
        }
    }
    if (buttonPressed(gp.buttons[15]) && player2.x + player2.width < 800) {
        if(!player1collides(player2, player1, "x", 10)){
            player2.moveRight();
        }
    } else if (buttonPressed(gp.buttons[13]) && player2.y + player2.height < 480) {
        if(!player1collides(player2, player1, "y", 10)){
            player2.moveDown();
        }
    } else if(buttonPressed(gp.buttons[1]) && player2.x > 0 && player2.x < 800){
        if(player2.reversed){
            if (player2.punch(player1)) {
                setTimeout(() => {
                    player2.count = 0;
                    player2.x = player2.oldVal
                    player2.state = 'IDLE'
                }, 400);
            }
        } else {
            if(player2.punch(player1)){
                setTimeout(() => {
                    player2.count = 0;
                    player2.state = 'IDLE'
                }, 400);
            }
        }
    } else if(buttonPressed(gp.buttons[0])){
        if(player2.reversed){
            if (player2.kick(player1)){
                setTimeout(() => {
                    player2.count = 0;
                    player2.x = player2.oldVal
                    player2.state = 'IDLE'
                }, 400)
            }   
        } else {
            if(player2.kick(player1)){
                setTimeout(() => {
                    player2.count = 0;
                    player2.state = 'IDLE'
                }, 400)
            }
        }
    }
}
