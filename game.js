class Game {
    constructor(){
        this.canvas = document.createElement("canvas");
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        this.ani;
        context = this.context;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    setGameArea() {
        document.body.removeChild(document.querySelector("#menu"));
        document.querySelector("#health-bars").style = "visibility: visible;"
        document.querySelector("#clock").style = "visibility: visible;"
        player1 = new Player(40, 85, 200, 370, reversedPlayer1Images, player1Images, true);
        player2 = new Player(40, 85, 600, 350, reversedPlayer2Images, player2Images, true)
        animatePlayer1();
        animatePlayer2();
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
        playerPosition();
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
        if(document.querySelector("#endGame")){
            document.body.removeChild(document.querySelector("#endGame"))
        } else if(document.querySelector("#leaderBoard")){
            document.body.removeChild(document.querySelector("#leaderBoard"))
        }
        const div = document.createElement("div");
        div.innerHTML = "<h1 id='logo'>Street Brawler</h1>"
        div.id = "menu";
        const leaderBoard = document.createElement("button");
        leaderBoard.innerText = "Leaderboard";
        leaderBoard.id = "leaderboardBtn"
        leaderBoard.addEventListener("click", () =>{
            this.leaderBoard();
        })
        const btn = document.createElement("button");
        btn.innerText = "Start Game";
        btn.id = "start"
        btn.addEventListener("click", () =>{
          this.gameSounds = new Audio('sound_files/12. Chun-Li Stage.mp3');
          this.gameSounds.play();
          this.startGame();
        })
        div.appendChild(leaderBoard);
        div.appendChild(document.createElement("br"))
        div.appendChild(document.createElement("br"))
        div.appendChild(btn);
        document.body.append(div);
    }

    leaderBoard(){
        if(document.querySelector("#menu")){
            document.body.removeChild(document.querySelector("#menu"))
        } else if(document.querySelector("#endGame")){
            document.body.removeChild(document.querySelector("#endGame"))
        }
        const div = document.createElement("div");
        div.innerHTML = "<h1 id='logo'>Leader Board</h1>"
        div.id = "leaderBoard";
        const list = document.createElement("ol");
        list.id = "leaders"
        sortUsers().then(users => {
            for(let i = 0; i < 10; i++){
                const liEl = document.createElement("li");
                if(users[i]){
                    liEl.innerHTML = `${users[i].username} Wins: ${users[i].win_count}`;
                } else {
                    liEl.innerText = "--- Wins: 0";
                }
                list.appendChild(liEl);
            }
        })
        const btn = document.createElement("button");
        btn.id = "start"
        btn.innerText = "Main Menu"
        btn.addEventListener("click", () => {
            location.reload();
        })
        div.appendChild(list);
        div.appendChild(btn)
        document.body.append(div)
    }

    gameOver() {
        this.punchSound = new Audio('sound_files/08. Ken Dying.mp3');
        this.punchSound.play();
        this.gameSounds.pause();
        clearInterval(this.interval)
        window.cancelAnimationFrame(start)
        document.querySelector("#health-bars").style = "visibility:hidden;"
        const clock = document.querySelector("#clock")
        clock.style = "visibility:hidden;"
        if(document.querySelector("#face")){
            clock.removeChild(document.querySelector("#face"))
        }
        this.gameForm();
    }

    gameForm() {
        let winner;
        if(player1.health > player2.health){
            winner = "Player 2"
            this.win(winner);
        } else if(player2.health > player1.health){
            winner = "Player 1"

            this.win(winner);
        } else{
            this.draw();
        }
    }

    win(winner){
        const div = document.createElement("div");
        div.id = "endGame"
        div.innerHTML = `<h1 id="logo">Winner: ${winner}</h1><div id="form"><label id="logo">Name:</label><input type="text" id="winner" name="winner"></div><br>`
        const submit = document.createElement("button");
        submit.innerText = "Submit";
        submit.id = "submit"
        submit.addEventListener("click",(e) => {
            const winner = document.querySelector("#winner").value
            fetch('http://0.0.0.0:3001/submit', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( {username: winner})
            }).then(this.leaderBoard);
        })
        div.appendChild(submit);
        document.body.append(div);

    }
    draw(){
        const div = document.createElement("div");
        div.id = "endGame";
        div.innerHTML = '<h1 id="logo">Draw</h1>'
        const submit = document.createElement("button");
        submit.innerText = "Leader Board";
        submit.id = "leaderboardBtn"
        submit.addEventListener("click",(e) => {
            this.leaderBoard();
        })
        div.appendChild(submit);
        document.body.append(div);
    }
    
    clear() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    }

}
