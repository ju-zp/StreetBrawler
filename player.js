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
        this.count = 0;
        this.health = 0;
    }

    update(){
        this.middleX = this.x + (this.width/2);
        // this.context.fillStyle="black"
        // this.context.fillRect(this.x,this.y, this.width, this.height);
        this.context.drawImage(this.image, this.x,this.y);

    };

    moveUp(){
        this.image.src = this.images[2];
        this.hasJumped = true;
        let oldVal = this.y;
        if(this.y < 500){
            this.y = 150 
            const jump = setInterval(() => {
                this.y += 5;
                if(this.y >= oldVal){
                    this.y = oldVal
                    this.hasJumped = false;
                    clearInterval(jump)
                }
            }, 20);
        }
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
        this.image.src = this.images[4];
        this.context.drawImage(this.image, this.x, this.y)
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
