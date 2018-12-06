class Game {
    constructor(){
        this.canvas = document.createElement("canvas");
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");

        context = this.context;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    setGameArea() {
        document.body.removeChild(document.querySelector("#menu"));
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

        let time = 60;

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
        const div = document.createElement("div");
        div.innerHTML = "<h1 id='logo'>Street Brawler</h1>"
        div.id = "menu";
        const btn = document.createElement("button");
        btn.innerText = "Start Game";
        btn.id = "start"
        btn.addEventListener("click", () =>{
            this.startGame();
        })
        div.appendChild(btn);
        document.body.append(div);
    }

    gameOver() {
        console.log('gameOver')

        window.cancelAnimationFrame(start)
        clearInterval(this.interval)

        
        
        document.body.removeChild(document.querySelector("#health-bars"));
        document.body.removeChild(document.querySelector("#clock"))
        // context.fillRect(0,0,window.innerWidth,window.innerHeight);
        this.gameForm();
        console.log("hello")
    }

    gameForm() {
        let winner;
        if(player1.health > player2.health){
            winner = "Player 2"
        } else if(player2.health > player1.health){
            winner = "Player 1"
        } 
        const div = document.createElement("div");
        const form = document.createElement("form");
        form.innerHTML = `<h1 id="logo">Winner: ${winner}</h1><div id="form"><label id="logo">Name:</label><input type="text" id="winner" name="winner"></div><br>`
        const submit = document.createElement("button");
        submit.innerText = "Submit";
        submit.id = "submit"
        submit.addEventListener("click",(e) => {
            this.mainMenu();
        })
        form.appendChild(submit);
        div.appendChild(form);
        // const header = document.createElement("h1");
        div.id = "menu";
        // header.innerText = "Game Over"

        // div.appendChild(header);
        document.body.append(div);
    }



    clear() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    }

}
