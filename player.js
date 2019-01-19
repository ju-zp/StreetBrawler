// class for player obj.
class Player {
    constructor(width, height, x, y, images, reverseImages, reversed){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y ;
        this.oldY = y;
        this.hasJumped = false;
        this.normalImages = images
        this.images = images;
        this.reversedImages = reverseImages;
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
        if(this.reversed){
            this.images = this.normalImages;
        } else {
            this.images = this.reversedImages;
        }
        this.middleX = this.x + (this.width/2);
        this.context.drawImage(this.image, this.x,this.y);
    };

    moveUp(){
        this.hasJumped = true;
          if(this.y < 500){
              this.y -= 170
            }
            const jump = setInterval(() => {
              this.image.src = this.images[2];
                this.y += 5;
                if(this.y >= this.oldY){
                    this.y = this.oldY
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
        this.y = this.y + (this.height/2)
        setTimeout(()=>{
            this.y = this.oldY;
        }, 200);
    };

    moveLeft(){
        this.x -= movement;
    };

    moveRight(){
        this.x += movement;
    };

    punch(player){
      this.punchSound = new Audio('sound_files/08. Ken Punch.mp3');
      this.punchSound.play();
        if (this.state === 'PUNCHING') return false;
        this.state = 'PUNCHING'
        if(this.reversed){
            if(this.count === 0){
                this.oldVal = this.x;
                this.x = this.x - 20
                this.count++;
            }
        }
        let hit = false;
        if(!this.reversed){
            this.image.src = this.images[4];
            const reach = this.x + this.width + 15;
            if(reach >= player.x && !hit){
                hit = true
                if(this.count === 0){
                    player.health += 5;
                    player.image.src = player.images[6]
                    if(player.x + 50 >= 750){
                        player.x = 750;
                    } else {
                        player.x += 50;
                    }
                    this.count++;
                }
            }
        } else {
            this.image.src = this.images[4];
            const reach = this.x + 5;
            if(reach <= player.x + player.width && !hit){
                hit = true
                if(this.count === 1){
                    player.health += 5;
                    player.image.src = player.images[6]
                    if(player.x - 50 < 0){
                        player.x = 0;
                    } else {
                        player.x -= 50;
                    }
                    this.count++;
                }
            }
        }
        return true
    }

    kick(player){
      this.punchSound = new Audio('sound_files/08. Ken Punch.mp3');
      console.log("hello")
      this.punchSound.play();
        if(this.state === 'KICKING') return false;
        this.state = 'KICKING'
        if(this.reversed){
            if(this.count === 0){
                this.oldVal = this.x
                this.x = this.x - 20
                this.count++;
            }
        }
        let hit = false;
        if(!this.reversed){
            this.image.src = this.images[5];
            const reach = this.x + this.width + 25;
            if(reach >= player.x && !hit){
                hit = true
                if(this.count === 0){
                    player.health += 10;
                    player.image.src = player.images[6]
                    if(player.x + 50 >= 750){
                        player.x = 750;
                    } else {
                        player.x += 50;
                    }
                    this.count++;
                }
            }
        } else {
            this.image.src = this.images[5];
            let reach;
            if(this.oldY === 370){
                reach = this.x - 20;
            } else{
               reach = this.x ;
            }
        
            if(reach <= player.x + player.width && !hit){
                hit = true;
                if(this.count === 1){
                    player.health += 10;
                    player.image.src = player.images[6]
                    if(player.x - 50 < 0){
                        player.x = 0;
                    } else {
                        player.x -= 50;
                    }
                    this.count++;
                }
            }
        }
        return true;
    }
}
