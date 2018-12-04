class Animate{
    constructor(player){
        this.player = player;
        this.active;
    }

    static(){
        clearInterval(this.active);
        this.active = setInterval(() =>{
            this.player.stage = !this.player.stage;
            if(this.player.stage){
                this.player.image.src = this.player.images[1];
            } else {
                this.player.image.src = this.player.images[0];
            }
        }, 300);
        return this.active;
    }

    jump(){
        clearInterval(this.active);
        this.active = setInterval(() => {
            this.player.image.src = this.player.images[2];
            if(!this.player.hasJumped){
                clearInterval(this.active);
                this.static();
            }
        }, 0);
        return this.active;
    }
    
}
