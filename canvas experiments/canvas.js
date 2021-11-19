// RECTANGLES

const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');


let mouse = {
  x: undefined,
  y: undefined
}

var maxHeightWidth = 50

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

function Rectangle(x,y,width,height,dx,dy,color) {

  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.width = width;
  this.height = height;
  this.color = color;


  this.draw = function() {

    c.fillStyle = color
    c.fillRect(this.x,this.y,this.width,this.height)
    c.stroke()
  }


  this.move = function() {

    this.x += this.dx;
    this.y += this.dy;

    // BOUNCE HORIZONTALLY
    if (this.x > innerWidth - rectWidth - 10 || this.x < 0 ) {
      this.dx = -this.dx;
    }
    // BOUNCE VERTICALLY
    if (this.y > innerHeight - rectWidth || this.y < 0) {
      this.dy = -this.dy;
    }

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&  mouse.y - this.y < 50 && mouse.y - this.y > - 50) {
      if (this.width < maxHeightWidth && this.height < maxHeightWidth) {
        this.width += 3;
        this.height += 3;
      }

    } else if (this.width > 40 && this.height > 40 ) {
      this.width -= 50;
      this.height -= 50;
    }

    this.draw()

  }

}


let rectArr = [];
let rectArrColor = ['blue','yellow','red','green']

function createRects(rectsInst,a,b) {

  for (var i = 0; i < rectsInst; i++) {

    rectWidth = (Math.floor(Math.random() * (b-a) + a))
    rectHeight = Math.floor(Math.random() * (b-a) + a)

    x = Math.random() * (innerWidth - rectWidth * 3) + rectWidth

    y = Math.random() * (innerHeight - rectHeight * 2) + rectHeight



    dx = (Math.random() - 0.5) * 5
    dy = (Math.random() - 0.5) * 5

    let randomColor = Math.floor(Math.random() * rectArrColor.length)
    let color = rectArrColor[randomColor]

    let rectangle = new Rectangle(x,y,rectWidth,rectHeight,dx,dy,color)

    rectArr.push(rectangle);


  }
}



function animate() {

  requestAnimationFrame(animate)

  c.clearRect(0,0,innerWidth,innerHeight);

  for (var i = 0; i < rectArr.length; i++) {
    rectArr[i].move();
  }



}

animate()

createRects(500,10,15)
