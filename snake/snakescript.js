//import { create } from "domain";

document.addEventListener("DOMContentLoaded", function(event) { 
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    var cw = 15;
    var d = "right";
    var food;
    var score;
    var speed = 130;
    var color = "white";

    //Snake array
    var snake_array;

    //Initializer
    function init() {
        create_snake();
        create_food();
        score = 0;

        if(typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, speed);

    }

    init();

    //Create snake
    function create_snake() {
        var length = 5;
        snake_array = [];
        for(var i = length-1; i >= 0; i--){
            snake_array.push({x: i, y:0});
        }
    }

    function create_food() {
        food = {
            x:Math.round(Math.random()*(w-cw)/cw),
            y:Math.round(Math.random()*(h-cw)/cw)
        }
    }

    //Paint snake
    function paint() {
        //Paint the canvas 
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,w,h);
        ctx.strokeStyle = "white";
        ctx.strokeRect(0,0,w,h);

        var nx = snake_array[0].x;
        var ny = snake_array[0].y;

        if(d=="right") nx++;
        else if(d=="left") nx--;
        else if(d=="up") ny--;
        else if(d=="down") ny++;

        //Collision check
        if(nx==-1 || nx== w/cw || ny==-1 || ny == h/cw || check_collision(nx, ny, snake_array)) {
            init();
            return;
        }

        //Food
        if(nx==food.x && ny==food.y){
            var tail = {x: nx, y: ny};
            score++;
            //We have to create a new "food"
            create_food();
        } else {
            var tail = snake_array.pop();
            tail.x = nx; 
            tail.y = ny;
        }
        snake_array.unshift(tail);

        for(var i = 0; i < snake_array.length; i++) {
            var c = snake_array[i];
            paint_cell(c.x, c.y);
        }
        //Paint the food
        paint_cell(food.x, food.y);
        //Check the score (againt the hiscore from local storage)
        checkscore(score);
    }
   function paint_cell(x,y){
        ctx.fillStyle=color;
        ctx.fillRect(x*cw, y*cw, cw, cw);
        ctx.strokeStyle="white";
        ctx.strokeRect(x*cw, y*cw, cw, cw);
   }

   function check_collision(x, y, array){
       for(var i=0; i < array.length; i++){
           if(array[i.x == x && array[i].y == y]){
               return true;
       }
    } return false;
    }
  });