// class for player obj.
class Player {
    constructor(width, height, x, y, images, reversed){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y ;
        this.hasJumped = false;
        this.images = images
        this.stage = false;
        this.middleX = this.x + (this.width/2);
        this.image = new Image();
        this.image.src = this.images[0];
        this.context = context;
        this.reversed = reversed;
        this.punched = false;
        this.count = 0;
        this.health = 0;
    }

    update(){
        this.middleX = this.x + (this.width/2);
        // if(this.punched && this.reversed){
        //     console.log("helo")
        //     this.context.drawImage(this.image, this.x - 20,this.y);
        // } else {
        this.context.drawImage(this.image, this.x,this.y);
        // }

        // this.context.fillStyle="black"
        // this.context.fillRect(this.x,this.y, this.width, this.height);


    };

    moveUp(){
        // this.image.src = this.images[2];
        console.log(this.image)
        this.hasJumped = true;
        let oldVal = this.y;


          if(this.y < 500){
              this.y -= 120
            }


            const jump = setInterval(() => {
              this.image.src = this.images[2];
                this.y += 5;
                if(this.y >= oldVal){
                    this.y = oldVal
                    this.hasJumped = false;
                    clearInterval(jump)
                }
            }, 20);

    };

    moveUpRight(){
      this.hasJumped = true;
      if(this.y < 500){
          this.y = 250
          this.x += 100;
          const jump = setInterval(() => {
              this.y += 5;
              if(this.y >= 350){
                  this.y = 350
                  this.hasJumped = false;
                  clearInterval(jump)
              }
          }, 30);
      }
    };

    moveDown(){
        this.image.src = this.images[3];
        const oldVal = this.y;
        this.y = this.y + (this.height/2)
        setTimeout(()=>{
            this.y = oldVal ;
        }, 200);


    };

    moveLeft(){
        this.x -= movement;
    };

    moveRight(){
        this.x += movement;
    };

    punch(){
        // const oldVal = this.x
        let itr = 0
        if(this.reversed){
            if(this.count === 0){
                this.x = this.x - 20
                this.count++;
                const timer = setTimeout(() => {
                    if(itr === 0){
                        console.log("hello")
                        this.x = this.x + 20
                        itr = 1
                    }
                    clearTimeout(timer)
                }, 400);
            }
        }
        this.image.src = this.images[4];
        let hit = false;
        if(!this.reversed){
            const reach = this.x + this.width + 15;
            if(reach >= player2.x && !hit){
                hit = true
                if(this.count === 0){
                    player2.health += 5;
                    this.count++;
                }
            }
        } else {
            const reach = this.x - 20;
            if(reach <= player1.x + player1.width && !hit){
                hit = true
                if(this.count === 1){
                    player1.health += 5;
                    this.count++;
                }
            }
        }
    }

    animatePlayer(){
        setInterval(() =>{
            this.stage = !this.stage;
            if(this.stage){
                this.image.src = this.images[1];
            } else {
                this.image.src = this.images[0];
            }
        }, 300);
    }
}
