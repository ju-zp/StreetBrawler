
let canvas = document.querySelector('canvas');


//setting canvas to maximum page height and width
canvas.width = window.innerWidth;
canvas.height = 700;


//passing methods and functions to draw on canvas
let context = canvas.getContext('2d');

const kenIdle = ['./assests/ken_street_fighter.png','./assests/ken_street_fighter.png', './assests/ken_4.png']
const kenJumping = ['./assests/ken_jumping/ken_jump1.png', './assests/ken_jumping/ken_jump2.png']

let fighterSprite = new Image();
let sprite = 0

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



setInterval(function(){ charChangeIdle () },500);

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
    //code to clear the page
    context.clearRect(0, 0, innerWidth, innerHeight);
    // code to draw a circle and place it on the screen
    context.drawImage(fighterSprite, x, y);
    //logic to limit the movement to the size of the screen
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
    //increasing the horizontal variable by the velocity variable 'dx' each time the page refreshes.
    x += dx;
    y += dy;
    dy = 0
    dx = 0
  }

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName === 'd'){
      dx += 30
      setInterval(function(){
          if(y !== 550){
        kenJump () }else {
          return;
        }},500);
    }else if (keyName === 'a'){
      dx -= 30
    }else if (keyName === 'w' && y === 550){
      dy -= 200
    } else if (keyName === 's'){
      y = 650
    }
  });

animate()
// console.log(canvas)
