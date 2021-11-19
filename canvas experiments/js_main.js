// BUBBLES

const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');


let mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 30

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

function Bubble(x,y,radius,dx,dy,color,minRadius) {

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;

  this.color = color;
  this.min = minRadius;

  this.draw = function() {

    // NARYSUJ KOLO
    c.fillStyle = color
    c.beginPath()
    c.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
    c.lineWidth = 5;
    c.stroke();
    c.fill()

  }


  this.move = function() {

    this.x += this.dx;
    this.y += this.dy;

    // BOUNCE HORIZONTALLY
    if (this.x > innerWidth - this.radius - 10 || this.x < 0 ) {
      this.dx = -this.dx;
    }
    // BOUNCE VERTICALLY
    if (this.y > innerHeight - this.radius || this.y < 0) {
      this.dy = -this.dy;
    }

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&  mouse.y - this.y < 50 && mouse.y - this.y > - 50) {
      if (this.radius < maxRadius) {
        this.radius += 1;

      }

    } else if (this.radius > this.min) {

      this.radius -= 1;

    }

    // console.log(`my obj x: ${this.x} my obj y: ${this.y}`);

    this.draw()

  }

}


let bubbleArr = [];
let bubbleArrColor = ['blue','yellow','red','green','purple']

function createBubbles(bubbInst) {

  for (var i = 0; i < bubbInst; i++) {

    radius = Math.random() * 10

    minRadius = radius

    x = Math.random() * (innerWidth - radius * 2 ) + radius
    y = Math.random() * (innerHeight - radius * 2 ) + radius

    dx = (Math.random() - 0.5) * 2
    dy = (Math.random() - 0.5) * 2

    let randomColor = Math.floor(Math.random() * bubbleArr.length)
    let color = bubbleArrColor[randomColor]

    let bubble = new Bubble(x,y,radius,dx,dy,color,minRadius)

    bubbleArr.push(bubble);


  }
}



function animate() {

  requestAnimationFrame(animate)

  c.clearRect(0,0,innerWidth,innerHeight);

  for (var i = 0; i < bubbleArr.length; i++) {
    bubbleArr[i].move();
    // console.log(Rectangle.color);
  }

  // rectangle.move()

}

animate()

createBubbles(50)
