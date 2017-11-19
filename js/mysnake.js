(function (window, undefined) {
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
//测试
// var snake = new Snake();
// snake.render(map);