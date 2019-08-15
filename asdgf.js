
window.onload = function ( ) {

    class Game {
        constructor(screenClassName,pauseButton,key) {
            this.screen = document.querySelector(screenClassName);
            this.pauseButton = document.querySelector(pauseButton);
            this.keyEle = document.querySelector(key);
            this.letters = [];
        }

        makeWord(num=5) {
            for (let i=0;i<num;i++) {
                let div = document.createElement("div");
                div.classList.add("letter");
                let letter = String.fromCharCode(parseInt(Math.random() * 26 + 65));
                while (this.isRepeat(letter)){
                    letter = String.fromCharCode(parseInt(Math.random() * 26 + 65));
                }
                let left = Math.random() * 4;
                while (this.isOverlap(left)){
                    left = Math.random() * 4;
                }
                let top = Math.random()*(-3)+0.5;
                while (this.isTopeat(top)){
                    top = Math.random()*(-3)+0.5;
                }
                div.setAttribute("style", `background: url("img/A_Z/${letter}.png");top:${top}rem;left:${left}rem;`)
                this.screen.appendChild(div);
                let obj ={}
                obj['title']=letter
                obj['top']=top;
                obj['left']=left
                obj['node']=div;
                this.letters.unshift(obj);
                // console.log(letter);
            }
        }
        //判断重叠
        //只要返回不是-1 重叠了
        isOverlap(left){
            let status = this.letters.findIndex((item)=>{
                if (Math.abs(left-item.left)<0.6){
                        return item;
                }
            })
            if (status!=-1){
                return true;
            } else {
                return false;
            }
        }
        isRepeat(letter){
            let status = this.letters.findIndex((item)=>{
                if (letter == item.title){
                        return item;
                }
            })
            if (status==-1){
                return false;
            } else {
                return true;
            }
        }
        isTopeat(top){
            let status = this.letters.findIndex((item)=>{
                if (Math.abs(item.top-top)<0.5){
                        return item;
                }
            })
            if (status!=-1){
                return true;
            } else {
                return false;
            }
        }
        //字母下落
        run(){
            this.t = setInterval(()=> {
                this.letters.forEach((item,index)=>{
                    item.top+=0.3;
                    item.node.style.top = item.top+'rem';
                    if (item.top>5){
                        //清除字母
                        this.screen.removeChild(item.node);
                        this.letters.splice(index,1);
                        this.makeWord(1);
                    }
                })
            },500)
        }
        //开关暂停
        pauseButtonFF(){
            let imgEle = document.querySelector(".pauseButton img");
            let srcValue = [];
            srcValue.push(imgEle.attributes.src.value);
            srcValue.push(imgEle.attributes.imgsrc.value);
            this.pauseButton.ontouchend = () => {
                if (imgEle.attributes.src.value == srcValue[0]){
                    let num = imgEle.attributes.src.value
                    imgEle.attributes.src.value = imgEle.attributes.imgsrc.value
                    imgEle.attributes.imgsrc.value = num;
                    clearInterval(this.t);
                } else if (imgEle.attributes.src.value == srcValue[1]){
                    let num = imgEle.attributes.src.value
                    imgEle.attributes.src.value = imgEle.attributes.imgsrc.value
                    imgEle.attributes.imgsrc.value = num;
                    this.run();
                }
            }
        }
        //键盘点击删除字母
        delWord(){
            this.keyEle.ontouchend=function(event){
                let tar = event.target;
                if (tar.nodeName == "SPAN"){
                    let value = tar.innerText;
                    let index = game.letters.findIndex((item)=>{
                        if (value == item.title){
                            return item;
                        }
                    })
                    if (index!=-1){
                        game.screen.removeChild(game.letters[index].node);
                        game.letters.splice(index,1);
                        game.makeWord(1);
                    }
                }
            }
        }
    }


    let game = new Game(".wordBox",".pauseButton",".keyBoard");
    game.makeWord();
    game.run();
    game.pauseButtonFF();
    game.delWord()
//打字游戏
//属性：
//


//方法：
// run()
//创建字母makeWord
//暂停stop
//开始start



}