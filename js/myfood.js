(function () {
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
        //
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
})()

//测试
// var food = new Food();
// food.render(map);