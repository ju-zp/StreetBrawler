// class for player obj.
class Player {
    constructor(width, height, x, y, images){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.hasJumped = false;
        this.images = images
        this.stage = false;
        this.image = new Image();
        this.image.src = this.images[0];
        this.context = context;
    }

    update(){
        // const middleX = this.x + (this.width/2)
        // this.context.fillStyle="black"
        this.context.fillRect(this.x,this.y, this.width, this.height);
        // this.context.fillStyle="red"
        // this.context.fillRect(middleX, this.y, middleX, this.height)
        this.context.drawImage(this.image, this.x,this.y);
    };

    moveUp(){
        this.hasJumped = true;
        console.log(this.y)
        if(this.y < 500){
            this.y = 250;
            const jump = setInterval(() => {
                this.y += 5;
                if(this.y >= 350){
                    this.y = 350;
                    this.hasJumped = false;
                    clearInterval(jump)
                }
            }, 20);
        }
    };

    moveUpLeft(){
      this.hasJumped = true;
      console.log(this.y)
      if(this.y < 500){
          this.y = 250;
          this.x += 100;
          const jump = setInterval(() => {
            console.log(this.x)
              this.y += 5;
              if(this.y >= 350){
                  this.y = 350;
                  this.hasJumped = false;
                  clearInterval(jump)
              }
          }, 30);
      }
    };

    moveDown(){
        this.y += movement;
    };

    moveLeft(){
        this.x -= movement;
    };

    moveRight(){
        this.x += movement;
    };
}
