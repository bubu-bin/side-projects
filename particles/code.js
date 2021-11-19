let canvas = document.querySelector('#canvas1');
const c = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

let particlesArray = [];

let mouse = {
  x:null,
  y:null,
  radius:125
}

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x
  mouse.y = event.y

})

const png = new Image();
png.src = 'my_image.png'


function drawObject() {

  const data = c.getImageData(0,0, png.width, png.height);
  c.clearRect(0,0,canvas.width, canvas.height);
console.log(data);

  class Particle {
    constructor(x, y, color, size) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = 2;
      this.baseX = x
      this.baseY = y
      this.density = (Math.random() * 10) + 2
    }
    draw() {

      c.beginPath()
      c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      c.closePath();
      c.fill()
    }
    update() {
      c.fillStyle = this.color;

      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      let forceDistanceX = dx/distance;
      let forceDistanceY = dy/distance;

      const maxDistance = 200;
      let force = (maxDistance - distance) / maxDistance
      if (force < 0) force = 0;

      let directionX = (forceDistanceX * force * this.density * 1)
      let directionY = (forceDistanceY * force * this.density * 1)

      if (distance < mouse.radius + this.size) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX
          this.x -= dx
        } if (this.y !== this.baseY) {
          let dy = this.y - this.baseY
          this.y -= dy
        }
      }


      this.draw()
    }
  }

  function init() {
    particlesArray = []
    for (let y = 0, y1 = data.height; y < y1; y++) {
      for (let x = 0, x1 = data.width; x < x1; x++) {
        if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
          let posX = x;
          let posY = y;
          let color = "rgb(" + data.data[(y*4 * data.width) + (x*4)] + "," +
                              data.data[(y*4 * data.width) + (x*4) + 1] + "," +
                              data.data[(y*4 * data.width) + (x*4) + 2] + ")"
          particlesArray.push(new Particle(posX * 4, posY * 4, color));
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,.05)'
    c.fillRect(0,0, innerWidth,innerHeight)
    for (var i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
    }
  }

  init()
  console.log(particlesArray);
  animate()
}



png.addEventListener('load', () => {
  c.drawImage(png,0,0, canvas.width/4 , canvas.height /4);
  drawObject()
})




// function myImg() {
//   let imgWidth = png.width;
//   let imgHeight = png.height;
//   const data = c.getImageData(0,0,imgWidth,imgHeight);
//   c.clearRect(0,0,canvas.width,canvas.height);
//
//   class Particle {
//       constructor(x,y, color, size){
//         this.x = x
//         this.y = y
//         this.size = 2,
//         this.color = color,
//         this.baseX = x + canvas.width/2 - png.width * 2,
//         this.baseY = y + canvas.height/2 - png.height * 2,
//         this.density = (Math.random() * 10) + 2
//       }
//       draw() {
//         c.fillStyle = this.color;
//         c.beginPath();
//         c.arc(this.x, this.y, this.size, 0, Math.PI *2)
//         c.closePath();
//         c.fill()
//         // console.log(this.x);
//       }
//       update(){
//         c.fillStyle = this.color
//
//         let dx = mouse.x - this.x;
//         let dy = mouse.y - this.y;
//         let distance = Math.sqrt(dx * dx + dy * dy);
        // let forceDistanceX = dx/distance;
        // let forceDistanceY = dy/distance;
        //
        // const maxDistance = 100;
        // let force = (maxDistance - distance) / maxDistance
        //
        // let directionX = (forceDistanceX * force * this.density * 0.6)
        // let directionY = (forceDistanceY * force * this.density * 0.6)
        //
        // if (distance < mouse.radius + this.size) {
        //   this.x -= directionX;
        //   this.y -= directionY;
        // } else {
        //   if (this.x !== this.baseX) {
        //     let dx = this.x - this.baseX
        //     this.x -= dx/20
        //   } if (this.y !== this.baseY) {
        //     let dy = this.y - this.baseY
        //     this.y -= dy/20
        //   }
        // }
//
//         this.draw()
//       }
//   }
//
//   function init() {
//     particlesArray = []
//
//     for (var y = 0, y2 = data.height; y < y2 ; y++) {
//       for (var x = 0, x2 = data.width; x < x2; x++) {
//         if (data.data[(y*4 * data.width) + (x*4) + 3] > 128) {
//           let posX = x;
//           let posY = y;
//           let color = "rgb(" + data.data[(y*4 * data.width) + (x*4)] + "," +
//                               data.data[(y*4 * data.width) + (x*4) + 1] + "," +
//                               data.data[(y*4 * data.width) + (x*4) + 2] + ")"
//           particlesArray.push(new Particle(posX,posY, color))
//         }
//       }
//     }
//   }
//
//
//   function animate(){
//     requestAnimationFrame(animate)
//     c.fillStyle = 'rgba(0,0,0,.05)'
//     c.fillRect(0,0, innerWidth,innerHeight)
//
//     for (var i = 0; i < particlesArray.length; i++) {
//       particlesArray[i].update();
//     }
//   }
//
//   init()
//
//   console.log(particlesArray);
//
//   animate()
// // animate()
// }
//
//
// png.addEventListener('load', () => {
//   c.drawImage(png, 0, 0, innerWidth / 2, innerHeight / 2)
//   myImg();
//
// });
