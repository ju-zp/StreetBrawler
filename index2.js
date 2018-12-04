//
let canvas = document.querySelector('canvas');

//
// setting canvas to maximum page height and width
canvas.width = window.innerWidth;
canvas.height = 700;
//
//
// passing methods and functions to draw on canvas
let context = canvas.getContext('2d');
//
const kenIdle = ['./assests/ken_street_fighter.png','./assests/ken_street_fighter.png', './assests/ken_4.png']
const kenJumping = ['./assests/ken_jumping/ken_jump1.png', './assests/ken_jumping/ken_jump2.png']


//
let fighterSprite = new Image();
let sprite = 0
//
function charChangeIdle (){
  sprite++;
  if (sprite >= 3 ){
    sprite = 0;
  }
  fighterSprite.src = kenIdle[sprite];
}
function kenJump (){
  sprite++;
  if (sprite >= 1 ){
    sprite = 0;
  }
  fighterSprite.src = kenJumping[sprite];
}
//
//
//
 setInterval(function(){ charChangeIdle () },500);
//
 //variable to hold horizontal and vertical placement values for sprite.
 let x = 50;
 let y = 550;
 //velocity of horizontal and vertical
 let dx = 0;
 let dy = 0;
 //setting radius of sprite
 let radius = 50;

 //Function to animate an object
   function animate() {
     requestAnimationFrame(animate);
     context.clearRect(0, 0, innerWidth, innerHeight);
     context.drawImage(fighterSprite, x, y);

     if (x + radius > innerWidth || x - radius < 0) {
       dx = -dx;
     }
     if (y < 550 ) {
       console.log(y)
       dy = -dy;
       setTimeout(myFunction(), 400)
       function myFunction() {
         console.log(y)
         y += 5
       }
     }

     x += dx;
     y += dy;
     dy = 0
     dx = 0
   }









setInterval(function(){
  var map = {};
  onkeydown = onkeyup = function(e){
      e = e || event;
      map[e.keyCode] = e.type == 'keydown';

        if (map[87] === false && map[68] === false){
              dy -= 100
              dx += 150
          } else if (map[68] === false){
               dx += 30
               setInterval(function(){
                   if(y !== 550){
                 kenJump () }else {
                   return;
                 }},500);
             }else if (map[65] === false){
               dx -= 30
             }else if (map[87] === false && y === 500){
               dy -= 100
             } else if (map[83] === false){
               y = 650
           }
  }
map = {};
},400);


animate()
