class Player {
    constructor(width, height, color, x, y, images){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.images = images
        this.stage = false;
        this.image = new Image();
        this.image.src = this.images[0];
    }

    update(){
        context.fillRect(this.x,this.y, this.width, this.height);
        context.drawImage(this.image, this.x,this.y);
    };

    moveUp(){
        this.y -= movement;
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