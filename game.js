class Game {
    constructor(){
        this.canvas = document.createElement("canvas");
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        context = this.context;
        // this.start;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    setGameArea() {
        document.body.removeChild(document.querySelector("#start"));
        player1 = new Player(40, 85, 200, 370, reversedPlayer1Images, player1Images, false);
        player2 = new Player(40, 85, 600, 350, reversedPlayer2Images, player2Images, true)
        animatePlayer1();
        animatePlayer2()
        playerOneHealth();
        playerTwoHealth();
        this.getClock();
        this.interval = setInterval(this.updateGameArea, 24);
        
    }

    getClock(){
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
                return gameArea.gameOver();;
            }
        }, 1000);
    }

    updateGameArea() {
        gameArea.clear();
        player1.update();
        this.playerPosition();
        player2.update();
        playerOneDamage(player1.health);
        playerTwoDamage(player2.health);
    }

    startGame() {
        this.setGameArea();
        function gameLoop() {

            assignControllers();
        
            playStationControls(gp);
            xboxControls(gp2);
        
           start = requestAnimationFrame(gameLoop);
        }
        gameLoop();
    }
   
    mainMenu(){
        this.context.font = "30px Arial";
        this.context.fillStyle = "blue";
        this.context.textAlign = "center";
        this.context.strokeText("Street Brawler",this.canvas.width/2, this.canvas.height/2 -100);
        let btn = document.createElement("button");
        btn.innerText = "Start Game";
        btn.id = "start"
        btn.addEventListener("click", () =>{
            this.startGame();
        })
        document.body.append(btn);
    }

    gameOver() {
        console.log('gameOver')
        window.cancelAnimationFrame(this.start)
        document.body.removeChild(document.querySelector("#health-bars"));
        document.body.removeChild(document.querySelector("#clock"))
        context.fillRect(0,0,window.innerWidth,window.innerHeight);
        console.log("hello")
    }



    clear() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    }

}
