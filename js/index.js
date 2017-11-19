//----------------Tools--------------------
(function (window,undefined){
    var Tools = {
        getRandom: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) +  min;
        }
    }
    window.Tools = Tools;
})(window, undefined)
//----------------Food--------------------
;(function (window, undefined) {
    var elements = [];//记录食物，方便后边删除
    function Food(options){
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'green';
        // this.score = 0;
    }
    Food.prototype.render = function (map) {
        //在食物生成的时候，调用删除方法
        remove();
        //随机生成x,y的坐标值
        this.x = Tools.getRandom(0,map.offsetWidth/this.width-1)*this.width;
        this.y = Tools.getRandom(0,map.offsetHeight/this.height-1)*this.height;
        var div = document.createElement('div');
        map.appendChild(div);

        elements.push(div);

        div.style.position = 'absolute';
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
        div.style.borderRadius = '80%';
    };
    function remove(){
        for(var i=elements.length-1;i>=0;i--){
            //删除div中的元素
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中的元素
            elements.splice(i,1);
        }
    }
    window.Food = Food;
})(window, undefined)
//----------------Snake--------------------
;(function (window, undefined) {
    var elements = [];
    // var score = 0;
    function Snake(options){
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        //方向
        this.direction = options.direction || 'right';
        //身体
        this.body = [
            {x: 3, y: 2, color: 'red'},
            {x: 2, y: 2, color: 'blue'},
            {x: 1, y: 2, color: 'blue'}
        ];
        this.score = 0;
    }
    Snake.prototype.render = function (map) {
        remove();
        for(var i=0;i<this.body.length;i++){
            var object = this.body[i];
            var div = document.createElement('div');
            map.appendChild(div);

            elements.push(div);

            div.style.position = 'absolute';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
            div.style.backgroundColor = object.color;
            div.style.borderRadius = "8px";
        }
    };
    function remove(){
        for(var i=elements.length-1;i>=0;i--){
            //删除div
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中的元素
            elements.splice(i,1);
        }
    }
    //控制蛇移动的方法
    Snake.prototype.move = function (food,map) {

        for(var i=this.body.length-1;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
            // i--;
        }
        //判断蛇头移动的方向
        var head = this.body[0];
        switch (this.direction){
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }
        //判断蛇头是否和食物坐标重合
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if(headX === food.x && headY === food.y){
            var last = this.body[this.body.length -1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            })
            this.score += 10;
            var scoreId = document.getElementById('scoreId');
            scoreId.innerHTML = this.score;

            //随机在地图上重新生成食物
            food.render(map);
        }
    }
    window.Snake = Snake;
})(window, undefined);
//----------------Game--------------------
;(function (window, undefined) {
    var that;
    var scoreId = document.getElementById('scoreId');
    var maxScoreSpan = document.getElementById('maxScore');
    var startGame = document.getElementById('startGame');
    var stopGame = document.getElementById('stopGame');
    // var score = 0;
    function Game(map){
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    Game.prototype.start = function (){
        this.food.render(this.map);
        this.snake.render(this.map);
        startGame.onclick = function () {
            // 2 开始游戏的逻辑
            // 2.1  让蛇移动起来
            // 2.2  当蛇遇到边界游戏结束
            runSnake();
            // 2.3  通过键盘控制蛇移动的方向
            bindKey();
            // 2.4  当蛇遇到食物
        }
    };
    function bindKey() {
        document.addEventListener('keydown',function (e){
            switch (e.keyCode){
                case 37:
                    that.snake.direction = 'left';
                    break;
                case 38:
                    that.snake.direction = 'top';
                    break;
                case 39:
                    that.snake.direction = 'right';
                    break;
                case 40:
                    that.snake.direction = 'bottom';
                    break;
            }
        },false)
    }
    stopGame.onclick = function () {
        clearInterval(timerId);
    };
    // console.log(typeof  scoreArr)
    //让蛇动起来
    var timerId;
    function runSnake(){
        timerId = setInterval(function () {
            var scoreArr = localStorage.getItem('scoreArr')||'[]';
            // console.log(localStorage.getItem('scoreArr'))
            that.snake.move(that.food,that.map);
            that.snake.render(that.map);
            //边界
            var maxX = that.map.offsetWidth/that.snake.width;
            var maxY = that.map.offsetHeight/that.snake.height;
            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;
            //把分数存到数组
            // console.log(scoreArr)
            scoreArr=JSON.parse(scoreArr);
            if(headX < 0 || headX >= maxX){

                scoreArr.push(scoreId.innerHTML);
                // var sNewArr = scoreArr.sort();
                //遍历找出最大分数
                var maxScore = scoreArr[0];
                for(var i=0;i<scoreArr.length;i++){
                    if(maxScore < scoreArr[i]){
                        maxScore = scoreArr[i];
                    }
                }
                maxScoreSpan.innerHTML = maxScore;
                localStorage.setItem('scoreArr',JSON.stringify(scoreArr));
                clearInterval(timerId);
                alert("Game Over! Your score is: " + that.snake.score);
            }
            if(headY < 0 || headY >= maxY){
                //把分数存到数组
                // console.log(scoreArr)
                scoreArr.push(scoreId.innerHTML);
                // var sNewArr = scoreArr.sort();
                //遍历找出最大分数
                var maxScore = scoreArr[0];
                for(var i=0;i<scoreArr.length;i++){
                    if(maxScore < scoreArr[i]){
                        maxScore = scoreArr[i];
                    }
                }
                maxScoreSpan.innerHTML = maxScore;
                localStorage.setItem('scoreArr',JSON.stringify(scoreArr));
                clearInterval(timerId);
                alert("Game Over! Your score is: " + that.snake.score);
            }
        },150);
    }
    window.Game = Game;
})(window, undefined)
//----------------Main--------------------
;(function (window, undefined) {
    //测试
    var map = document.getElementById('map');
    var game = new Game(map);
    game.start();
})(window, undefined)