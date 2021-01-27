const metric = 25;

window.onload = function (){
    const canvas = document.getElementById("snakeTable");
    let context;
    context = canvas.getContext("2d");
    drawGrid(canvas,context);
    let d= new Dot(0,0,0,1, context);
    let snake = new Snake(context);
    snake.addDot(d);
    let a = new apple(context, 5,5);
    let s = setInterval(()=>run(snake,canvas,context, a),100);
    setDirection(snake);

}
function setDirection(snake){
    document.addEventListener('keydown', function (event){
       snake.setHeadDirection(event.keyCode);
    })


}

function run(snake, canvas, context, apple){
    snake.repaint(canvas);

    drawGrid(canvas, context);
    snake.draw();
    apple.drawApple();
   // physics(snake);
    proveApple(snake, apple, context);

    snake.refresh();


    snake.advance();







   // snake.context.save();

  //  snake.context.restore();
}

function proveApple(snake,apple,context){
    let xC= snake.tail[0].x;
    let yC= snake.tail[0].y;
    let xA = apple.x;
    let yA = apple.y;
    if(xC===xA && yA===yC){
       // return true;
        //snake.refresh();
        //context.clearRect(apple.x,apple.y,metric,metric);
        apple.redraw(context);
        snake.addDot(new Dot(snake.tail[snake.tail.length-1].x, snake.tail[snake.tail.length-1].y,snake.tail[snake.tail.length-1].xs,snake.tail[snake.tail.length-1].ys,context));

       // alert("Encuentro!");
    }else {
        return;
    }// false;}
}

function Dot(x,y,xs,ys, context){
    this.x=x;
    this.y=y;
    this.xs=xs;
    this.ys=ys;

    this.setValues = function (x,y,xs,ys){
        this.x=x;
        this.y=y;
        this.xs=xs;
        this.ys=ys;
    }

    this.drawDot = function (){
        context.beginPath();
        context.fillStyle = "green";
        context.fillRect(this.x*metric, this.y*metric,metric,metric);
        context.closePath();
    }
}

function updateDot(DotA,DotB){
    DotB.setValues(DotA.x,DotA.y,DotA.xs,DotA.ys);
}
function apple(context,x,y){
    this.x=x;
    this.y=y;
    this.color = '#b12f2f';

    this.drawApple = function (){
        //context.fillStyle(this.color);
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x*metric, this.y*metric, metric, metric);
        context.closePath();
    }

    this.redraw = function(context) {
        context.clearRect(this.x,this.y,metric,metric);
        this.x = getRandomArbitrary(0,20);
        this.y = getRandomArbitrary(0,20);
      //  this.x=10;
      //  this.y=10;
        this.drawApple();
    }
}
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function Snake(context){
    this.tail = [];

    this.addDot = function (dot){
        this.tail.push(dot);

    }

    this.setHeadDirection = function(number) {
        let head = this.tail[0];
        switch (number){
            case 40:
              head.xs =0;
              head.ys =1;
              break;
            case 38:
                head.xs =0;
                head.ys =-1;
                break;
            case 37:
                if(head.xs===1){
                    return;
                }else {
                    head.xs =-1;
                    head.ys =0;
                }
                break;
            case 39:
                if(head.xs===-1){
                    return;
                }else{
                    head.xs = 1;
                    head.ys = 0;
                }
            default:
                  break;

        }
    }

    this.refresh = function(){
        if(this.tail.length<2){
            return;
        }
        else{
            for(let i = this.tail.length - 1; i > 0; i--){
                updateDot(this.tail[i - 1],this.tail[i]);
            }
        }
        // this.x = this.x + this.xSpeed;
        //this.y = this.y + this.ySpeed;
        // this.draw(context);
    }

    this.repaint = function (canvas){
        context.clearRect(0,0, canvas.width, canvas.height);
    }

    this.draw = function(){
        this.tail.forEach(element => element.drawDot());
        //context.beginPath();
       /// context.fillStyle("#FF0000");
        //context.fillRect(this.x,this.y, 25,25);
        //context.stroke();

    }
    this.advance =  function(){

        let head = this.tail[0];
        if(head.x >= 20 || head.y>=20 || head.x < 0 || head.y < 0){
            head.setValues(0,0,0,0);
        }else {
            head.x = head.x + head.xs;
            head.y = head.y + head.ys;
        }
    //    for(let i = 1; i<this.tail.length; i++){
     //       updateDot(this.tail[i+1],this.tail[i]);
    //    }
        console.log(JSON.stringify(this.tail[head]));
    }

}
function compareDots(dotA, dotB){
    if(dotA.x === dotB.x && dotA.y === dotB.y){
        return true;

    }else{
        return false;
    }
}
function physics(snake){
    for(let i=1 ; i< this.tail.length-1; i++){
        if(compareDots(this.tail[0], this.tail[i])){
            alert("YouLose");
        }else{
            return;
        }
    }
}

function drawGrid(canvas ,context){
    let x;
    for(x=0; x< canvas.getAttribute("width") ; x+=metric){
        console.log(x);
        context.beginPath();
        context.moveTo(x ,0);
        context.lineTo(x, canvas.getAttribute("width"));
        context.stroke();

    }
    let y;
    for(y=0; y<=canvas.getAttribute("height");y+=metric){
        context.beginPath();
        context.moveTo(0,y);
        context.lineTo(canvas.getAttribute("height"),y);
        context.stroke();

    }

}