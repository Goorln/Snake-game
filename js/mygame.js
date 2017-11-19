(function () {
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
})()
