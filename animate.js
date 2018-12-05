class Animate{
    constructor(player, context){
        this.player = player;
        this.active = 0;
        this.count = 0;
        this.punched = 0; 
        this.context = context
    }
    animation(){
        
        if(this.active === 0){
            console.log(this.active)
            this.active = setInterval(() =>{
                // console.log("hello")
                this.player.stage = !this.player.stage;
                if(this.player.stage){
                    this.player.image.src = this.player.images[1];
                } else {
                    this.player.image.src = this.player.images[0];
                }
            }, 300);
            console.log(this.active)
        } 
    }
    static(){
        

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
        // return this.active;
    }

    punch(){
            console.log("hello")
            this.player.image.src = this.player.images[4];
            let oldVal;
            if(this.count === 0){
                oldVal = this.player.x
                this.player.x = this.player.x - 40;
                this.count++;
            }
            this.active = setTimeout(() => {
                console.log(oldVal)
                this.player.x = oldVal;
                console.log(this.player.x)
                this.punched = 0;
                // this.active = 0;
             // clearTimeout(punch)
                // this.animation();
            }, 400)

    }
    
}
