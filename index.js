
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

  // document.addEventListener('keyup', (event) => {
  //   let keyName = []
  //   keyName.push(event.key)
  //
  //
  //   // const keyName = event.key;
  //     console.log(keyName[0])
  //     console.log(keyName[1])
  //
  //   if (keyName[0] === 'd' && keyName[1] === 'w'){
  //       console.log('yep')
  //         dx += 300
  //         dy -= 300
  //     } else if (keyName[0] === 'd'){
  //     dx += 30
  //     setInterval(function(){
  //         if(y !== 550){
  //       kenJump () }else {
  //         return;
  //       }},500);
  //   }else if (keyName[0] === 'a'){
  //     dx -= 30
  //   }else if (keyName[0] === 'w' && y === 550){
  //     dy -= 200
  //   } else if (keyName[0] === 's'){
  //     y = 650
  // }
  // keyName.length = 0;
  //
  // });




setInterval(function(){

  var map = {}; // You could also use an array
  onkeydown = onkeyup = function(e){
      e = e || event; // to deal with IE
      map[e.keyCode] = e.type == 'keydown';
      /* insert conditional here */
      console.log(map)

        if (map[87] === false && map[68] === false){
            console.log('yep')
              dx += 100
              dy -= 100
          } else if (map[68] === false){
               dx += 30
               setInterval(function(){
                   if(y !== 550){
                 kenJump () }else {
                   return;
                 }},500);
             }else if (map[65] === false){
               dx -= 30
             }else if (map[87] === false && y === 550){
               dy -= 100
             } else if (map[83] === false){
               y = 650
           }
  }

  map = {};
},1000);


animate()
// console.log(canvas)
